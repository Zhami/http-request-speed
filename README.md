## Test Case

 This is code extracted from a node app that I am constructing. It is a small-ish test case that demonstrates a problem that I am experiencing: that GETing a certain URL is much slower with node than when the same URL is acquired by Safari.

### Authors

 - Stuart Malin ([zhami](http://github.com/zhami))

#### Example Run for request-speed.js

This version GETs 25 results from a generic search at AutoTrader.com
(see the "num_records" term of the Query String in the variable rqstURI)

	$ node request-speed.js 
	[0] starting... loading modules...
	[81] modules loaded
	[81] building request...
	[139] issuing request...
	[938] STATUS: 200
	[3175] Data Complete in 551 chunks comprising 488969 byte

The numbers in square brackets are milliseconds since the code starts executing. So:

1. latency to response is ~ 800 ms   (938 - 139)
2.	download is ~ 2.2 seconds   (3175 - 938)

When I GET the specified URL with Safari, the WebKit Resources timing display reports that:

1. latency to response is ~ 700 ms
2. download is ~ 300 ms



#### Example Run for request-speed2.js

This version GETs the nodeJS documentation all on one page.
(http://nodejs.org/docs/v0.4.3/api/all.html)

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

And so, in this test case they are quite close.


#### Example Run for request-speed3.js

This version GETs the page for a book on Amazon.com

Results:

$ node request-speed3.js 
	[0] starting... loading modules...
	[14] modules loaded
	[14] building request...
	[29] issuing request...
	[404] STATUS: 200
	[2538] Data Complete in 313 chunks comprising 315590 byte

So:

1. latency to response is ~ 400 ms
2. download is ~ 2 seconds

When I GET the page using Safari:

1. latency is ~ 600 ms
2. download is ~ 1.4 seconds

And so, in this test case the initial response was quicker for node, but the download was much quicker in Safari.



