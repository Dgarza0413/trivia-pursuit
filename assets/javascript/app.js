$(document).ready(function () {
    //game mechanics
    var gameOn = false;

    //timing variables
    var intervalId;
    var timerRunning = false;
    var timer = 20;
    var points = 20;
    var totalPoints = 0

    //object variables and indexes
    var questionsCorrect = 0;
    var questionsIncorrect = 0;
    var questionsIndex = 0;

    var questionsList = [{
        question: "The effects of the sky turning blue is explained as",
        answerChoices: ["doppler effect", "long waveslengths", "coriolis effect", "rayleigh scattering"],
        correctChoice: 4,
        media: "assets/images/rayleighscattering.jpg",
        questionHint: "Also known as the turnell effect after the scientist lord RAYLEIGH furthered the study SCATTERING turnells popularity"
    },
    {
        question: "what is the physical state of Earth's inner core",
        answerChoices: ["liquid", "gas", "solid", "plasma"],
        correctChoice: 3,
        media: "assets/images/earthstructure.jpg",
        questionHint: "Although the earth's outer core is liquid the inner core is a hot SOLID nickel body that the crew from the movie 'the core' somehow reached."
    },
    {
        question: "This body part produces red blood cells among other vital cells",
        answerChoices: ["Bone Marrow", "Heart", "Liver", "Lungs"],
        correctChoice: 1,
        media: "assets/images/bonemarrow.jpg",
        questionHint: "Platelets and white blood cells are also produced today for toMARROW's use"
    }, {
        question: "The volcanic rock obsidian is classified as this rock group",
        answerChoices: ["siliciclastic", "igneous", "sedimentary", "metamorphic"],
        correctChoice: 2,
        media: "assets/images/obsidian.jpg",
        questionHint: "Also known as dragonglass in now unpopular tv show Game of Thrones it is also near impossible to cast like a metal for weapons"
    },
    {
        question: "Most radioactive elements decay to this metal sometimes used for car batteries",
        answerChoices: ["Pb", "Bi", "Au", "Al"],
        correctChoice: 1,
        media: "assets/images/lead.jpg",
        questionHint: "Pb which is lead was also used in anicent egypt for cosmetic purposes that 'LEAD' to poisoning on occasion"
    },
    {
        question: "Created in 1954 this computer language is oldest to date",
        answerChoices: ["Basic", "C", "Lisp", "Fortran"],
        correctChoice: 4,
        media: "assets/images/fortran.jpg",
        questionHint: "Lisp is considered the second oldest language to date that still LISPers sweet nothings"
    },
    {
        question: "This load bearing triangular unit helps keep homes from collapse",
        answerChoices: ["truss", "pillar", "motte", "flats"],
        correctChoice: 1,
        media: "assets/images/truss.jpg",
        questionHint: "There are near 29 different types of common trusses in the United States that are still TRUSSted everywhere today"
    },
    {
        question: "This gentleman was the inventor of dynamite and named after this prestigous science award",
        answerChoices: ["sam winchester", "Robert Bunsen", "Richard Jordan Gatling", "alfred nobel"],
        correctChoice: 4,
        media: "assets/images/nobel.jpg",
        questionHint: "His implementation of nitro glycerin in clay-like material lead the way for BOOMING mining excavations"
    },
    {
        question: "This chemical compound is part responsible for causing acid rain",
        answerChoices: ["NH3", "O2", "CO2", "C6H12O6"],
        correctChoice: 3,
        media: "assets/images/co2.jpg",
        questionHint: "CO2 reacts with water to create carbonic acid to create an undesired effect of ruining CARBONATE statues"
    }, {
        question: "Popular cultural nomenclature 'this bottle is sweating' refers to what",
        answerChoices: ["vaporisation", "evaporation", "sublimation", "condensation"],
        correctChoice: 4,
        media: "assets/images/condensation.jpg",
        questionHint: "if the bottle was actually sweating that would make it perspirating instead"
    },
    ]

    //a function to remove or clear the dom before another set is called
    gameStart()
    onClick()

    //starts game on click versus the starting the question
    function gameStart() {
        $("button").on("click", function () {
            gameOn = false;
            if (!gameOn) {
                $("#title").remove()
                $("button").remove()
                startQuestion()
            }
        })
    }

    function startQuestion() {
        gameOn = false
        timer = 20;
        points = 20;
        $("#timer").show()
        $("#msg-box").text("")
        generateAnswers()
        timeLimit()
    }

    //create a function to display a timer onto the dom
    function setTimer() {
        document.getElementById("timer").textContent = timer;
    }

    //stop timer since it continues even after question is correct
    function stopTimer() {
        timerRunning = false
        clearInterval(intervalId)
    }

    //when a question times out
    function timeoutQuestion() {
        var picture = questionsList[questionsIndex - 1].media
        var questionInfo = questionsList[questionsIndex - 1].questionHint
        clearAnswerDetail()
        stopTimer()
        $("#timer").hide()
        $("#question").hide()
        $("#msg-box").html("<h1>TIME!! INCORRECT</h1>")
        $("#msg-box").append("<img src=" + picture + ">")
        $("#msg-box").append("<p>" + questionInfo + "</p>")
        $("#msg-box").append("<p> participation point: " + points + "</p>")
        setTimeout(startQuestion, 15000)
    }

    //instructions on time limits and what happens when timer hits zero
    function timeLimit() {
        if (!timerRunning) {
            timerRunning = true;
            intervalId = setInterval(function () {
                timer--
                points--
                $("#timer").html(timer)
                if (timer <= 0) {
                    timerRunning = false;
                    points = 1
                    questionsIncorrect++
                    questionsIndex++
                    stopTimer()
                    timeoutQuestion()
                }
            }, 1000)
        }
    }

    //checks to see if the game is over
    function isGameOver() {
        if (questionsIndex >= questionsList.length) {
            $("#timer").hide()
            $("#question").hide()
            $("#msg-box").append("<h1>Game Over</h1>");
            $("#msg-box").append("<h2>questions correct: " + questionsCorrect + "</h2>");
            $("#msg-box").append("<h2>Incorrect answer choices made: " + questionsIncorrect + "</h2>");
            $("#msg-box").append("<h2>Total POINTS: " + totalPoints + "</h2>");
            stopTimer()
            clearAnswerDetail()
        }
    }

    //checks if the answer matches the index with the correct choice number
    function correctQuestion() {
        var picture = questionsList[questionsIndex - 1].media
        var questionInfo = questionsList[questionsIndex - 1].questionHint
        clearAnswerDetail()
        stopTimer()
        $("#timer").hide()
        $("#question").hide()
        $("#msg-box").html("<h1>CORRECT</h1>")
        $("#msg-box").append("<img src=" + picture + ">")
        $("#msg-box").append("<p>" + questionInfo + "</p>")
        $("#msg-box").append("<h2> points awarded for wonkiness: " + points + "</h2>")
        setTimeout(startQuestion, 15000)
    }

    // clears the dom for the next var loop to run
    function clearAnswerDetail() {
        $(".answer-detail").remove()
    }


    //this loop will fire to generate the answerslist
    function generateAnswers() {
        isGameOver()
        var question = questionsList[questionsIndex].question
        $("#question").text(question)
        $("#question").show()
        for (var i = 0; i < 4; i++) {
            var answerSelectList = questionsList[questionsIndex].answerChoices[i]
            var correctChoice = questionsList[questionsIndex].correctChoice
            var answerSelect = $("<div>");

            answerSelect.addClass("answer-detail")
            answerSelect.attr("answer-select", answerSelectList)
            answerSelect.attr("data-answer-detail", [i])
            answerSelect.text(answerSelectList)

            $("#answer-box").append(answerSelect)
            $("#answer-detail").addClass("name")
            $("#answer-detail").attr("answer-select", answerSelectList)
            $("#answer-detail").attr("answer-index", correctChoice)
        }
        onClick()
    }

    function onClick() {
        $(".answer-detail").on("click", function () {
            var correct = questionsList[questionsIndex].correctChoice
            var list = questionsList[questionsIndex].answerChoices

            if (parseInt($(this).attr("data-answer-detail")) === (parseInt(correct) - 1)) {
                totalPoints = points + totalPoints
                questionsIndex++
                questionsCorrect++
                correctQuestion()
            }
            else {
                questionsIncorrect++
                timer = timer - 6
                points = points - 10
                $(this).slideUp()
            }
        })
    }

});

// javascript notes
// line 151
// i should change the to string method structure 
// to an array index location comparison instead
// use indexof to compare input
// UPDATE: line 151 is updated 8:12pm

//line 116
// i am concerned that within the answer generator 
//it throws away the ability to selector items
// i am thinking this is a positioning of the functions 
// that prevents this from happening
// UPDATE: line 116 was solved by placing the onclick in the for loop

//I have two issues i cannot end the game with a game complete
//UPDATE: this has been patched by placing if statement at beginning of function - reconsider placement
//
//second is i cannot properly set up a reset on each question
//should i generate a button to set

//i need an onclick function to select a partically answer to compare 
//with the answer
//a counter to keep track of questions is needed