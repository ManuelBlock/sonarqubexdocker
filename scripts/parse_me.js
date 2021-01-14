var request = require('request');
const fs = require('fs');
let opt = JSON.parse(fs.readFileSync("scripts/config.json"));

var page = 1;
var response = '';
var outputJson = [];
var projectKey, password, bearer;

bearer = `admin:` + opt.password;
const buff = Buffer.from(bearer, 'utf-8');
// decode buffer as Base64
const bearer64 = buff.toString('base64');
password = `Basic ` + bearer64;
projectKey = opt.projectKey;

loop();

async function getSolutionsCWE() {
    return new Promise(function(resolve, reject) {
        var req_complete = 0;
        for (let index = 0; index < outputJson.length; index++) {
            const element = outputJson[index];
            var url = `http://localhost:9000/api/hotspots/show?hotspot=${element.key}`;
            var options = {
                'method': 'GET',
                'url': url,
                'headers': {
                    'Authorization': password
                }
            };
            request(options, function(error, response) {
                if (error) throw new Error(error);
                var res = JSON.parse(response.body);
                element.solution = res.rule.fixRecommendations.replace(/<\/?[^>]+(>|$)/g, "");

                let er = /CWE-(\d+)/g
                element.cwe = res.rule.fixRecommendations.match(er);

                req_complete += 1;

                if (req_complete == outputJson.length) {
                    resolve()
                }
            });
        }
    });
}

async function loop() {
    response = await getPageFromSonarQube(page);
    outputJson = outputJson.concat(response.hotspots);
    if (outputJson.length != response.paging.total) {
        page += 1;
        loop();
    } else {
        if (outputJson.length != 0) {
            await getSolutionsCWE()
            fs.writeFile('allRecords.json', JSON.stringify(outputJson), function(err) {
                if (err) return console.log(err);
            });
        }
    }
}

async function getPageFromSonarQube(nextPage) {
    return new Promise(function(resolve, reject) {
        var url = `http://localhost:9000/api/hotspots/search?projectKey=${projectKey}&p=${nextPage}&ps=500`;
        var options = {
            'method': 'GET',
            'url': url,
            'headers': {
                'Authorization': 'Basic YWRtaW46YWRtaW4='
            }
        };
        request(options, function(error, response) {
            if (error) throw new Error(error);
            var res = JSON.parse(response.body);
            resolve(res)
        });
    })
}