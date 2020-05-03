require('dotenv').config();

var fs = require('fs');
var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys = require('./keys');
var spotify = new Spotify(keys.spotify);

var bandsID = keys.bandsID.id;
var omdbKey = keys.omdbKey.key;

var category = process.argv[2];
var choice = process.argv.slice(3).join(" ");

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
        fs.readFile('ascii/intro.txt', 'utf8', function(err,data){
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
}

// concert-this

function concertThis() {
    var queryURL = 'https://rest.bandsintown.com/artists/' + choice + '/events?app_id=' + bandsID;
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

// spotify-this-song

function spotifyThis() {
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

// movie-this

function movieThis(){
    var queryURL = 'https://www.omdbapi.com/?t=' + choice + '&apikey=' + omdbKey;
    axios.get(queryURL)
    .then(function(response) {
        var movieInfo = response.data;
        console.log('Title: ' + movieInfo.Title);
        console.log('Released: ' + movieInfo.Released);
        console.log('IMDB Rating: ' + movieInfo.Ratings[0].Value);
        console.log('Rotten Tomatoes Rating: ' + movieInfo.Ratings[1].Value);
        console.log('County of Origin: ' + movieInfo.Country);
        console.log('Language: ' + movieInfo.Language);
        console.log('Plot: ' + movieInfo.Plot);
        console.log('Actors: ' + movieInfo.Actors);
    });
};

// do-what-it-says

function doThis() {
    fs.readFile('random.txt', 'utf8', function(err,data){
        if (err) {
            console.log(err);
        } else {
            random = data.split(',');
            choice = random[1];
            console.log("We're no strangers to love...\n");
           spotifyThis(choice)
        }
    });
};
