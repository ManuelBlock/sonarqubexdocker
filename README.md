# SONARQUBE X DOCKER

This is a tool to automatize the process about launching a SonarQube Scanner.

## REQUISITES
- Docker
- NodeJS
- Windows (it doesn't work on Linux yet)

## How it works

This application downloads all the necessary programs to make an analysis and upload it to SonarQube. It makes a dependency analysis too using Dependency Check by OWASP. 

SonarQube x Docker download the SonarQube Scanner using npm, create a Docker container with a SonarQube server and realize a dependency analysis downloading Dependency Check from Maven or analyzing a .war/.jar file downloading Dependency Check CLI from the original GitHub. 

There is a guide (in Spanish by now) explaining how to use it. 

Enjoy
