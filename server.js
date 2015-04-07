//main rest server file
// todo: pass all tests
// todo: refactor for different organization

var express = require('express');
var mongoskin = require('mongoskin');
var bodyParser = require('body-parser');
var logger = require('morgan');
// todo: breakup into require module.exports

var app = express();
//middleware
app.use(bodyParser());
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
app.get('/api/:collectionName', function(req, res, next){
  req.collection.find({}, {limit:5, sort:{'_id':- 1}})
    .toArray(function(err, results){
      if(err) return next(err);
      res.send(results);
    });
});

//create
app.post('/api/:collectionName', function(req, res, next){
  req.collection.insert(req.body, {}, function(err, results){
    if(err) return next(err);
    res.send(results);
  });
});

//get one
app.get('/api/:collectionName/:id', function(req, res, next){
  req.collection.findById(req.params.id, function(err, results){
    if(err) return next(err);
    res.send(results);
  });
});

//update
app.put('/api/:collectionName/:id', function(req, res, next){
  req.collection.updateById(req.params.id,
    {$set: req.body},
    {safe: true, multi: false},
    function(err, results){
      if(err) return next(err);
      res.send((results===1)?'success' : err);
    });
});

//delete
app.delete('/api/:collectionName/:id', function(req, res, next){
  req.collection.removeById(req.params.id, function(err, results){
    if(err) return next(err);
    res.send((results === 1)?'success': err);
  });
});

//listener @8080
app.listen(8080, function(){
  console.log('listening on 8080..');
});