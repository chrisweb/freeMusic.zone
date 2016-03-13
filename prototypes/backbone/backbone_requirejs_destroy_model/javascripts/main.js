/**
 * 
 * http://requirejs.org/
 * 
 * @param {type} param
 */
require.config({
    baseUrl: 'javascripts/',
    paths: {
        'jquery': 'vendor/jquery-2.1.1/jquery',
        'backbone': 'vendor/backbone-1.1.2/backbone',
        'underscore': 'vendor/underscore-1.6.0/underscore',
        'trackModel': 'library/trackModel',
        'tracksCollection': 'library/tracksCollection'
    }
    
});

require([
    'trackModel',
    'tracksCollection'
], function (TrackModel, TracksCollection) {

    'use strict';

    // tests

    var track = new TrackModel();

    var playlist = new TracksCollection();

    var history = new TracksCollection();

    console.log('playlist length before: ', playlist.length);

    playlist.add(track);

    console.log('playlist length after: ', playlist.length);

    console.log('history length before: ', history.length);

    history.add(track);

    console.log('history length after: ', history.length);

    //-----------------
    console.log('//-----------------');

    console.log('playlist length before: ', playlist.length);
    console.log('history length before: ', history.length);

    track.destroy();

    console.log('playlist length after: ', playlist.length);
    console.log('history length after: ', history.length);
    
});