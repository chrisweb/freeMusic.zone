# Todos

Put all the todos in the github issues section?

## Next todos

* make api really restfull, (no cookie?), stateless
* setup aws
* search queries cache on server with redis
* track infos cache on server with redis
* a controller module that can be extended and is architectured like the backbone view or backbone model modules
* views el should be extracted from template and then build upon this, then remove the main element from template
* if the view event listener selector includes the class of the root element the event won't get, which cant be found, works fine with the original backbone
* a soundmanager player
* create own grunt contrib jst with undefined checks, because underscore precompiled templates throw not defined error if you execute template with no data, this is a problem if in initialize you want the template html code but have no data yet
* needs fix??? when creating a view using addModel the view ids always get increment by 2???
* mobile support (pointer events?)
* a cordova version for android and iOS
* client side error logging tool
* socket io chat (one room per playlist)
* list of playlists (homepage) sort by (popularity / date)
* playlist detail
* run twitter harvester to fill db
* twitter stream listener to mongodb (tweet a track id and playlist id followed by #music to increase tracks score)
* jamendo api calls and oauth connect