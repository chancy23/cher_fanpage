console.log("the keys have been loaded");

//this pulls the IDs from the .env file and exports the API ID (and Secret) to the liri.js file for the variables

//for omdb
exports.omdb = {
    id: process.env.OMDB_ID
},

//for Bands In Town
exports.bands = {
    id: process.env.BANDS_ID
}