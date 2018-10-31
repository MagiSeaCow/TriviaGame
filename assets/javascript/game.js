$(document).ready(function()
{
    // Initialize variables for the game
    var startTime = 30;
    var correctAnswerCount = 0;
    var wrongAnswerCount = 0;
    var noResponse = 0;
    var intervalId;

    // Array that contains the questions and answers to those questions, in the form of individual objects
    var quizQuestions = [
    {
        question: "The transmission system transmits _________ from engine to wheels",
        answerChoices: ["Speed", "Power", "Current", "Pressure"],
        correctChoice: 1
    },
    {
        question: "An automobile chassis does not include which one of the following parts?",
        answerChoices: ["Shock absorbers", "Steering System", "Differential", "Brakes"],
        correctChoice: 2
    },
    {
        question: "Which of these were or are used in automobiles to provide suspension?",
        answerChoices: ["Leaf Springs", "Coil Springs", "Torsion Bars", "All of the Mentioned"],
        correctChoice: 3
    },
    {
        question: "The lid that covers the engine top in a car and situated at the front is called ________",
        answerChoices: ["Gill", "Soft Top", "Bonnet", "Spoiler"],
        correctChoice: 2
    },
    {
        question: "Why are ‘Bumpers’ are used in cars?",
        answerChoices: ["Reduce Impact of low speed collisions", "Improve Aerodynamics", "Increase Engine Performance", "None of the Mentioned"],
        correctChoice: 0
    },
    {
        question: "The central portion of the wheel is called?",
        answerChoices: ["Rim", "Scale", "Hub", "Axel"],
        correctChoice: 2
    },
    {
        question: "A ‘bucket seat’ can accomodate how many persons",
        answerChoices: ["One", "Two", "Three", "Four"],
        correctChoice: 0
    }
    ];

    // jQuery function to start the game, which will hide the start button from sight, and populate the page with each question from the array
    // There is probably a more elegant and DRY way to do this, but I don't know how, so slow and repeatative it is.....
    $("#start").on("click", function()
    {
        // hide the start button when function runs
        $(this).hide();

        // Display initial timer countdown
        $("#timeCounter").html("<h2>Time Remaining: 30 Seconds</h2>" + "<br>");

        // Start timer countdown
        timerStart();
    
        for (let i = 0; i < quizQuestions.length; i++)
        {
            $("#question" + (i + 1)).html("<h3>" + quizQuestions[i].question + "</h3>");

            $("#options" + (i + 1)).html(
                  "<input type='radio' name='options"+ i + 1 +"' value='0'>" + "<label>" + quizQuestions[i].answerChoices[0] + "</label>"
                + "<input type='radio' name='options"+ i + 1 +"' value='1'>" + "<label>" + quizQuestions[i].answerChoices[1] + "</label>"
                + "<input type='radio' name='options"+ i + 1 +"' value='2'>" + "<label>" + quizQuestions[i].answerChoices[2] + "</label>"
                + "<input type='radio' name='options"+ i + 1 +"' value='3'>" + "<label>" + quizQuestions[i].answerChoices[3] + "</label><br><br>"
                                );
        }
        // Added a button for the user to end the game early, if they have answered all the questions and do not want to wait for the time to expire
        $("#submit").html("<button class='btn' id='done'> Done </button>");

        // Click function that will run when "Done" button is clicked that will run three other functions: 1. a function to keep score 2. a function to display results 3. a function to stop timer
        // The order that the functions are called is important!
        $("#done").on("click", function()
        {
            // Function to keep score
            scoreKeeper();
            // Function to display results at quiz end
            results();
            // Function to stop timer
            timerStop();
        });
    });

    // Function that sets the the rate in which the timer will count down, in this case, 1 second interval, and starts the timer countdown
    function timerStart()
    {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    // Function that governs how the time will count down, display the new time in the DOM and what happens in the game when time runs out
    // Constantly being passed back to timerStart until if condition is met
    function decrement()
    {
        //  Decrease time by one unit (in this case 1 second).
        startTime--;
        //  Update the time remaining on the timer
        $("#timeCounter").html("<h2>Time Remaining: " + startTime + " Seconds</h2>" + "<br>");

        if (startTime === 0) // Run functions to stop the time counter and display the results of the game
        {
            timerStop();
            scoreKeeper();
            results();
        }
    }

    function timerStop() // Clears the intervalId, which in turn stops the game
    {
        clearInterval(intervalId);
    }

    function results() // Function to hide the timer and all questions answered during the quiz and display only the results of the quiz with a message
    {
        $("#quiz").hide();

        $("#endGameMessage").html("<h2>All Done!</h2><br>");
        $("#numCorrect").html("Number of Questions Answered Correctly: " + correctAnswerCount);
        $("#numWrong").html("Number of Questions Answered Wrong: " + wrongAnswerCount);
        $("#numVoid").html("Number of Questions Answered Omitted: " + noResponse);
    }

    // Function to keep track of correct answers, wrong answers and no reponse to each question.
    function scoreKeeper()
    {
        for (var i = 0; i < quizQuestions.length; i++)
        {
            var checked = $("input[name='options"+i+1+"']:checked").val();
            if (checked === undefined)
            {
                noResponse++;
            }
            else if (checked == quizQuestions[i].correctChoice)
            {
                correctAnswerCount++;
            }
            else
            {
                wrongAnswerCount++;
            };
        };
    };
});