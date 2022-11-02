CyberSecurity
==================

A website for a cybersecurity workshop

When pulled, this website need to be filled with data first.  
Not publishing importable data for security reasons ;)

## Backup
`./dbbackup.sh`

## Restore

`sudo docker exec -it $(sudo docker ps -qf name=cybersecurity_app_1) /venv/bin/python manage.py loaddata dbbackups/dump_* --settings=cybersecurity.settings.dev`

