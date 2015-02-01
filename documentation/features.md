# Features

## For sure

* cooperative multi user playlist with chat
* twitter charts, scan twitter stream of accounts like the jamendo account, each time a song gets posted on twitter record the tweet, map reduce to create charts of most tweeted tracks

## Maybe

* remote, use the app on a tablet or phone as a remote for another session of the app on a desktop or tv, login into both apps with same account, pub sub sync the state of both apps for that account
* video paylist, jamendo playlist 2 youtube, create a playlist of jamendo tracks, then a script checks if those videos exist on youtube (via youtube search api?) and create a videos playlist based on the jamendo playlist
* playlist 2 google drive, google drive download / backup, download tracks directly into your google drive account or backup entire playlists
* hot or not for songs, like or dislike it (add to playlist), swipe for next song, the app suggests a song if you dont like you swipe if you like you listen until the end and then next song gets played
* tag playlists with moods or "time of the day", then make a page that shows the user playlists based on time of the day or the mood he has set in his profile
* user points, give user points, achievements, badges for certain actions they can perform in the app
* show concerts based on the browser location API

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

##### Games

## Quiz
* tracks quiz created by the community
* choose a track and add chalanges
** find at least three instruments used in the song
** language of the lyrics
** name of the artist, song or album
** choose genre, mood of a song
** find if there is one singer or more, female or male or both
* invite friends by mail or social network

## Card game
* two players get several cards where each card represents an artist and some stats like total fans, album and tracks count, listen count and so on ... a player starts by playing a card and telling the oponent what stats he wants to use for the fight, the other player lays down a card too, if the value is higher he wins both cards, then the player who lost can play a card ... until one player owns all the cards

## Hot or not
* add a hot or not game for the new releases, every user can rate ten songs per day, highscore of the month

##### tweet2jam

* twitter music charts
* tweet about a track to increase its position in playlist

### just4fun

* web speech api: http://updates.html5rocks.com/2014/01/Web-apps-that-talk---Introduction-to-the-Speech-Synthesis-API + https://github.com/TalAter/annyang/blob/master/annyang.js
* change the favicon to animated gif if sound is played and turn of (set back to default icon) when no sound (song) is played, like: https://github.com/tommoor/tinycon
* play "system" sounds on some actions, like user gets new notification, on click on button, on error ... like realoperating system
* use media attribute and page visibility APIs: http://daniemon.com/blog/two-favourite-underused-html5-media-features/
* pointer events for mobile (and desktop) http://www.polymer-project.org/platform/pointer-events.html
* shadow dom improved views with shadow dom: http://www.polymer-project.org/platform/shadow-dom.html
* custom animations using bounceJS: http://bouncejs.com/ or snabbtJS http://daniel-lundin.github.io/snabbt.js/index.html
* grid loading for playlists or jamendo news: http://tympanus.net/Tutorials/SamsungGrid/index2.html
* preview play button, loading then play: http://tympanus.net/Tutorials/CircularProgressButton/
* login button that morphs into login box: http://tympanus.net/Development/ButtonComponentMorph/
* charts, hot to colder with colors: http://jerrygarcia.com/
* video with design over it, example: http://www.tyoulipsisters.com/
* open / close navigation styles: http://hilapeleg.io/2014/06/01/hackernews-redesign/
* html5 web audio api http://www.html5rocks.com/en/tutorials/webaudio/intro/
* javascript audio waveform https://developer.tizen.org/documentation/articles/advanced-web-audio-api-usage + http://www.html5audio.org/2012/10/interactive-navigable-audio-visualization-using-webaudio-api-and-canvas.html
* detect beats using web audio api: http://tech.beatport.com/2014/web-audio/beat-detection-using-web-audio/
* create a nice app introduction using: introJS: https://github.com/usablica/intro.js or boostraptour:  https://github.com/sorich87/bootstrap-tour or joyride: https://github.com/zurb/joyride
* lots of interesting web audio repositories https://github.com/cwilso?tab=repositories
