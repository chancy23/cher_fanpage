//export to server.js file as a function with a paramater of app
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index");
  });
};