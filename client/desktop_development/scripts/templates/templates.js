define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["templates/application"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Hello ' +
((__t = ( world )) == null ? '' : __t) +
'</p>';

}
return __p
};

  return this["JST"];

});