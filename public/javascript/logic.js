$(document).ready(function () {
  $('.modal').modal();
  $(".parallax").parallax();
  $(".sidenav").sidenav();
  $("select").formSelect();

  var galleryTop = new Swiper(".gallery-top", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      //clickable: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  //Trivia Game play section =========================================================================================
  //hide Trivia Timer on page load
  $("#timerArea").hide();
  var questions = [
    {
      question: "What is Cher's real name?",
      allAnswers: ["Cherilyn Sarkisian", "Cher Sanfordson", "Cherilyn Swenson", "Cher Saskatoon"],
      correctAnswer: "Cherilyn Sarkisian",
      image: "/images/gifs/cherilynsarkesianGIF.gif"
    },
    {
      question: "What 1998 hit pioneered use of Auto-Tune?",
      allAnswers: ["Strong Enough", "If I Could Turn Back Time", "Believe", "The Music Sounds Better With You"],
      correctAnswer: "Believe",
      image: "/images/gifs/believeGIF.gif"
    },
    {
      question: "What award has Cher NOT won?",
      allAnswers: ["A Grammy", "An Oscar", "An Emmy", "A Tony"],
      correctAnswer: "A Tony",
      image: "/images/gifs/cherNoTonyGIF.gif"
    },
    {
      question: "What movie was Cher's film debut in?",
      allAnswers: ["Mask", "Moonstruck", "Silkwood", "Tea with Mussolini"],
      correctAnswer: "Silkwood",
      image: "/images/gifs/silkwoodGIF.gif"
    },
    {
      question: "What band is Cher covering on her upcoming album 'Dancing Queen'?",
      allAnswers: ["Journey", "ABBA", "REO Speedwagon", "Fleetwood Mac"],
      correctAnswer: "ABBA",
      image: "/images/gifs/abbaGIF.gif"
    }
  ];

  //object to hold all the game variables and the methods(functions)
  var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 15,
    numCorrect: 0,
    numWrong: 0,
    numBlank: 0,

    countdown: function () {
      game.counter--;
      $("#timer").text(game.counter);
      if (game.counter <= 0) {
        game.timeUp();
      };
    },
    timeUp: function () {
      // stop the timer, mark as a blank
      clearInterval(timer);
      game.numBlank++;
      
      $("#questionDisplay").html("<h5>Time's Up!</h5>");
      $("#questionDisplay").append("The correct answer is " + questions[game.currentQuestion].correctAnswer);
      
      if (game.currentQuestion === questions.length - 1) {
       
        setTimeout(game.results, 3000);
      }
      else {
        setTimeout(game.nextQuestion, 3000);
      };
    },
    showQuestion: function () {
      timer = setInterval(game.countdown, 1000);
      $("#questionDisplay").html("<h4>" + questions[game.currentQuestion].question + "</h4>");
      for (var i = 0; i < questions[game.currentQuestion].allAnswers.length; i++) {
        $("#questionDisplay").append("<a class='waves-effect waves-light btn-small answerButton' id='button-" + i +
          "' data-name='" + questions[game.currentQuestion].allAnswers[i] + "'>" +
          questions[game.currentQuestion].allAnswers[i] + "</a>");
      };
    },

    nextQuestion: function () {
      game.counter = 15;
      $("#timer").text(game.counter);
      game.currentQuestion++;
      $("#gifDisplay").empty();
      game.showQuestion();
    },

    results: function () {
      clearInterval(timer);
      $("#timerArea").hide();
      $("#gifDisplay").empty();

      $resultsGif = $("<img>").addClass("gif");
      if (game.numCorrect > 3) {
        $resultsGif.attr("src", "/images/gifs/applauseGIF.gif");
        $("#questionDisplay").html("<h4>You're a true Cher fan!</h4>");
      } else if (game.numCorrect <= 1) {
        $resultsGif.attr("src", "/images/gifs/sadfaceGIF.gif");
        $("#questionDisplay").html("<h4>Hmm, maybe you should try again.</h4>");
      } else {
        $resultsGif.attr("src", "/images/gifs/nottooshabbyGIF.gif");
        $("#questionDisplay").html("<h4>Not too shabby!</h4>");
      }
      $("#gifDisplay").append($resultsGif);
      $("#questionDisplay").append("<h5>Correct: " + game.numCorrect + "</h5>");
      $("#questionDisplay").append("<h5>Wrong: " + game.numWrong + "</h5>");
      $("#questionDisplay").append("<h5>Unanswered: " + game.numBlank + "</h5>");
      $("#questionDisplay").append("<a class='waves-effect waves-light btn' id='reset'>Replay</a>");

    },
    clicked: function () {
      clearInterval(timer);
      if ($(event.target).data("name") === questions[game.currentQuestion].correctAnswer) {
        game.answeredCorrect();
      }
      else {
        game.answeredWrong();
      };
    },
    answeredCorrect: function () {
      clearInterval(timer);
      game.numCorrect++;

      $("#questionDisplay").html("<h5>That's correct!</h5><br>");
      $gifDiv = $("<img>").addClass("gif");
      $gifDiv.attr("src", questions[game.currentQuestion].image);
      $("#gifDisplay").append($gifDiv);
      
      if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 3000);
      }
      else {
        setTimeout(game.nextQuestion, 5000);
      };
    },
    answeredWrong: function () {
      clearInterval(timer);
      $("#questionDisplay").html("<h5>Oops, that's wrong. No GIF for you!</h5>");
      $("#questionDisplay").append("The correct answer is '" + questions[game.currentQuestion].correctAnswer + "'.");
      game.numWrong++;

      if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 3000);
      }
      else {
        setTimeout(game.nextQuestion, 3000);
      };
    },
    reset: function () {
      game.currentQuestion = 0;
      game.counter = 15;
      game.numCorrect = 0;
      game.numWrong = 0;
      game.numBlank = 0;
      game.showQuestion();
      $("#gifDisplay").empty();
      $("#timerArea").show();
    }
  };

  //events and main game play=============================================================

  $("#start").on("click", function () {
    $("#start, #triviaInstructions").hide();
    $("#timerArea").show();
    game.showQuestion();
  });

  $("#questionDisplay").on("click", ".answerButton", function (event) {
    event.preventDefault();
    game.clicked(event);
  });

  $("#questionDisplay").on("click", "#reset", function (event) {
    event.preventDefault();
    game.reset();
  });

  // to get the movies value from DOM and send to the API route
  $("#movieSelect").on("change", function (event) {
    event.preventDefault();
    $("#moviePosterDisplay").empty();
    $("#movieDetails").empty();

    var movieTitle = $(this).val();
    //put the movie title in an object to send to the API file
    var movieObj = {
      movie: movieTitle
    };
    
    //send the value to the API route
    $.post("/", movieObj, function () {
      }).then(function (data) {
      
      var movie = data;

      //use jquery to create the DOM content each time the movie is picked
      var $posterImg = $("<img>").attr("src", movie.poster).css("width", "100%");
      $("#moviePosterDisplay").append($posterImg);
      var $movieTitle = $("<h5>").text(movie.title);
      var $moviePlot = $("<p>").text(movie.plot);
      var $list = $("<ul>");
      var $movieRated = $("<li>").text("Rated: " + movie.rated);
      var $movieTime = $("<li>").text("Runtime: " + movie.runtime);
      var $movieRating = $("<li>").text(movie.ratingSrc + " Rating: " + movie.ratingVal);
      var $movieAwards = $("<li>").text("Awards: " + movie.awards);
      var $movieReleased = $("<li>").text("Released: " + movie.released);

      $list.append(
        $movieRated,
        $movieTime,
        $movieRating,
        $movieAwards,
        $movieReleased
      );

      $("#movieDetails").append(
        $movieTitle,
        $moviePlot,
        $list
      );
    });
  });
});