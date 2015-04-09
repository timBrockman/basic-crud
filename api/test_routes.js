//module.exports wraps big object style
// consider hoisting instead

module.exports ={
  //routes
  getTest: getTest,
  listTest: listTest,
  createTest: createTest,
  updateTest: updateTest,
  deleteTest: deleteTest
};
//todo: consider breaking route operations (and maybe helpers) out
//will it hoist?
function getTest(app){
  app.get('/api/:collectionName/:id', function(req, res, next){
    req.collection.findById(req.params.id, function(err, results){
      if(err) return next(err);
      res.send(results);
    });
  });
}
function listTest(app){
  app.get('/api/:collectionName', function(req, res, next){
    req.collection.find({}, {limit:5, sort:{'_id':- 1}})
      .toArray(function(err, results){
        if(err) return next(err);
        res.send(results);
      });
  });
}
function createTest(app){
  app.post('/api/:collectionName', function(req, res, next){
    req.collection.insert(req.body, {}, function(err, results){
      if(err) return next(err);
      res.send(results);
    });
  });
}
function updateTest(app){
  app.put('/api/:collectionName/:id', function(req, res, next){
    req.collection.updateById(req.params.id,
      {$set: req.body},
      {safe: true, multi: false},
      function(err, results){
        if(err) return next(err);
        res.send((results===1)?'success' : err);
      });
  });
}
function deleteTest(app){
  app.delete('/api/:collectionName/:id', function(req, res, next){
    req.collection.removeById(req.params.id, function(err, results){
      if(err) return next(err);
      res.send((results === 1)?'success': err);
    });
  });
}