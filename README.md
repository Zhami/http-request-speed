## Test Case

 This is code extracted from a node app that I am constructing. It is a small-ish test case that demonstrates a problem that I am experiencing: that GETing a certain URL is much slower with node than when the same URL is acquired by Safari.

### Authors

 - Stuart Malin ([zhami](http://github.com/zhami))

#### Example Run for request-speed.js

	$ node request-speed.js 
	[0] starting... loading modules...
	[81] modules loaded
	[81] building request...
	[139] issuing request...
	[938] STATUS: 200
	[3175] Data Complete in 551 chunks comprising 488969 byte

The numbers in square brackets ae milliseconds since the code starts executing. So:

1. latency to response is ~ 800 ms   (938 - 139)
2.	download is ~ 2.2 seconds   (3175 - 938)

When I GET the specified URL with Safari, the WebKit Resources timing display reports that:

1. latency to response is ~ 700 ms
2. download is ~ 300 ms

btw: This example requests 25 search results (see the "num_records" term of the Query String in the variable rqstURI.


#### Example Run for request-speed2.js

This version just changes the URL to GET the nodeJS  documentation all on one page.

Results:

	$ node request-speed2.js 
	[0] starting... loading modules...
	[39] modules loaded
	[40] building request...
	[70] issuing request...
	[291] STATUS: 200
	[1273] Data Complete in 127 chunks comprising 179525 byte

So:

1. latency to response is ~ 200 ms
2. download is ~ 1000 ms

When I GET the page using Safari:

1. latency is ~ 200 ms
2. download is ~ 800 ms

So, in this test case they are quite close.
