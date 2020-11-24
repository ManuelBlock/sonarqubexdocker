const scanner = require('sonarqube-scanner');

var name, description, folder;
let opt = require('./conf_sonar_scan')

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Name of the project: ", function(name_in) {
    rl.question("Description of the project: ", function(description_in) {
        rl.question("Folder with source files (ex. src, Main..): ", function(folder_in) {
            name = name_in;
            description = description_in;
            folder = folder_in;
            rl.close();
        });
    });
});

rl.on("close", function() {
    scanner({
            serverUrl: 'http://localhost:9000',
            options: {
                'sonar.projectKey': opt.sonar.projectKey,
                'sonar.projectName': name,
                'sonar.projectDescription': description,
                'sonar.sources': folder,
                'sonar.java.binaries': opt.sonar.java_binaries,
                'sonar.projectBaseDir': opt.sonar.projectBaseDir,
                'sonar.sourceEncoding': opt.sonar.sourceEncoding,
                'sonar.dependencyCheck.htmlReportPath': opt.sonar.dependencyCheck_htmlReportPath
            }
        },
        () => process.exit()
    )
    process.exit(0);
});