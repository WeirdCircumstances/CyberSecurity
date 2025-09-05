CyberSecurity
==================

A website for a cybersecurity workshop

When pulled, this website need to be filled with data first.  
Not publishing importable data for security reasons ;)

## Roles

- [Kommissar](https://bioengineering.47q.de/87897dcd-266e-4e42-9926-720d3bddedfb/)
- [Laboratory Management](https://bioengineering.47q.de/cc3b0868-e084-40d9-a6be-939f5084fa83/)
- [Research](https://bioengineering.47q.de/55fa5371-249f-4d09-b3e2-6088eff72ca8/)
- [IT](https://bioengineering.47q.de/6f1c448e-ee5e-4fb8-86a9-74259a797cfa/)
- [Intern](https://bioengineering.47q.de/9cbe6166-32b0-4b22-8066-b07ff8819d42/)
- [Canteen](https://bioengineering.47q.de/146644df-ff47-48bb-88a6-4227a8201586/)
- [Reception](https://bioengineering.47q.de/6d4043d9-654e-4a09-b2dc-89c738d3e212/)
- [Accounting](https://bioengineering.47q.de/d7dfccd4-cd4d-4b4e-8d00-be0420e6ed18/)

## Backup

`./dbbackup.sh`

## Restore

Copy to container:  
`docker cp dump_(date and time).json`  

Load dump:  
`docker exec $(docker ps -qf name=cybersecurity_app_1) /venv/bin/python manage.py loaddata dump_(date and time).json --settings=cybersecurity.settings.dev`

