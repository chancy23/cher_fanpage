//js file to hold all the bands in town request info using node/npm
var request = require('request');
//assign the bands in town api key
var bandsKey = "";
//request URL for concerts
var concertsRequestURL = "https://rest.bandsintown.com/artists/cher/events?app_id=" + bandsKey;

//input the request format for node here

request(concertsRequestURL, function (error, response, body) {
  console.log("error: " + error); // Print the error if one occurred
  console.log("statusCode: " + response && response.statusCode); // Print the response status code if a response was received
  console.log("body: " + body); // Print the HTML for the BandsIntown API Call.

  //results:
    //show the next 5 concerts info in the dom
    //Date, time, location
});


