define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["templates/layout"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<header></header>\r\n<section id="main"></section>\r\n<aside></aside>\r\n<footer></footer>';

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

this["JST"]["templates/partials/notfound"] = function(obj) {
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

this["JST"]["templates/partials/trackRow"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<tr>\r\n    <td></td>\r\n    <td>' +
((__t = ( name )) == null ? '' : __t) +
'</td>\r\n    <td>' +
((__t = ( artist_name )) == null ? '' : __t) +
'</td>\r\n    <td>' +
((__t = ( duration )) == null ? '' : __t) +
'</td>\r\n    <td>' +
((__t = ( album_name )) == null ? '' : __t) +
'</td>\r\n</tr>';

}
return __p
};

this["JST"]["templates/partials/tracksList"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<table class="table table-hover">\r\n    <thead>\r\n        <tr>\r\n            <th class="col-md-2">Actions</th>\r\n            <th>Title</th>\r\n            <th>Artist</th>\r\n            <th>Duration</th>\r\n            <th>Album</th>\r\n        </tr>\r\n    </thead>\r\n    <tbody class="list"></tbody>\r\n</table>';

}
return __p
};

  return this["JST"];

});