(function () {
  'use strict';
  var express = require('express');
  var app = express();
    
    
  var cors = require('cors');
app.use(cors());  
    
    
app.options('*', cors());

  require('./config/config_app')(app);
  require('./config/config_routes')(app);


  // START THE SERVER
  console.log('STARTING THE SABRE SERVER');
  console.log('-------------------------');
  app.listen(3000);
  console.log('Started the server');
  process.on('uncaughtException', function (error) {
      console.log(error.stack);
      console.log(error);
  });

})();
