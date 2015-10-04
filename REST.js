var express = require("express");
var pg   = require("pg");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });

    router.post("/newusu",function(req,res){
        pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
            client.one("INSERT INTO usuarios (usuario,password,nombre,telefono,fecha) 
            	VALUES ($1,$2,$3,$4)",
            	[req.body.usuario,eq.body.password,req.body.nombre,req.body.telefono,CURRENT_DATE]),
                function(err, result) {
            done();
            if (err)
                res.json({"Error" : true, "Message" : "Error ejecutando postgresSQL query"});
            });
        });
    });

    router.post("/newofe",function(req,res){
        pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
        	client.one("INSERT INTO ofertas (email,isbn,titulo,editorial,curso,Ciclo,estado,latitud,longitud,fecha) 
        	VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
        	[req.body.email,req.body.isbn,req.body.titulo,req.body.editorial,req.body.curso,req.body.ciclo,req.body.estado,eq.body.latitud,req.body.longitud],CURRENT_DATE),
            function(err, result) {
            done();
            if (err) 
                res.json({"Error" : true, "Message" : "Error ejecutando postgresSQL query"});
            });
        });
    });

    router.get("/getusu/:usuario/:password",function(req,res){
        pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
        client.query("SELECT * FROM usuarios WHERE usuario=$1 AND password=$2", [req.params.usuario, req.params.password],
        	function(err, result) {
            done();
            if(err)
                res.json({"Error" : true, "Message" : "Error ejecutando postgresSQL query"});
            else 
                res.json({"Error" : false, "Message" : "Success", "usuarios" : result.rows});
            });
        });
    });

    router.get("/getusu/:usuario/",function(req,res){
        pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
        client.query("SELECT * FROM usuarios WHERE usuario=$1",[req.params.usuario],
        	function(err, result) {
            done();
            if(err)
                res.json({"Error" : true, "Message" : "Error ejecutando postgresSQL query"});
            else 
                res.json({"Error" : false, "Message" : "Success", "usuarios" : result.rows});
            });
        });
    });

    router.get("/ofertas",function(req,res){
    	pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
    		client.query("SELECT * FROM ofertas", function(err, result) {
    		done();
            if(err)
                res.json({"Error" : true, "Message" : "Error ejecutando postgresSQL query"});
            else
                res.json({"Error" : false, "Message" : "Success", "Oferta" : result.rows});
            });
        });
    });

    router.get("/delofe/:isbn",function(req,res){
    	pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
    		client.query("DELETE FROM ofertas WHERE isbn=$1",[req.params.isbn], function(err, result) {
    		done();
            if(err)
                res.json({"Error" : true, "Mensaje" : "Error ejecutando postgresSQL query"});
            else
                res.json({"Error" : false, "Mensaje" : "Success", "Oferta" : result.rows});
            });            
        });
    });

    router.get("/getofe/:email",function(req,res){
        pg.connect(process.env.DATABASE_URL || connection, function(err, client, done) {
        client.query("SELECT * FROM ofertas WHERE email=$1",[req.params.email], function(err, result) {
            done();
            if(err)
                res.json({"Error" : true, "Mensaje" : "Error ejecutando postgresSQL query"});
            else
                res.json({"Error" : false, "Mensaje" : "Success", "Oferta" : result.rows});
            });            
        });
    });
}

module.exports = REST_ROUTER;
