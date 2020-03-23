const http = require('http');

const hostname = 'localhost';
const port = 3000;
const exec = require('child_process').exec;

const server = http.createServer((req, res) => {
	var runScript;
	var scriptResult;
	var pathScript = exec('cd /usr/local/bin',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: directory`);
            } else {
            	var runScript = exec('timedepositcoin-cli getbalance',
			        (error, stdout, stderr) => {
			            console.log(stdout);
			            scriptResult = stdout;
			            console.log(stderr);
			            if (error !== null) {
			                console.log(`exec error: get balance`);
			            }
			        });	
            }
        });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(scriptResult);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});