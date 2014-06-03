var wolfram = require('../');
var assert  = require('assert');

describe('node-wolfram', function() {

	it("must throw error when app id is not set", function() {
		var Wolfram = wolfram.init();
		var query   = { query: "differentiate x^2" };
		return Wolfram.ask(query, function(err, result) {
			return assert.ok(err != null, "No Key Set");
			
		});
		
	});

	it("must throw error if app id is invalid", function() {
		this.timeout(10000);
		var Wolfram = wolfram.init('Invalid Key');
		var query   = { query: "differentiate x^2" };
		return Wolfram.ask(query, function(err, result) {
			return assert.ok(err != null, "Returns Invalid Key Error");
		});
	});

	it("must return the result of differentiate x^2", function() {
		this.timeout(10000);
		var Wolfram = wolfram.init(process.env.APPID);
		var query   = { query: "differentiate x^2" };
		return Wolfram.ask(query, function(err, result) {
			assert.ok(err == null, "No Error");
			assert.ok(result != null, "Results must be present");
			return assert.equal("d/dx(x^2) = 2 x", result.pod[0].subpod[0].plaintext[0]);
		});
	}); 


});