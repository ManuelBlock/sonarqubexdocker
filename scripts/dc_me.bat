@echo off
call cd ../
call sonarqubexdocker\req\apache-maven-3.6.3\bin\mvn clean install
call sonarqubexdocker\req\apache-maven-3.6.3\bin\mvn org.owasp:dependency-check-maven:6.0.3:check '-Dformats=CSV,HTML'
call cd "sonarqubexdocker"