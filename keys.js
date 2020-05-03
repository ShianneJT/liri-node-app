// console.log('Grabbing API keys...');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.bandsID = {
  id: process.env.BANDSINTOWN_ID
};

exports.omdbKey = {
  key: process.env.OMDB_KEY
};
