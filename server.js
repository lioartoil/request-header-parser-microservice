// server.js
// where your node app starts

// init project
var express = require('./node_modules/express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('./node_modules/cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function(req, res) {
	res.json({ greeting: 'hello API' });
});

app.get(
	'/api/whoami',
	({ ip, headers, connection: { remoteAddress } }, res) => {
		res.json({
			ipaddress: ip || headers['x-forwarded-for'] || remoteAddress,
			language: headers['accept-language'],
			software: headers['user-agent']
		});
	}
);

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});
