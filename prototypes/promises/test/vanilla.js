var assert = require('assert');

describe('Vanilla Promise', function() {
	
	describe('resolve', function () {
	  
		it('should have hello world message', function () {
			
			var message = 'hello world';
			
			var promise = new Promise(function(resolve, reject) {
				
				resolve({ message: message });
				
			});
			
			promise.then(function(attributes) {
				
				assert.equal(message, attributes.message);
				
			});
		  
		});

	});
	
	describe('reject', function () {
	  
		it('should catch an error', function () {
			
			var message = 'something went wrong';
			
			var promise = new Promise(function(resolve, reject) {
				
				reject(new Error(message));
				
			});
			
			promise.catch(function(error) {
				
				//console.log(error.stack);
				
				assert.equal('object', typeof error);
				assert.equal(message, error.message);
				
			});
		  
		});

	});
	
	describe('is vanilla', function () {
		
		var constructorName = 'Promise';
		
		it('should have a constructor with name \'' + constructorName + '\'', function () {
			
			var promise = new Promise(function(resolve, reject) { });
			
			assert.equal(constructorName, promise.constructor.name);
			
		});
		
		
	});
  
  
});