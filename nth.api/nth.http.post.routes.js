    server.route({
        "method": "GET",
        "path": "/modles/{modelname}",
        "config": {
            "handler": function (request, reply) {
                //console.log(request)
                reply(readModelDefinitionFile(request.params.modelname))
                //console.log(reply)
                //reply()
            },
            cors: true
        }
    });
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