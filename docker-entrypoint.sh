#!/bin/sh
set -e

if [ "$DATABASE" = "postgres" ]; then
  echo "Waiting for postgres..."

  while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
    sleep 0.1
  done

  echo "PostgreSQL started"
fi

echo >&2 "Postgres is up - continuing"

if [ "$1" = '/venv/bin/uwsgi' ]; then
  /venv/bin/python manage.py migrate --noinput --settings=cybersecurity.settings.dev
fi

if [ "x$DJANGO_LOAD_INITIAL_DATA" = 'xon' ]; then
  /venv/bin/python manage.py load_initial_data --settings=cybersecurity.settings.dev
fi

/venv/bin/python manage.py collectstatic --noinput
/venv/bin/python manage.py wagtail_update_image_renditions
/venv/bin/python manage.py makemigrations
/venv/bin/python manage.py migrate

exec "$@"
