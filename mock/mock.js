var dic=require('./dic.json')
var appNav=require('./appNav.json')
module.exports = function() {
  return {
      'dic.php':dic,
      'appNav.php':appNav,
  }
};
