const scanner = require('sonarqube-scanner');
const fs = require('fs');

var name, description, folder;
let opt = JSON.parse(fs.readFileSync("scripts/config.json"));

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
            //Set projectKey here to use it later
            opt.projectKey = name;
            fs.writeFileSync('scripts/config.json', JSON.stringify(opt, null, 2));
            rl.close();
        });
    });
});

rl.on("close", function() {
    scanner({
            serverUrl: 'http://localhost:9000',
            options: {
                'sonar.login': "admin",
                'sonar.password': opt.password,
                'sonar.projectKey': name,
                'sonar.projectName': name,
                'sonar.projectDescription': description,
                'sonar.sources': folder,
                'sonar.java.binaries': opt.java_binaries,
                'sonar.projectBaseDir': opt.projectBaseDir,
                'sonar.sourceEncoding': opt.sourceEncoding,
                'sonar.dependencyCheck.htmlReportPath': opt.dependencyCheck_htmlReportPath
            }
        },
        () => process.exit()
    )
    process.exit(0);
});