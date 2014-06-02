var xml2js  = require('xml2js').parseString,
    request = require('restler'),
    async   = require('async');

var Wolfram = function Wolfram(key) {
	this.key = key;
}

Wolfram.prototype.ask = function(term, callback) {
	if(!this.key) {
		return callback('Please set Wolfram App Key', null);
	}

	var data = {
		input  		:  term.query || '' ,
		assumption  :  term.assumption || '' ,
		translation :  term.translation || false,
		reinterpret :  term.reinterpret || false,
		primary		:  term.primary || true,
		appid		:  this.key
	};

	this.setQuery(data);
	
	var query_url = 'http://api.wolframalpha.com/v2/query';

	async.waterfall([

		function(next) {
			//Request query to Wolfram
			request.get(query_url, { query: data })
				   .on('complete', function(results, response) {
				   		if(response.statusCode == 200) {
				   			next(null, results);
				   		}

				   })
				   .on('error', function(err, response) {
				   		next(err, null);
				   });		
		},

		function(results, next) {
			//Convert the XML to JSON
			xml2js(results, function(error, result) {
				next(null, result);
 			});

		},

		function(result, next) {
			//Check for errors in result
			if(result.queryresult.$.error == 'true') {
				var err = result.queryresult.error[0].msg;
				next(err, null);
			}
			next(null, result);
		}

	], function(err, result) {
		if(err){
			return callback(err, null);
		}

		Wolfram.prototype.setResults(result.queryresult);

		return callback(null, result.queryresult);
	});
};

Wolfram.prototype.setResults = function(result) {
	this.query_results = result;
}

Wolfram.prototype.getResults = function(callback) {
	if(this.query_results) {
		return callback(null, this.query_results);
	}

	return callback('No Results Found. Check if you initialized Query', null);
};

Wolfram.prototype.setQuery = function(query) {
	this.query = query;
}

Wolfram.prototype.getQuery = function(callback) {

	if(this.query) {
		return callback(null, this.query);
	}

	return callback('No Query set.', null);
};

Wolfram.prototype.getPod = function(callback) {

	if(this.query_results) {
		return callback(null, this.query_results.pod);
	}

	return callback('No Results Found. Check if you initialized Query', null)

};

module.exports = {

	wolfram : Wolfram,
	init	: function(key) {  return new Wolfram(key) }

};



