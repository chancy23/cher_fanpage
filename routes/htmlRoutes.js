//path dependency (moved from server.js file so that it would recognize the path variable in the function)
var path = require("path");

//export to server.js file as a function with a paramater of app
module.exports = function(app){

    //get route to survey html page
    app.get("/index", function(req, res){
        res.sendFile(path.join(__dirname, "/index.html"));
    });

    //default route to home page if no other path is selected
    // app.get("*", function(req, res){
    //     res.sendFile(path.join(__dirname, "../public/home.html"));
    // });
};