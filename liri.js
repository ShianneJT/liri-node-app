require('dotenv').config();

var keys = require('./keys.js');
var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');

var category = process.argv[2];
var choice = process.argv.slice(3).join(" ");

var spotify = new Spotify(keys.spotify);

// song name

if (category === 'spotify-this-song') {
    spotify.search ({ type: 'track', query: choice, limit: 1 },
    function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artists: " + data.tracks.items[0].album.artists[0].name)
        // A preview link of the song from Spotify
        console.log("Preview Link: ", data.tracks.items[0].preview_url)
        // The album that the song is from
        console.log("Album Name: ", data.tracks.items[0].album.name)
    })
}


// concert-this

// Testing code to handle more than one word =P 

/*

var category = process.argv[2];
var choiceRaw = process.argv.splice(3, process.argv.length-1);
var choice = choiceRaw.join(' ');

var queryURL = 'https://rest.bandsintown.com/artists/' + choice + '/events?app_id=codingbootcamp'

if (category === 'concert-this') {
    axios.get(queryURL).then(
        function(response) {
            var concertDate = response.data[0].datetime;
 
            var convertedDate = moment(concertDate).format('MM/DD/YYYY');
            console.log('-----' + response.data[0].artist.name + '-----')
            console.log('Name of venue: ' + response.data[0].venue.name);
            console.log('Venue Location: ' + response.data[0].venue.location);
            console.log('Event Date: ' + convertedDate);
        }
        )
}

*/

/* 

var category = process.argv[2]
var choice = process.argv[3];
console.log(category, choice); 


var queryURL = 'https://rest.bandsintown.com/artists/' + choice + '/events?app_id=codingbootcamp'

if (category === 'concert-this') {
    axios.get(queryURL).then(
        function(response) {
            var concertDate = response.data[0].datetime;
            console.log(`the concert date ${concertDate}`);
            var convertedDate = moment(concertDate).format('MM/DD/YYYY');
            console.log('Name of venue: ' + response.data[0].venue.name);
            console.log('Venue Location: ' + response.data[0].venue.location);
            console.log('Event Date: ' + convertedDate);
        }
        )
}

*/

// movie-this

/*

var category = process.argv[2]
var choice = process.argv[3];
console.log(category, choice); 


choice=choice.replace(/s/g,"%20");


var queryURL = 'https://www.omdbapi.com/?t=' + choice + '&apikey=trilogy';

if (category === 'movie-this') {
    axios.get(queryURL).then(
        function(response) {
            var movieInfo = response.data
            console.log('Title: ' + movieInfo.title);
            console.log('IMDB Rating: ' + movieInfo.ratings[0].value);
            console.log('Rotten Tomatoes Rating: ' + movieInfo.ratings[1].value);
            console.log('County of Origin: ' + movieInfo.country);
            console.log('Language: ' + movieInfo.language);
            console.log('Plot: ' + movieInfo.plot);
            console.log('Actors: ' + movieInfo.actors);
        }
    )
}

// * Title of the movie.

// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.






// Make it so liri.js can take in one of the following commands:
// 
// concert-this
// 
// spotify-this-song
// 
// movie-this
// 
// do-what-it-says


*/
