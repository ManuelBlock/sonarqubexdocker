@echo off
::Install sonarqube-scanner
echo Installing sonarqube scanner
call npm install sonarqube-scanner --save-dev
::Create and initiate sonarqube server on Docker
echo Creating the sonarqube image
call docker build -t sonarqube .
echo Running the sonarqube container
call docker run --name sonarqube -d -p 9000:9000 sonarqube
echo This timeout lets the sonarqube container runs completely
call timeout 120
echo Analysing with Dependency Check
set /p code="Is it a Java or .NET project [java/net]: "
if "%code%"=="net" (
    call scripts\dc_me_net.bat
)
if "%code%"=="java" (
set /p dc_yn="Is it a maven project or not? [y/n]: "
)
if "%code%"=="java" if "%dc_yn%"=="y" (
    call scripts\dc_me.bat
) else (
    call scripts\dc_me_no_mvn.bat
)
::Run sonarqube-scanner
echo Executing the sonarqube scanner
call node scripts\scan_me.js
set /p exit="Press intro to exit..."