require('dotenv').config();

var keys = require('./keys.js');
var axios = require('axios');
var moment = require('moment');

// var spotify = new Spotify(keys.spotify);


// Bands in Town
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

// Make it so liri.js can take in one of the following commands:
// 
// concert-this
// 
// spotify-this-song
// 
// movie-this
// 
// do-what-it-says

// node liri.js concert-this <artist/band name here>
// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

