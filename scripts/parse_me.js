const https = require('http');
const fs = require('fs')

var projectKey = "CIBERSEG";
var page = 1;
var response = '';
var outputJson = [];

loop();

async function getSolutionsCWE() {
    return new Promise(function(resolve, reject) {
        var req_complete = 0;
        for (let index = 0; index < outputJson.length; index++) {
            const element = outputJson[index];
            var url = `http://localhost:9000/api/hotspots/show?hotspot=${element.key}`;
            https.get(url, (resp) => {
                let data = '';
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    var res = JSON.parse(data);
                    element.solution = res.rule.fixRecommendations.replace(/<\/?[^>]+(>|$)/g, "");;

                    let er = /CWE-(\d+)/g
                    element.cwe = res.rule.fixRecommendations.match(er);

                    req_complete += 1;

                    if (req_complete == outputJson.length) {
                        resolve()
                    }
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        }
    })
}

async function loop() {
    response = await getPageFromSonarQube(page);
    outputJson = outputJson.concat(response.hotspots);
    if (outputJson.length != response.paging.total) {
        page += 1;
        loop();
    } else {
        await getSolutionsCWE()
        fs.writeFile('allRecords.json', JSON.stringify(outputJson), function(err) {
            if (err) return console.log(err);
        });
    }
}

async function getPageFromSonarQube(nextPage) {
    return new Promise(function(resolve, reject) {
        var url = `http://localhost:9000/api/hotspots/search?projectKey=${projectKey}&p=${nextPage}&ps=500`;
        https.get(url, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                var res = JSON.parse(data);
                resolve(res)
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    })
}