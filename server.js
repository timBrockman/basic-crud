//main rest server file
// xtodo: pass all tests
// xtodo: refactor for different organization

var express = require('express');
var mongoskin = require('mongoskin');
var bodyParser = require('body-parser');
var logger = require('morgan');
var consolidate = require('consolidate');
var apiRoutes = require('./api/index');
// todo: consider some basic authn/z

var app = express();
var router = express.Router();//started.. todo: keep going

//middleware
// todo: separate router and app level middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(logger('dev'));

// consider route middleware
//mongo local
var db = mongoskin.db('mongodb://@localhost:27017/test',{safe:true});
//param for collections (mongoskin)
app.param('collectionName', function(req, res, next, collectionName){
  req.collection = db.collection(collectionName);
  return next();
});


//todo: consider more robust api errors and docs

//todo: consider passing router (v4) instead of app (v3)
//api routes
//list
apiRoutes.testRoutes.listTest(app);
//create
apiRoutes.testRoutes.createTest(app);
//get one
apiRoutes.testRoutes.getTest(app);
//update
apiRoutes.testRoutes.updateTest(app);
//delete
apiRoutes.testRoutes.deleteTest(app);

//static nowhere route
app.get('/api', function(req, res, next){
  res.send('404 or some such.. try the api/collection_name/');
});

//some basic serve static
app.use(express.static(__dirname + '/public'));
//some basic handlebars
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('hbs', __dirname + '/views');

//generic homepage call (not api)
app.get('/', function(req, res){
  //todo: maybe add some default data based on req
  res.render('index');
});

//listener @8080
app.listen(8080, function(){
  console.log('listening on 8080..');
});



