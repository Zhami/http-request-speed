var	headers, options, request, rqstURI, startTime, t,
	// functions
	logConsole, processDom, processHTML,
	// modules
	eyes, http;

logConsole = function (text) {
	var	t = Date.now() - startTime;
	console.log('[' + t + '] ' + text);
};


startTime = Date.now();

logConsole("starting... loading modules...");

http = require('http');
eyes = require('eyes');

logConsole("modules loaded");

rqstURI = '/docs/v0.4.3/api/all.html';

options = {
	host:				'nodejs.org',
	method:				'GET',
	port:				80,
	path:				rqstURI,
	'Accept':			'text/html;q=0.9,text/plain;q=0.8;',
	'Cache-Control':	'max-age=0',
	'User-Agent':		'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-us) IDX Engine using NodeJS/0.5.pre (like Safari/533.20.27)'
};

logConsole("building request...");

request = http.request(options, function(response) {

	var chunks, data, size, status;
	
	chunks = 0;
	data = '';
	size = 0;

	status = response.statusCode;
	
	logConsole('STATUS: ' + status);

	response.setEncoding('utf8');

	response.on('error', function (e) {
		var	errno = e.errno;
		
		if (errno === process.ECONNREFUSED) {
			sys.log('ECONNREFUSED: connection refused to ' + request.host + ':' + request.port);
		} else if (errno === process.EAGAIN) {
			sys.log('EAGAIN: No DNS for ' + request.host);
	    } else {
			console.log('!error encountered: ' + e); 
	    }
	});

	response.on('data', function (chunk) {
		var a;
		
		chunks += 1;
		size += chunk.length;
		// reduce whitespace	
		data += chunk.split(/\s+/g).join(' ');
	});

	response.on('end', function(){
		if (status === 200) {
			if (chunks) {
				logConsole('Data Complete in ' + chunks + ' chunks comprising ' + size + ' byte');
			} else {
				logConsole('Aborting... no chunks received');
			}
		} else {
			logConsole('Aborting... Headers:');
			eyes.inspect(response.headers);
		}
	});
	
});

request.on('error', function (e) {
	var	errno = e.errno;
	
	if (errno === process.ECONNREFUSED) {
		sys.log('ECONNREFUSED: connection refused to ' + request.host + ':' + request.port);
	} else if (errno === process.EAGAIN) {
		sys.log('EAGAIN: No DNS for ' + request.host);
    } else {
		console.log('!error encountered: ' + e); 
    }
});


logConsole("issuing request...");

request.end();


