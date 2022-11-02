CyberSecurity
==================

A website for a cybersecurity workshop

When pulled, this website need to be filled with data first.  
Not publishing importable data for security reasons ;)

## Backup

`./dbbackup.sh`

## Restore

Copy to container:  
`docker cp dump_(date and time).json`  

Load dump:  
`docker exec $(docker ps -qf name=cybersecurity_app_1) /venv/bin/python manage.py loaddata dump_(date and time).json --settings=cybersecurity.settings.dev`

