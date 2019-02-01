
// to get the keys file
var keys = require("../keys.js");
//require to get the requests from the APIs
var axios = require("axios");
//require for momentjs
var moment = require("moment");

module.exports = function (app) {
    //get request for Bands API info
    app.get("/", function (req, res) {
        var bandsKey = keys.bands.id;
        //request URL for concerts
        var concertsRequestURL = "https://rest.bandsintown.com/artists/cher/events?";

        //call to the bands in town api
        axios.get(concertsRequestURL, {
            params: {
                app_id: bandsKey,
            }
        })
        .then(function (response) {
            // console.log(response.data);
            var data = response.data;

            //the .map loops over the data and gives you each data obj one at a time then we return each concertDataObj. 
            var formattedConcertData = data.map(function (data) {
                var venueName = data.venue.name;
                var venueCity = data.venue.city;
                var venueState = data.venue.region;
                var dateFormatted = moment(data.datetime).format("MM/DD/YYYY");
                var timeFormatted = moment(data.datetime).format("h:mm A");

                //put the above values into an object, then return the object so the .map can push it to the array for the var formattedConcertData
                var concertDataObj = {
                    venue: venueName,
                    city: venueCity,
                    state: venueState,
                    date: dateFormatted,
                    time: timeFormatted
                };
                return concertDataObj;
            });
            //we can then take that formatted data that is in the array and use that to render into handlebars (need to send the array as a value of the obj)
            res.render("index", {
                concertDataObj: formattedConcertData
            }); 
        })
        .catch(function (error) {
            console.log(error);
        });
    });

    //get request for OMDB
    app.post("/", function(req, res) {
        //use the omdb key to pull in the movies cher has been in, and display on her page along with a movie poster
        var moviesKey = keys.omdb.id;
        //input from the front end of movie to search for
        var movie = req.body.movie; 
        console.log("this is the movie passed from the front end " + JSON.stringify(movie, null, 2));

        var moviesRequestURL = "http://www.omdbapi.com/?";

        //call to the bands in town api
        axios.get(moviesRequestURL, {
            params: {
                apikey: moviesKey,
                t: movie
            }
        })
        .then(function (response) {
            // console.log(response.data);
            var data = response.data;
            console.log('data var', data);

            //assign the data reponse to the values I want to display
            //the .map loops over the data and gives you each data obj one at a time then we return each concertDataObj.
            // var movieData = data.map(function (data) {
                var movieTitle = data.Title;
                var moviePlot = data.Plot;
                var movieAwards = data.Awards;
                var moviePoster = data.Poster;
                var movieRated = data.Rated;
                var movieRatingSrc = data.Ratings[0].Source;
                var movieRatingVal = data.Ratings[0].Value;
                var movieRuntime = data.Runtime;
                var movieReleased = data.Released;

                // var movieRatingSrc = data.Ratings.map(rating => rating.Source);
                // var movieRatingVal = data.Ratings.map(rating => rating.Value)
               
                // console.log("movie source array", movieRatingSrc);

                //put values into an object
                var movieData = {
                    title: movieTitle,
                    plot: moviePlot,
                    awards: movieAwards,
                    poster: moviePoster,
                    rated: movieRated,
                    ratingSrc: movieRatingSrc,
                    ratingVal: movieRatingVal,
                    runtime: movieRuntime,
                    released: movieReleased
                };
               
            console.log("movie data obj " + JSON.stringify(movieData, null, 2));
            //results to send to front end JS
            res.json(movieData) 
        })
        .catch(function (error) {
            console.log(error);
        });
    });
};