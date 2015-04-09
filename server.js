//main rest server file
// xtodo: pass all tests
// todo: refactor for different organization

var express = require('express');
var mongoskin = require('mongoskin');
var bodyParser = require('body-parser');
var logger = require('morgan');
var apiRoutes = require('./api/index');
// todo: breakup into require module.exports

var app = express();
//middleware
// todo: separate router and app level middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(logger('dev'));

//mongo local
var db = mongoskin.db('mongodb://@localhost:27017/test',{safe:true});
//param for collections (mongoskin)
app.param('collectionName', function(req, res, next, collectionName){
  req.collection = db.collection(collectionName);
  return next();
});

//routes
app.get('/', function(req, res, next){
  res.send('404 or some such.. try the api/collection_name/');
});

//list
apiRoutes.testRoutes.listTest(app);

//create
apiRoutes.testRoutes.createTest(app);

//get one (required version passed)
//todo: consider passing router instead of app
apiRoutes.testRoutes.getTest(app);

//update
apiRoutes.testRoutes.updateTest(app);

//delete
apiRoutes.testRoutes.deleteTest(app);

//listener @8080
app.listen(8080, function(){
  console.log('listening on 8080..');
});