var express = require("express");
var pg   = require("pg");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var rest = require("./REST.js");
var app  = express();

function REST(){
    var self = this;
    self.connectPg();
};

REST.prototype.connectPg = function() {
    var self = this;
    var connection = process.env.DATABASE_URL  || 'postgres://postgres:miosotis@localhost:5432/librostexto';
   	pg.connect(connection, function(err, client, done){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,connection,md5);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(process.env.PORT || 3000,function(){
          console.log("¡Todo correcto! Estoy saliendo por el Puerto 3000.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH PG \n" + err);
    process.exit(1);
}

new REST();