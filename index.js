var express = require('express')
  , routes = require('./routes')
  , path = require('path'),
    fileUpload = require('express-fileupload'),
    app = express(),
    mysql      = require('mysql'),
    bodyParser=require("body-parser");
    
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'imageupload'
});
 
connection.connect();
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'layers')));
app.use( express.static( "public" ) );
app.use(fileUpload());
// development only
 

// app.post('/', routes.index);//call for signup postt
app.get('/', routes.index);//call for main index page
app.post('/', routes.index);//call for signup postt
//app.get('/profile/:id',routes.profile);
app.get('/restart', function (req, res, next) {
  process.exit(1);
});

//Middleware
app.listen(process.env.PORT || 3001, ()=> console.log("Server Running..."))
