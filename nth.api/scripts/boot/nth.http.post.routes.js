    server.route({
        "method": "POST",
        "path": "/modles/{modelname}",
        "config": {
            "handler": function (request, reply) {
                //console.log(request)
                //reply(readModelDefinitionFile(request.params.modelname))
                //console.clear()
                console.log(reply)
                //reply()
            },
            cors: true
        }
    });
var postRoutes = function() {
	opts: {
		"url": "mongodb://username:password@id.mongolab.com:port/collection-name",
		"settings": {
			"db": {
				"native_parser": false
			}
		}
	}
}

module.exports = postRoutes    