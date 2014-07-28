# Features

## For sure

* cooperative multi user playlist with chat
* twitter charts, scan twitter stream of accounts like the jamendo account, each time a song gets posted on twitter record the tweet, map reduce to create charts of most tweeted tracks

## Maybe

* remote, use the app on a tablet or phone as a remote for another session of the app on a desktop or tv, login into both apps with same account, pub sub sync the state of both apps for that account
* video paylist, playlist to youtube, create a playlist of jamendo tracks, then a script checks if those videos exist on youtube and create a videos playlist based on the jamendo playlist
* drive playlist, google drive download / backup, download tracks directly into your google drive account or backup entire playlists

## Nice to have, but probably not enough time

* recommendation, use a recommendation tool to create a discovery page per genre updated once a day, improvement create personal dicovery page based on user data (jamendo likes, facebook likes, ...)
* song visualizer, use a script to calculate a track fourier transform or wave form, html5 canvas to visualize

### App sections

##### Remote fuctionality

* control one instance of the player on for example your tv using the same instance on your tablet or phone
* can be enabled or disabled

##### Jam with friends

* team playlist where every user can add songs
* up or downvote songs
* song with most votes gets played next
* show how often a song got played
* show who selected the song
* playlist picture upload
* choose playlist name
* choose existing playlist to start

##### Jam Quiz

* tracks quiz created by the community
* choose a track and add chalanges
** find at least three instruments used in the song
** language of the lyrics
** name of the artist, song or album
** choose genre, mood of a song
** find if there is one singer or more, female or male or both
* invite friends by mail or social network

##### tweet2jam

* twitter music charts
* tweet about a track to increase its position in playlist

### App features

* store songs in google drive
* player always on top
* navigation on left
* chat on the right side
* listen to your playlists
* widget to display a playlist on any website?

### just4fun

* web speech api: http://updates.html5rocks.com/2014/01/Web-apps-that-talk---Introduction-to-the-Speech-Synthesis-API
* https://github.com/TalAter/annyang/blob/master/annyang.js
* change the favicon to animated gif if sound is played and turn of (set back to default icon) when no sound (song) is played, like: https://github.com/tommoor/tinycon
* play "system" sounds on some actions, like user gets new notification, on click on button, on error ... like realoperating system
* use media attribute and page visibility APIs: http://daniemon.com/blog/two-favourite-underused-html5-media-features/
* pointer events for mobile (and desktop) http://www.polymer-project.org/platform/pointer-events.html
* shadow dom improved views with shadow dom: http://www.polymer-project.org/platform/shadow-dom.html
* custom animations using bounce js: http://bouncejs.com/
* grid loading for playlists or jamendo news: http://tympanus.net/Tutorials/SamsungGrid/index2.html
* preview play button, loading then play: http://tympanus.net/Tutorials/CircularProgressButton/
* login button that morphs into login box: http://tympanus.net/Development/ButtonComponentMorph/
* charts, hot to colder with colors: http://jerrygarcia.com/
* video with design over it, example: http://www.tyoulipsisters.com/
* open / close navigation styles: http://hilapeleg.io/2014/06/01/hackernews-redesign/