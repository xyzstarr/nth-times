'use strict';

const Hapi = require('hapi');
const MongoDB = require('hapi-mongodb');
const Boom = require('boom');
const Joi = require('joi');
const DBConfig = require('./config/DBConfig');

let server = new Hapi.Server();
server.connection({ port: 1337 });

server.route([
	{
        method: "GET",
        path: "/{modelname}",
        config: {
            handler: function (request, reply) {
                reply(readModelDefinitionFile(request.params.modelname))
            },
            cors: true
        }
    },
	{
        method: "POST",
        path: "/{modelName}",
        config: {
            handler: function (request, reply) {
				var db = request.server.plugins['hapi-mongodb'].db;
					db.collection(request.params.modelName).insert(request.payload, (err, result) => {
					if (err) return reply(Boom.internal('Internal MongoDB error', err));
					return reply(result);
				})
            },
            cors: true
        }
    }
]);

server.register({
    register: MongoDB,
    options: DBConfig.opts
}, (err) => {
    if (err) {
        console.error(err);
        throw err;
    }

	server.start((err) => console.log('Server started at:', server.info.uri));
});
var dbReponse = function (err, result) {
	var replyMessage
	if (err) {
		replyMessage = err.message
	}
	else {
		replyMessage = result.result.ok
	}
	//console.log(replyMessage)
	return reply(replyMessage)
}
var deCamelize = function (str) {
	// insert a space before all caps
	return (
		str
			.replace(/([A-Z])/g, ' $1')
			// uppercase the first character
			.replace(/^./, function (str) { return str.toUpperCase(); })
	)
}
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
				"sanjeeva": ModelProperties[item].description,
				"label": deCamelize(item),
				//"placeholder":  item,
				//"icon": "ion-person",
				required: false,
				//"iconPlaceholder": true
			}
		}
		formFields.push(formFieldTemplate)
	}

	return formFields
}