@echo off
::Delete all used things
::This command gets the container ID of the docker container created before
echo Cleanning all... Analysis is complete.
for /f "delims=" %%A in ('docker ps -aqf "name=sonarqube"') do set "id=%%A"
::This completely delete docker container
call docker rm -f %id%
::This clean all unused images
call docker image prune

call del /f dc