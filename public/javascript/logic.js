$(document).ready(function(){
    $(".parallax").parallax();
    //for navbar on small screens
    $(".sidenav").sidenav();
    //form select
    $("select").formSelect();
    // swiper js initialization
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
    //hide Triva Timer on page load
    $("#timerArea").hide();
    // questions and answers object
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

        countdown: function() {
            game.counter--;
            $("#timer").text(game.counter);
            if (game.counter <= 0){
                //console.log("time up");
                game.timeUp();
            };
        },

        timeUp: function() {
            // stop the timer, mark as a blank
            clearInterval(timer);
            game.numBlank++;
            console.log("number blank " + game.numBlank);
            $("#questionDisplay").html("<h5>Time's Up!</h5>");
            //show the correct answer
            $("#questionDisplay").append("The correct answer is " + questions[game.currentQuestion].correctAnswer);
            //if there are no more questions left then call the results method after 3 seconds
            if (game.currentQuestion === questions.length - 1) {
                console.log("no more questions");
                setTimeout(game.results, 3000);
            }
            //if there are more questions then move to next question after 3 seconds
            else {
                setTimeout(game.nextQuestion, 3000);
            };
        },

        showQuestion: function() {
            timer = setInterval(game.countdown, 1000);
            $("#questionDisplay").html("<h3>" + questions[game.currentQuestion].question + "</h3>");
                //create a button var for each answer
            for (var i = 0; i < questions[game.currentQuestion].allAnswers.length; i++) {
                $("#questionDisplay").append("<button class='answerButton' id='button-" + i + 
                "' data-name='" + questions[game.currentQuestion].allAnswers[i] + "'>" + 
                questions[game.currentQuestion].allAnswers[i] + "</button>");
            };
        },

        nextQuestion: function() { 
            //reset timer to 15 seconds
            game.counter = 15;
            //dispaly the timer in the dom
            $("#timer").text(game.counter);
            //get the next question (current question +1)
            game.currentQuestion++;
            //call the show question method with the new current question number
            game.showQuestion();
        },

        results: function() {
            //stop the timer
            clearInterval(timer);
            //hide the timer Area
            $("#timerArea").hide();
            //then display the current scores
            $("#questionDisplay").html("<h4>All Done!</h4>");
            $("#questionDisplay").append("<h5>Correct: " + game.numCorrect + "</h5>");
            $("#questionDisplay").append("<h5>Wrong: " + game.numWrong + "</h5>");
            $("#questionDisplay").append("<h5>Unanswered " + game.numBlank + "</h5>");
            //add a reset button to the div to replay the game (call the reset method)
            $("#questionDisplay").append("<button id='reset'>Replay</button>");
            
        },

        clicked: function() {
            clearInterval(timer);
            if ($(event.target).data("name") === questions[game.currentQuestion].correctAnswer) {
            //isn't doing "this" and using the data-name attr the same as the event.target, why doesn't it work?
            // if ($(this).attr("data-name") === questions[game.currentQuestion].correctAnswer) {
                game.answeredCorrect();
            }
            else {
                game.answeredWrong();
            };
        },

        answeredCorrect: function() {
            console.log("right");
            //stop the countdown
            clearInterval(timer);
            //add to the counter
            game.numCorrect++;
            //create a place to show a gif and that they got it right
            $("#questionDisplay").html("<h5>That's correct!</h5><br>");
            $gifDiv = $("<img>").addClass("gif");
            $gifDiv.attr("src", questions[game.currentQuestion].image);
            $("#questionDisplay").append($gifDiv);
            //if there are no more questions left then call the results method after 3 seconds
            if (game.currentQuestion === questions.length - 1) {
                console.log("no more questions");
                setTimeout(game.results, 3000);
            }
            //if there are more questions then move to next question after 3 seconds
            else {
                setTimeout(game.nextQuestion, 5000);
            };
        },

        answeredWrong: function() {
            console.log("wrong");
            //stop the countdown
            clearInterval(timer);
            //display they got it wrong in the dom
            $("#questionDisplay").html("<h5>Oops, that's wrong!</h5><br>");
            //show the correct answer
            $("#questionDisplay").append("The correct answer is " + questions[game.currentQuestion].correctAnswer);
            //add to the counter
            game.numWrong++;
            //if there are no more questions left then call the results method after 3 seconds
            if (game.currentQuestion === questions.length - 1) {
                console.log("no more questions");
                setTimeout(game.results, 3000);
            }
            //if there are more questions then move to next question after 3 seconds
            else {
                setTimeout(game.nextQuestion, 3000);
            };
        },

        reset: function() {
            //clear all keys and reset to first question when the reset button is pushed.
            game.currentQuestion = 0;
            game.counter = 15;
            game.numCorrect = 0;
            game.numWrong = 0;
            game.numBlank = 0;
            //load the first question
            game.showQuestion();
            //show the timer Area
            $("#timerArea").show();
        }
    };

    //events and main game play=============================================================

    //on click of start
    $("#start").on("click", function() {
        //hide start button and the other sections of that container
        $("#start, #triviaHeader, #triviaInstructions").hide();
        //show timer Area
        $("#timerArea").show();
        //call the show question function
        game.showQuestion();
    });
        

    //on click of answer
    $("#questionDisplay").on("click", ".answerButton", function(event) {
        event.preventDefault();
        //call the method from the game object
        game.clicked(event);
    });

    //when reset button is pushed
    $("#questionDisplay").on("click", "#reset", function(event){
        event.preventDefault();
        console.log("replay was pushed");
        game.reset();
    });
    
   // to get the movies value from DOM and send to the API route
   $("#movieSelect").on("change", function(event){
        event.preventDefault();
        // console.log("this is the select on change function called");
        //assign value from selected item
        var movieTitle = $(this).val();
        //put the movie title in an object to send to the API file
        var movieObj = {
            movie: movieTitle
        };
        console.log("this is the movie selected " + JSON.stringify(movieObj, null, 2));
        //send the value to the API route
        $.post("/", movieObj, function() {
            console.log("movie selected")
        }).then(function (data) {
            // console.log("movie data object", data);
            var movie = data;
            console.log(movie.title, movie.plot, movie.runtime, movie.poster, movie.ratingSrc, movie.ratingVal, movie.awards);
            //now how to display the result in handelbars//try doing a modal
            // location.reload(); // won't this clear the page though because it will reset the form
        })
    });








});