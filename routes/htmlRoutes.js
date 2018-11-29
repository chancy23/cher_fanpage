
//export to server.js file as a function with a paramater of app
module.exports = function(app){

    //get route to index.handlebars page
    app.get("/", function(req, res){
        res.render("index");
    });

    //default route to home page if no other path is selected
    // app.get("*", function(req, res){
    //     res.sendFile(path.join(__dirname, "../public/home.html"));
    // });
};