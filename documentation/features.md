# features

## for sure

* collaborative playlist rooms
* twitter (viral) charts
* remote controlling of your jamendo playlists (with voice recognition)
* webcam mood playlist generator
* cards game or quiz

## maybe

* more games for games section
* video paylist, jamendo playlist 2 youtube, create a playlist of jamendo tracks, then a script checks if those videos exist on youtube (via youtube search api?) and create a videos playlist based on the jamendo playlist
* playlist 2 google drive, google drive download / backup, download tracks directly into your google drive account or backup entire playlists
* hot or not for songs, like or dislike it (add to playlist), swipe for next song, the app suggests a song if you dont like you swipe if you like you listen until the end and then next song gets played
* tag playlists with moods or "time of the day", then make a page that shows the user playlists based on time of the day or the mood he has set in his profile
* user points, give user points, achievements, badges for certain actions they can perform in the app
* show concerts based on the browser location API

## nice to have, but probably not enough time

* recommendation, use a recommendation tool to create a discovery page per genre updated once a day, improvement create personal dicovery page based on user data (jamendo likes, facebook likes, ...)
* song visualizer, use a script to calculate a track fourier transform or wave form, html5 canvas to visualize

### app sections

##### remote fuctionality

* control one instance of the player on for example your tv using the same instance on your tablet or phone
* can be enabled or disabled
* use the voice recognition to accept voice commands

##### jam with friends

* team playlist where every user can add songs
* up or downvote songs
* song with most votes gets played next
* show how often a song got played
* show who selected the song
* playlist picture upload
* choose playlist name
* choose existing playlist to start

##### games (fun)

###### quiz
* tracks quiz created by the community
* choose a track and add chalanges
** find at least three instruments used in the song
** language of the lyrics
** name of the artist, song or album
** choose genre, mood of a song
** find if there is one singer or more, female or male or both
* invite friends by mail or social network

###### card game (battle)
* each player selects the cards from his deck that he wants to use in the fight
* each card represents an artist and some stats like total fans, album and tracks count, listen count and so on
* a player starts by playing a card and telling the oponent what stats he wants to use for the fight
* the other player lays down a card too, if the value is higher he wins both cards, then the player who lost (who won?) can play a card
* until one player owns all the cards
* create a highscore table with players that won most games
* when wining a game the player gets a point, he can use the points to reclaim extra epic cards that will be added to his deck

###### hot or not
* add a hot or not game for the new releases, every user can rate ten songs per day

###### a song a cat
* for each song played, display a picture of a funny cute cate (google image search API?)

###### bingo like game with albums instead of numbers
* user chooses the amount of rows (and columns) before creating a new game
* the user can select a music genre for the albums or select the albums himself
* start the game fills the board with album covers
* servers calls out an album name, the first song of the album is being played until the next album is being called out
* the player must select the album that got called out on his board
* the first player that has a full row or column on his board must yell "jamendo" to win the game

##### tweet 2 jam

* twitter music charts
* tweet about a track to increase its position in playlist

##### face photo 2 mood playlist

* take a photo of the users face using his webcam
* convert his face into mood data using the google cloud vision API
* search for tracks by mood based on the data from the photo

### player

* play bar on top or bottom
* no player bar at all, display actions as big animations on screen that fade in / fade out quickly
* realtime music visualizer (see prototype)

### just4fun

* goose menu http://codepen.io/lbebber/pen/RNgBPP
* web speech api: http://updates.html5rocks.com/2014/01/Web-apps-that-talk---Introduction-to-the-Speech-Synthesis-API + https://github.com/TalAter/annyang/blob/master/annyang.js
* change the favicon to animated gif if sound is played and turn of (set back to default icon) when no sound (song) is played, like: https://github.com/tommoor/tinycon
* play "system" sounds on some actions, like user gets new notification, on click on button, on error ... like realoperating system
* use media attribute and page visibility APIs: http://daniemon.com/blog/two-favourite-underused-html5-media-features/
* pointer events for mobile (and desktop) http://www.polymer-project.org/platform/pointer-events.html
* shadow dom improved views with shadow dom: http://www.polymer-project.org/platform/shadow-dom.html
* custom animations using bounceJS: http://bouncejs.com/ or snabbtJS http://daniel-lundin.github.io/snabbt.js/index.html
* animation button clicks using mo.js http://tympanus.net/codrops/2016/02/23/icon-animations-powered-by-mo-js/
* animated letters for homepage logo http://tympanus.net/codrops/2016/03/02/creative-svg-letter-animations/
* for games page title use http://www.voxelcss.com/
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
* wheel navigation http://wheelnavjs.softwaretailoring.net/examples.html
