from django import forms
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.db import models
from modelcluster.fields import ParentalManyToManyField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.fields import StreamField
from wagtail.models import DraftStateMixin, Page, RevisionMixin
from wagtail.search import index
from wagtail.snippets.models import register_snippet

from cybersecurity.base.blocks import BaseStreamBlock


@register_snippet
class Country(models.Model):
    """
    A Django model to store set of countries of origin.
    It uses the `@register_snippet` decorator to allow it to be accessible
    via the Snippets UI (e.g. /admin/snippets/science/country/) In the SciencePage
    model you'll see we use a ForeignKey to create the relationship between
    Country and SciencePage. This allows a single relationship (e.g only one
    Country can be added) that is one-way (e.g. Country will have no way to
    access related SciencePage objects).
    """

    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Countries of Origin"


@register_snippet
class ScienceIngredient(DraftStateMixin, RevisionMixin, models.Model):
    """
    Standard Django model that is displayed as a snippet within the admin due
    to the `@register_snippet` decorator. We use a new piece of functionality
    available to Wagtail called the ParentalManyToManyField on the SciencePage
    model to display this. The Wagtail Docs give a slightly more detailed example
    https://docs.wagtail.org/en/stable/getting_started/tutorial.html#categories
    """

    name = models.CharField(max_length=255)

    panels = [
        FieldPanel("name"),
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Science ingredients"


@register_snippet
class ScienceType(RevisionMixin, models.Model):
    """
    A Django model to define the Science type
    It uses the `@register_snippet` decorator to allow it to be accessible
    via the Snippets UI. In the SciencePage model you'll see we use a ForeignKey
    to create the relationship between ScienceType and SciencePage. This allows a
    single relationship (e.g only one ScienceType can be added) that is one-way
    (e.g. ScienceType will have no way to access related SciencePage objects)
    """

    title = models.CharField(max_length=255)

    panels = [
        FieldPanel("title"),
    ]

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Science types"


class SciencePage(Page):
    """
    Detail view for a specific science
    """

    introduction = models.TextField(help_text="Text to describe the page", blank=True)
    image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Landscape mode only; horizontal width between 1000px and 3000px.",
    )
    body = StreamField(
        BaseStreamBlock(), verbose_name="Page body", blank=True, use_json_field=True
    )
    origin = models.ForeignKey(
        Country,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    # We include related_name='+' to avoid name collisions on relationships.
    # e.g. there are two FooPage models in two different apps,
    # and they both have a FK to science_type, they'll both try to create a
    # relationship called `foopage_objects` that will throw a valueError on
    # collision.
    science_type = models.ForeignKey(
        "science.ScienceType",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    ingredients = ParentalManyToManyField("ScienceIngredient", blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("introduction"),
        FieldPanel("image"),
        FieldPanel("body"),
        FieldPanel("origin"),
        FieldPanel("science_type"),
        MultiFieldPanel(
            [
                FieldPanel(
                    "ingredients",
                    widget=forms.CheckboxSelectMultiple,
                ),
            ],
            heading="Additional Metadata",
            classname="collapsed",
        ),
    ]

    search_fields = Page.search_fields + [
        index.SearchField("body"),
    ]

    parent_page_types = ["ScienceIndexPage"]


class ScienceIndexPage(Page):
    """
    Index page for science.

    This is more complex than other index pages on the bakery demo site as we've
    included pagination. We've separated the different aspects of the index page
    to be discrete functions to make it easier to follow
    """

    introduction = models.TextField(help_text="Text to describe the page", blank=True)
    image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Landscape mode only; horizontal width between 1000px and " "3000px.",
    )

    content_panels = Page.content_panels + [
        FieldPanel("introduction"),
        FieldPanel("image"),
    ]

    # Can only have SciencePage children
    subpage_types = ["SciencePage"]

    # Returns a queryset of SciencedPage objects that are live, that are direct
    # descendants of this index page with most recent first
    def get_science(self):
        return (
            SciencePage.objects.live().descendant_of(self).order_by("-first_published_at")
        )

    # Allows child objects (e.g. SciencePage objects) to be accessible via the
    # template. We use this on the HomePage to display child items of featured
    # content
    def children(self):
        return self.get_children().specific().live()

    # Pagination for the index page. We use the `django.core.paginator` as any
    # standard Django app would, but the difference here being we have it as a
    # method on the model rather than within a view function
    def paginate(self, request, *args):
        page = request.GET.get("page")
        paginator = Paginator(self.get_science(), 12)
        try:
            pages = paginator.page(page)
        except PageNotAnInteger:
            pages = paginator.page(1)
        except EmptyPage:
            pages = paginator.page(paginator.num_pages)
        return pages

    # Returns the above to the get_context method that is used to populate the
    # template
    def get_context(self, request):
        context = super(ScienceIndexPage, self).get_context(request)

        # SciencePage objects (get_science) are passed through pagination
        science = self.paginate(request, self.get_science())

        context["science"] = science

        return context
