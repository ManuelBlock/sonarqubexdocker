@echo off

::Managing directories
call cd req
call mkdir dc
call cd dc
call mkdir input

::This avoid download and update dependency check if it exists
if not exist dependency-check (
    call ..\wget.exe https://github.com/jeremylong/DependencyCheck/releases/download/v6.0.3/dependency-check-6.0.3-release.zip
    call tar -xf dependency-check-6.0.3-release.zip
)

echo Please place the .war file or the .jar file into the input folder, press enter to continue
echo Press any key to skip the timer if you already did it
echo Friendly advice, use an easy name (ex. app.war)
set /p asd="Hit enter to continue"
set /p file=Please, paste full name (with extension) of the war/jar: 

::This command print the output of the dependency check
::It will help to determine if there is any problem
call dependency-check\bin\dependency-check.bat -s input\%file% -f CSV -f HTML

if not exist ..\..\..\target (
    mkdir ..\..\..\target
)

::This command move the report to the target folder to upload it to SonarQube during the analysis
call move "dependency-check\bin\dependency-check-report.html" "..\..\..\target"

echo Report was properly moved to the correct file!
echo Deleting zip file if it was downloaded and input folder
call del dependency-check-6.0.3-release.zip
call del input
cd ../../