// namespace export review
module.exports = {
  version: '0.0.1',
  message: function(){
    return 'this also works';
  },
  other: function(foo){
    this.foo = foo || 'bar';
    return true;
  }
};