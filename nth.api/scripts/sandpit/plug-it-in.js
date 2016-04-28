var letsPlugItIn = {
    saySomething: function (){
        return("i said something!!!")
    },
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply('Hello world!');
      }
    });
    next();
  }
}

letsPlugItIn.register.attributes = {
  name: 'letsPlugItIn',
  version: '1.0.0'
};

module.exports = letsPlugItIn;