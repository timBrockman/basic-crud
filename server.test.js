// some q&d behavior checks to start with

// reqs
var superagent  = require('superagent');
var expect      = require('expect.js');

// tests will use superagent to post put get delete
describe('Simple RESTful api server.. ', function(){
  var id;//will be set by post and used for later tests
  it('should create some object', function(done){
    //post object with superagent
    superagent.post('http://localhost:8080/api/test')
      .send({
        name  : 'foo',
        job   : 'bartender',
        email : 'foo@bar.com'
      })
      .end(function(err,res){
        //no errs response ok and object
        expect(err).to.eql(null);
        expect(res).to.be.ok();
        expect(res.body).to.be.an('object');
        expect(res.body[0]._id.length).to.eql(24);//mongo id length
        //set id for other tests
        id = res.body[0]._id;
        done();
      });
  });
  it('should retrieve a single object', function(done){
    superagent.get('http://localhost:8080/api/test/' + id)
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.eql('foo');
        expect(res.body._id).to.eql(id);
        done();
      });
  });
  it('should retrieve a list of stuff', function(done){
    superagent.get('http://localhost:8080/api/test/')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should update some object', function(done){
    superagent.put('http://localhost:8080/api/test/' + id)
      .send({
        name  : 'fu',
        job   : 'barrister',
        email : 'fu@barrister.com'
      })
      .end(function(err,res){
        //console.log(res); yuck bad tests fixed
        expect(err).to.eql(null);
        expect(res.text).to.eql('success');
        done();
      });
  });
  it('shoud check updated object', function(done){
    superagent.get('http://localhost:8080/api/test/' + id)
      .end(function(err, res){
        //console.log(res.body);
        expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.eql('fu');
        done();
      });
  });
  it('should delete some object', function(done){
    superagent.del('http://localhost:8080/api/test/' + id)
      .end(function(err,res){
        //console.log(res);
        expect(err).to.eql(null);
        expect(res.text).to.eql('success');
        done();
      });
  });
});