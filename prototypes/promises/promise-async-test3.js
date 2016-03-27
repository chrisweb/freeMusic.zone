
var promise = new Promise(function(resolve, reject) {
	
	console.log('1) ' + 'before setTimeout');
	
	setTimeout(function() {
		
		console.log('1) ' + 'setTimeout executes');
		
		var message = 'foo';
		
		console.log('1) message is now %s', message);
		
		resolve({ message: message });
		
	}, 2000);
	
})

.then(function (attributes) {
	
	console.log('2) ' + 'before setTimeout', attributes);
	
	var secondPromise = new Promise(function(resolve, reject) {
	
		setTimeout(function() {
			
			console.log('2) ' + 'setTimeout executes', attributes);
			
			var message = attributes.message + ' bar';
			
			console.log('2) message is now %s', message);
			
			resolve({ message: message });
			
		}, 2000);
		
	});
	
	return secondPromise;
	
})

.then(function (attributes) {
	
	console.log('3) ' + 'before setTimeout', attributes);

	setTimeout(function() {
		
		console.log('3) ' + 'setTimeout executes', attributes);
		
		var message = attributes.message + ' baz';
		
		console.log('3) message is now %s', message);
		
		return { message: message };
		
	}, 2000);

});
		  
