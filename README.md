node-wolfram - Wolfram | Alpha API Wrapper for Node
=================================================

node-wolfram provides a simple API wrapper to use the Wolfram | Alpha service for NodeJS.

API
---

### ask(data, callback) 

Used to set the query and make a request to Wolfram | Alpha and returns the result in JSON

#### data

* `query` - The actual input to be queried to Wolfram | Alpha
* `assumption` - Applies an assumption to the query.
* `translation` - Used to set the automatic translation to English. Defaults to `false`
* `reinterpret` - Used to reinterpret the query if Wolfram | Alpha does not understand. Defaults to `false`
* `primary` - Used to display the closest thing to a simple "answer" that Wolfram|Alpha can provide. Defaults to `true`

### getResults(callback)

Used to get the results for the given query in JSON

### getQuery(callback)

Used to return the query that is currently being set

### getPod(callback)

Used to return the Pod from the Query Results

Example Usage
-------------

You will need an application ID to access the Wolfram | Alpha API. You can get it by signing up on [Wolfram | Alpha Developer](http://products.wolframalpha.com/api/)

```javascript 
var wolfram = require('./').init('APPLICATION_ID');

var data = {
	
	query : 'pi',
	assumption: '*C.pi-_*Movie-'

};

wolfram.ask(data, function(err, results) {
	if(err)
		throw err;

	//Do something interesting with your data
	//or simply display it
	console.log(util.inspect(results, false, null));
});

wolfram.getPod(function(err, results) {
	if(err)
		throw err;

	//Access the Pods here
	console.log(util.inspect(results, false, null));
});

wolfram.getQuery(function(err, query) { 
	if(err)
		throw err;

	//Returns the Query currently being set
	//	{
	//		input: 'pi',
	// 		assumption: '*C.pi-_*Movie-',
	// 		translation: false,
	// 		reinterpret: false,
	// 		primary: true,
	// 		appid: '***********' 
	// 	}
	
});

```

Tests
-----

Install Mocha `$ npm install -g mocha`
Run Test `$APPID = 'YOUR_APP_ID' npm test`

License
-------

MIT
