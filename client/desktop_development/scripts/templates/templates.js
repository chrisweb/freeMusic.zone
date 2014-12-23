define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["templates/partials/header_navigation"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<nav class="navbar navbar-default" role="navigation" id="header_navigation">\r\n    <div class="container-fluid">\r\n\r\n        <div class="row">\r\n            <div class="col-md-3 col-sm-3">\r\n\r\n                <a class="navbar-brand" href="#">Brand</a>\r\n\r\n                <button type="button" class="btn btn-default navbar-btn" id="left_navigation_button">\r\n                    <i class="fa fa-bars"></i>\r\n                    <span class="caret"></span>\r\n                </button>\r\n\r\n            </div>\r\n            <div class="col-md-3 col-sm-3">\r\n                Player\r\n            </div>\r\n            <div class="col-md-3 col-sm-3">\r\n\r\n                <form class="navbar-form navbar-right" role="search">\r\n                    <div class="form-group">\r\n                        <div class="input-group">\r\n                            <input type="text" class="form-control" placeholder="Search">\r\n                            <span class="input-group-btn">\r\n                                <button class="btn btn-default" type="button">\r\n                                    <span class="glyphicon glyphicon-search"></span>\r\n                                </button>\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n\r\n            </div>\r\n            <div class="col-md-3 col-sm-3">\r\n                <div class="navbar-right">\r\n\r\n                    <button type="button" class="btn btn-default navbar-btn">\r\n                        <i class="fa fa-user"></i>\r\n                    </button>\r\n                    \r\n                    <button type="button" class="btn btn-default navbar-btn">\r\n                        <i class="fa fa-cog"></i>\r\n                    </button>\r\n                    \r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</nav>';

}
return __p
};

this["JST"]["templates/partials/left_navigation"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<nav role="navigation" id="left_navigation">\r\n    \r\n    <a href="/collaborative-playlists" class="playlist">\r\n        <i class="fa fa-list"></i>\r\n    </a>\r\n\r\n    <a href="/twitter-charts" class="tweet">\r\n        <i class="fa fa-twitter"></i>\r\n    </a>\r\n\r\n    <a href="/quiz-games" class="quiz">\r\n        <i class="fa fa-gamepad"></i>\r\n    </a>\r\n\r\n    <a href="/remote-control" class="remote">\r\n        <i class="fa fa-caret-square-o-right"></i>\r\n    </a>\r\n    \r\n</nav>';

}
return __p
};

this["JST"]["templates/partials/login"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="connect">\r\n    \r\n    <div class="connectCore t">\r\n    \r\n        <div class="tr">\r\n            <div class="td">\r\n\r\n                <fieldset class="login">\r\n                    <legend class="h1">Login with your jamendo account:</legend>\r\n                    <div class="btn btn-lg btn-empty" id="loginButton">\r\n                        <span>Jamendo connect</span>\r\n                        <iframe src="" class="jamendo hidden" scrolling="no" frameBorder="0"></iframe>\r\n                    </div>\r\n                </fieldset>\r\n                \r\n                <h1 class="h2 joinTitle">Join the wolrdwide biggest community of free music lovers and indie artists</h1>\r\n\r\n                <ul class="joinFeatures">\r\n                    <li>Collaborate with others in realtime to build great playlists</li>\r\n                    <li>Share your favorite tracks with your friends</li>\r\n                    <li>Discover trending albums from amazing indie artist</li>\r\n                    <li>Remote control music with your phone or tablet</li>\r\n                    <li>Play music games and beat the highscore</li>\r\n                </ul>\r\n                \r\n            </div>\r\n        </div>\r\n        \r\n    </div>\r\n    \r\n</div>';

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
__p += '<tr data-track-id="' +
((__t = ( id )) == null ? '' : __t) +
'">\r\n    <td><button type="button" class="icon dashed fa fa-play trackPreview"></button></td>\r\n    <td>' +
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

this["JST"]["templates/partials/welcome"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section class="welcome">\r\n    <p>welcome view</p>\r\n</section>';

}
return __p
};

  return this["JST"];

});