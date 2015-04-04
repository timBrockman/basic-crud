//node module & exports review

var checkMe = function(){
  return 'yay res_codes.js is included';
};
module.exports.checkMe = checkMe;

var checkThis = function(msg){
  this.msg = msg || 'this is also included';
  return true;
};
module.exports.checkThis = checkThis;

function checkMeToo(){
  return 'i work too';
}
module.exports.checkMeToo = checkMeToo;
