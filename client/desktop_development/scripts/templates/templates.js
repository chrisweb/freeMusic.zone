define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["templates/layout"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<header>\r\n\r\n</header>\r\n<section id="main">\r\n\r\n</section>\r\n<aside>\r\n\r\n</aside>\r\n<footer>\r\n\r\n</footer>';

}
return __p
};

this["JST"]["templates/partials/navigation"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '';

}
return __p
};

this["JST"]["templates/partials/search"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="input-group input-group-lg search">\r\n    <input type="text" class="form-control" placeholder="Search">\r\n    <span class="input-group-btn">\r\n        <button class="btn btn-info btn-default" type="button">\r\n            <span class="glyphicon glyphicon-search"></span>\r\n        </button>\r\n    </span>\r\n</div>';

}
return __p
};

  return this["JST"];

});