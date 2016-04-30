var nthMongo = {
	  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/',
      handler:  function(plugin, options, next){
		
		var child_process = require('child_process')
		child_process.exec('start mongod', function (err, stdout, stderr) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('starting mongod.exe process...');
    });
	next();
	}
    });
   // next();
  },
	startDBService: function(plugin, options, next){
		console.log('ddddd');
		var child_process = require('child_process')
		child_process.exec('start mongod', function (err, stdout, stderr) {
        if (err) {
            console.log(err);
            return;
        }
    });
	//next();
	}
}

nthMongo.register.attributes = {
name: 'nthMongo',
 version: '1.0.0'
};

module.exports = nthMongo;

