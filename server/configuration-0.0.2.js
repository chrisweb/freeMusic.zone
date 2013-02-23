
exports.version = '0.0.2';

var getConfiguration = function () {

	var configurationObject = {
	
		'server': {
			'port': 35000
		}
	
	};

	return configurationObject;
	
};

exports.getServerConfiguration = getConfiguration;