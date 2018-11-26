//use the omdb key to pull in the movies cher has been in, and display on her page along with a movie poster
var request = require('request');

var moviesKey = "";

var moviesRequestURL = "" + moviesKey;

//use request on the server to do this
request(moviesRequestURL, function (error, response, body) {
  console.log("error: " + error); // Print the error if one occurred
  console.log("statusCode: " + response && response.statusCode); // Print the response status code if a response was received
  console.log("body: " + body); // Print the HTML for the OMDB API Call.

  //results:
    //show the movie posters in the dom
    //when user clicks the poster its replaced by a summary of the movie, yr released
  });