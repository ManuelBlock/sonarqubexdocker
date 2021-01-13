const readline = require("readline");
const fs = require('fs')

let opt = JSON.parse(fs.readFileSync("scripts/config.json"));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var password;

rl.question("Password in SonarQube (by default it is 'admin'): ", function(password_in) {
    password = password_in;
    rl.close();
});

rl.on("close", function() {
    opt.password = password;
    fs.writeFileSync('scripts/config.json', JSON.stringify(opt, null, 2));
});