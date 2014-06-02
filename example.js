var wolfram = require('./index').init('***********');
var util = require('util');
var async = require('async');

var query = {

	query : 'pi',
	assumption: '*C.pi-_*Movie-'
}

async.series([

	function(cb) {
		wolfram.ask(query, function(err, data){
			if(err) throw err;
			console.log(data)
			cb(null, "done")
		})
	},

	function(cb) {
		wolfram.getQuery(function(err, data){
			if(err) throw err;
			console.log(data)
			cb(null, "done")
		})
	},

	function(cb) {
		wolfram.getPod(function(err, data){
			if(err) throw err;
			cb(null, "done")
		})
	}
], function(err, re){

	//All set

});



