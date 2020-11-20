@echo off
call cd ../
call sonarxdocker\req\apache-maven-3.6.3\bin\mvn clean install
call sonarxdocker\req\apache-maven-3.6.3\bin\mvn org.owasp:dependency-check-maven:6.0.3:check
call cd "sonarxdocker"