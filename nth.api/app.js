(function () {
    'use strict';
    var Hapi = require('hapi');
    
    var server = new Hapi.Server();
    server.connection({ port: 1337, host: 'localhost' });
    server.route( {
    "method"  : "GET",
        "path"    : "/modles/{modelname}",
    "config": {
            "handler" : function (request,reply) {
                //console.log(request)
                reply(readModelDefinitionFile(request.params.modelname))
                //console.log(reply)
                //reply()
            },
            cors: true
        }
});
    server.start(function () {
        console.log('Server up and running at:', server.info.uri);
    });
    var startDBService = function (plugin, options, next) {
        var child_process = require('child_process')
        //D:\work\tools\MEAN/mongodb\bin\mongod.exe
        child_process.exec('start D:/work/tools/MEAN/mongodb/bin/mongod', function (err, stdout, stderr) {
            // Retrieve
            var MongoClient = require('mongodb').MongoClient;
            
            // Connect to the db
            MongoClient.connect("mongodb://127.0.0.1:27017/thing", function (err, db) {
                if (!err) {
                    console.log("We are connected");
                    //console.log(server)
                }
                else { console.log(err)}
            });
            if (err) {
                console.log(err);
                return;
            }
        });
	//next();
    }
    startDBService()
    
    function readModelDefinitionFile(modelFile) {
        console.log(modelFile)
         //var modelFile = "Ticket"
        var modelsFolder = "D:/work/dev/nth/data_dumps/schema_models/generated_loopback_models/testing/"
        var modelFileRetriever = require('jsonfile');
        /*
        // asynchronous version
        modelDefinition.readFile('/path/to/file.json', function (err, obj) {
            // obj contains JSON data
        });
        */
        // synchronous version
        var modelDefinition = modelFileRetriever.readFileSync(modelsFolder + modelFile + ".json");
        var formFields = []
        var ModelProperties = modelDefinition.properties
        for (var item in ModelProperties) {
           // console.log(item.type)
            var formFieldTemplate = {
                "type": "input",
                "key": item,
                "templateOptions": {
                    "type": "text",
                    //"label": ModelProperties[item].description,
                    "label":item,
                    //"placeholder":  item,
                    //"icon": "ion-person",
                    required : false,
                    //"iconPlaceholder": true
                }
            }
            formFields.push(formFieldTemplate)
        }
        
       return formFields 
    }
   // readModelDefinitionFile("Ticket")


})();
