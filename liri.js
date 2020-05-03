require('dotenv').config();

var keys = require('./keys.js');
var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var category = process.argv[2];
var choice = process.argv.slice(3).join(" ");


// Make it so liri.js can take in one of the following commands:
// 
// concert-this
// 
// spotify-this-song
// 
// movie-this
// 
// do-what-it-says


switch(category) {
    case 'concert-this':
        concertThis(choice);
        break;
    case 'spotify-this-song':
        spotifyThis(choice);
        break;
    case 'movie-this':
        movieThis(choice)
        break;
    case 'do-what-it-says':
        doThis();
    default:
        //
}

// Concert this function

function concertThis(choice) {
    var queryURL = 'https://rest.bandsintown.com/artists/' + choice + '/events?app_id=codingbootcamp'
    axios.get(queryURL)
        .then(function(response) {
            var concertDate = response.data[0].datetime; 
            var convertedDate = moment(concertDate).format('MM/DD/YYYY');
            console.log('----- ' + response.data[0].artist.name + ' -----')
            console.log('Name of venue: ' + response.data[0].venue.name);
            console.log('Venue Location: ' + response.data[0].venue.location);
            console.log('Event Date: ' + convertedDate);
    });
};

// Spotify this function

function spotifyThis(choice) {
    spotify
        .search({ type: 'track', query: choice, limit: 1 },
        function(err, data) {
            if (err) {
                console.log('Error: ' + err);
                returnl
            } else {
                console.log('----- ' + data.tracks.items[0].artists[0].name + ' -----');
                console.log('Song Title: ' + data.tracks.items[0].name);
                console.log('Preview Link: ' + data.tracks.items[0].preview_url);
                console.log('Album Name: ' + data.tracks.items[0].album.name);
            }
        })
};

// Movie this function

function movieThis(choice){
    var queryURL = 'https://www.omdbapi.com/?t=' + choice + '&apikey=trilogy';
    axios.get(queryURL)
    .then(function(response) {
        var movieInfo = response.data;
        console.log('Title: ' + movieInfo.title);
        console.log('Released: ' + movieInfo.released);
        console.log('IMDB Rating: ' + movieInfo.ratings[0].value);
        console.log('Rotten Tomatoes Rating: ' + movieInfo.ratings[1].value);
        console.log('County of Origin: ' + movieInfo.country);
        console.log('Language: ' + movieInfo.language);
        console.log('Plot: ' + movieInfo.plot);
        console.log('Actors: ' + movieInfo.actors);
    });
};

function doThis() {

};
