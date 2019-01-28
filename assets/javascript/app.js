$(document).ready(function () {
  var questionOptions = [
      // JSON objects:
      {
         question: "Why does the moon appear to shine?", 
         choice: ["Because it reflects sunlight.", "Because it reflects light from Earth.", "Because it makes its own light.", "Because it reflects light from the stars." ],
         answer: 0,
         photo: "assets/images/moon.jpg"
       },
       {
         question: "How long does it take the moon to make a complete revolution around the earth?", 
         choice: ["365 days", "One Day", "Seven Days", "27 Days" ],
         answer: 4,
         photo: "assets/images/moon.jpg"
       }, 
       {
         question: "What might happen if sunlight didn't strike the moon at different angles?", 
         choice: ["The tides would not exist", "We wouldn't be able to see the moon", "The moon would not go through phases", "There would be no eclipses" ],
         answer: 2,
         photo: "assets/images/moon.jpg"
      }, 
      {
         question: "What can you infer about distance of the moon from the Earth?", 
         choice: ["It is the closest heavenly body to the earth", " It is slightly closer than Mars, and slightly more distant than Venus", "It is farther away than a few of the planets", "It is slightly more distant than the sun" ],
         answer: 0,
         photo: "assets/images/moon.jpg"
      }, 
      {
         question: "What can you conclude about the dark patches on the moon's surface", 
         choice: ["They are high plateaus", "They are deep craters", "They are tall mountains", "They are sunken plains, or seas" ],
         answer: 3,
         photo: "assets/images/moon.jpg"
      }, 
      {
         question: "How did the moon form? Choose the best answer?", 
         choice: ["A large chunk of rock was captured by earth's gravity", "A rogue planet smashed into the earth", "It formed out of the same material the earth did", "No one knows for sure" ],
         answer: 3,
         photo: "assets/images/moon.jpg"
      }, 
      {
         question: "If you weigh 100 kg on earth, approximately how much would you weigh on the moon?", 
         choice: ["100 kg", "16 kg", "160 kg", "60 kg" ],
         answer: 1,
         photo: "assets/images/moon.jpg"
      }, 
      {
         question: "If you wanted to find iron and sulfur on the moon,where would you look?", 
         choice: ["Inside the moon's craters", "In the maria, or seas", "Inside the moon's core", "On top of the moon's mountains" ],
         answer: 2,
         photo: "assets/images/moon.jpg"
      },
      {
         question: "What is the moon mostly made out of?", 
         choice: ["Igneous rock", "Liquid magma", "Dried-out soil", " Sedimentary rock" ],
         answer: 0,
         photo: "assets/images/moon.jpg"
      },
      {
         question: "Which of the following is a true statement about the moon?", 
         choice: ["It is the biggest moon in the solar system", "It is the biggest moon relative to the size of its mother planet", "Liquid water has been found there", "Humans first set foot there in 1973"],
         answer: 1,
         photo: "assets/images/moon.jpg"
      }];

   // Variables:   
   var correctCount = 0;
   var incorrectCount = 0;
   var noAnswerCount = 0;
   var timer = 20;
   var intervalId;
   var userGuess = "";
   var clockRunning = false;
   var questionCount = questionOptions.length;
   var pick;
   var index;
   var newArray = [];
   var holderArr = [];

   // Hide reset-button until game over screen.
   $('#reset').hide();
   
   // Onclick event for start-button. 
   // Hide start-button, display one question at a time, start timer countdown.
   $('#start').on('click', function() {
      $('#start').hide();
      revealQuestion();
      startTimer();

      for (var i = 0; i < questionOptions.length; i++) {
         holderArr.push(questionOptions[i]);
      }
   })

   // Timer START:
   function startTimer() {
      if (!clockRunning) {
         intervalId = setInterval(decrementTime, 1000);
         clockRunning = true;
      }
   }

   // Timer countdown:
   function decrementTime() {
      $('#timeRemaining').html('<h3>Time Remaining: ' + timer + '</h3>');
      timer--;

      // If timer reaches 0, stop timer. Display correct answer and pic/gif. Add to 'unanswered' counter.
      if (timer === 0) {
         noAnswerCount++;
         stopTimer();
         $('#answerBlock').html(`<p>Time's up! The correct answer is... ` + pick.choice[pick.answer] + `</p>`);
         hidePic();
      }
   }

   // Timer STOP:
   function stopTimer() {
      clockRunning = false;
      clearInterval(intervalId);
   }

   // Randomly choose question from array.
   function revealQuestion() {
      index = Math.floor(Math.random() * questionOptions.length);
      pick = questionOptions[index];
      
          // Generate random index in array. Loop through available questions.
          $('#questionBlock').html('<h2>' + pick.question + '</h2>');
          for (var i = 0; i < pick.choice.length; i++) {
              var userGuess = $('<div>');
              userGuess.addClass('answeroptions');
              userGuess.html(pick.choice[i]);
              // Assign array position so user guesses can be evaluated.
              userGuess.attr('data-guessindex', i);
              $('#answerBlock').append(userGuess);
          }
    
     // Answer selection using onclick function.
     $('.answeroptions').on('click', function() {
       // Identify array position from userGuess.
       userGuess = parseInt($(this).attr('data-guessindex'));

         // Outcomes for correct or incorrect guesses. Add guesses to corresponding counters.
         if (userGuess === pick.answer) {
            stopTimer();
            correctCount++;
            userGuess = "";
            $('#answerBlock').html('<p>Correct!</p>');
            hidePic();

         } else {
            stopTimer();
            incorrectCount++;
            userGuess = "";
            $('#answerBlock').html(`<p>Wrong! The correct answer is... ` + pick.choice[pick.answer] + `</p>`);
            hidePic();
         }
     })
   } 
   
    // Display pic/gif after user answer or timeout (3sec), then hide pic.
    function hidePic() {
        $('#answerBlock').append('<img src=' + pick.photo + '>');
        newArray.push(pick);
        questionOptions.splice(index, 1);

            var hiddenPic = setTimeout(function() {
            $('#answerBlock').empty();
            timer = 20;
      
        // Reveal ending-score screen if all questions answered. Show correct, incorrect, and unanswered counter.
        if ((incorrectCount + correctCount + noAnswerCount) === questionCount) {
          $('#questionBlock').empty();
          $('#questionBlock').html('<h1>Game Over!</h1>');
          $('#answerBlock').append('<h2> Correct: ' + correctCount + '</h2>');
          $('#answerBlock').append('<h2> Incorrect: ' + incorrectCount + '</h2>');
          $('#answerBlock').append('<h2> Unanswered: ' + noAnswerCount + '</h2>');
          $('#reset').show();
          correctCount = 0;
          incorrectCount = 0;
          noAnswerCount = 0;

        // If questions still remaining, show next questions and reset timer. 
        } else {
          startTimer();
          revealQuestion();
        }
        // Display pic/gif for 3 seconds, then hide and reset question and timer.
        }, 3000);
    }

   // On reset button click: clear prior screen, hide reset button, reload questions, start timer. 
    $('#reset').on('click', function() {
        $('#reset').hide();
        $('#answerBlock').empty();
        $('#questionBlock').empty();
        for (var i = 0; i < holderArr.length; i++) {
          questionOptions.push(holderArr[i]);
        }
        startTimer();
        revealQuestion();
    })
})

// End game.