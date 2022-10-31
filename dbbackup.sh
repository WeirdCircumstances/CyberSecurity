#!/bin/sh

docker exec -t cybersecurity_app_1 /venv/bin/python manage.py dumpdata \
        --natural-foreign --indent 2                    \
        -e contenttypes                                 \
        -e auth.permission                              \
        -e wagtailimages.rendition                      \
        -e wagtailcore.groupcollectionpermission        \
        -e wagtailcore.grouppagepermission              \
        -e wagtailadmin                                 \
        -e sessions                                     \
        -e wagtailcore.PageLogEntry                     \
        -o ./dump.json

mv ./dump.json ./dbbackups/dump_`date +%d-%m-%Y"_"%H_%M`.json
