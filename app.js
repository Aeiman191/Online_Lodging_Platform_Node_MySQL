var express = require("express");
const mysql= require("mysql");
var app = express();
var path = require("path");
// var http = require('http')
const session = require('express-session');
// var bodyParser=require("body-parser");


var routes = require("./routes/routes");
var db = require("./database");

app.use(routes);
app.use(db);


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth',require('./routes/auth'))



app.set("port",process.env.PORT || 3000);
app.listen(app.get("port"),function(){
    console.log("Server started on port " + app.get("port"));
})


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");




