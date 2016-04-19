
var express = require('express')
	, http = require('http')
	, path = require('path');

var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongoSessionConnectURL = "mongodb://localhost:27017/amazon_fresh";   //Change this if needed ................................//
var home=require('./routes/home');
var product=require('./routes/product');
var app = express();
app.use(expressSession({
	secret: 'fjklowjafnkvnap',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
 if ('development' == app.get('env')) {
   app.use(express.errorHandler());
 }

//All GET methods...........................//
app.get('/', function(req, res){
	res.render('index', {});
});                     // Change this..........................................//

app.get('/product', function(req, res){
  res.render('product', {});
});
app.get('/redirectToHomepage',home.redirectToHomepage);
app.get('/addProduct',product.addProduct);

//All POST methods.........................//
//app.post('/signUpUser', users.signUpUser);           // Change this..........................................//
app.post('/login',home.doLogin);
app.post('/doAddProduct',product.doAddProduct);


http.createServer(app).listen(app.get('port'), function(){
	console.log('AmazonFresh Node-Server listening on port ' + app.get('port'));
});
