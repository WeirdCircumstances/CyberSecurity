from .base import *  # noqa: F403, F401

DEBUG = True

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

print(f'********************************* DEBUG = {DEBUG} **********************************************')

print(f'************************** {STATICFILES_DIRS} ************************')
