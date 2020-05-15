require('dotenv').config();

var fs = require('fs');
var axios = require('axios');
var moment = require('moment');
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var bandsID = keys.bandsID.id;
var omdbKey = keys.omdbKey.key;
var category = process.argv[2];
var choice = process.argv.slice(3).join(" ");

switch (category) {
    case 'concert-this':
        logo();
        concertThis();
        break;
    case 'spotify-this-song':
        logo();
        spotifyThis();
        break;
    case 'movie-this':
        logo();
        movieThis();
        break;
    case 'do-what-it-says':
        logo();
        doThis();
        break;
    default:
        fs.readFile('ascii/intro.txt', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(data);
            };
        });
};

// concert-this
function concertThis() {
    var queryURL = 'https://rest.bandsintown.com/artists/' + choice + '/events?app_id=' + bandsID;
    axios.get(queryURL)
        .then(function (response) {
            var results = response.data[0];
            var concertDate = results.datetime;
            var convertedDate = moment(concertDate).format('MM/DD/YYYY');

            writeLog('\n    ---------------------------------------------------\n');
            writeLog('     Artist:         ' + results.artist.name);
            writeLog('     Name of venue:  ' + response.data[0].venue.name);
            writeLog('     Venue Location: ' + response.data[0].venue.location);
            writeLog('     Event Date:     ' + convertedDate);
            writeLog('\n    ---------------------------------------------------');
            writeLog("\n   Type 'node liri' to return to the menu");
        })
        .catch(error => {
            console.log('ERRRRRROR' + error);
        });
};

// spotify-this-song
function spotifyThis(choice) {
    if (choice === undefined) {
        choice = 'The Sign';
    };
    spotify
        .search({
                type: 'track',
                query: choice,
                limit: 1
            },
            function (err, data) {
                if (err) {
                    console.log('Error: ' + err);
                    return
                }
                else {
                    console.log('\n     -----------------------------------------------\n')
                    console.log('      Artist:        ' + data.tracks.items[0].artists[0].name);
                    console.log('      Song Title:    ' + data.tracks.items[0].name);
                    console.log('      Album Name:    ' + data.tracks.items[0].album.name);
                    console.log('      Preview Link:  ' + data.tracks.items[0].preview_url);
                    console.log('\n     -----------------------------------------------')
                    console.log("\n   Type 'node liri' to return to the menu");
                };
            });
};

// movie-this
function movieThis() {
    if (!choice) {
        choice = 'Mr. Nobody';
    };
    var queryURL = 'https://www.omdbapi.com/?t=' + choice + '&apikey=' + omdbKey;
    axios.get(queryURL)
        .then(function (response) {
            var movieInfo = response.data;
            console.log('\n     -----------------------------------\n')
            console.log('      Title: ' + movieInfo.Title);
            console.log('      Released: ' + movieInfo.Released);
            console.log('      IMDB Rating: ' + movieInfo.Ratings[0].Value);
            console.log('      Rotten Tomatoes Rating: ' + movieInfo.Ratings[1].Value);
            console.log('      County of Origin: ' + movieInfo.Country);
            console.log('      Language: ' + movieInfo.Language);
            console.log('      Plot: ' + movieInfo.Plot);
            console.log('      Actors: ' + movieInfo.Actors);
            console.log('\n     -----------------------------------')
            console.log("\n   Type 'node liri' to return to the menu");
        });
};

// do-what-it-says
function doThis() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            random = data.split(',');
            choice = random[1];
            spotifyThis(choice)
        };
    });
};

function writeLog(logText) {
    console.log(logText)
    fs.appendFile('log.txt', logText, function(err) {
        if (err) {
            console.log('Errooorrrr: ' + err);
        }
    })
}

function logo() {
    fs.readFile('ascii/' + category + '.txt', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data)
        };
    });
};
