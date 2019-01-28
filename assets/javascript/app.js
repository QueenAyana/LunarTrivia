$(document).ready(function () {
  var questionOptions = [
      // JSON objects:
      {
         question: "How long had Scully been with the FBI before she was assigned to the X-Files?", 
         choice: ["A little over two years.", "One year.", "A little over six months.", "She was still a rookie and not yet an FBI agent." ],
         answer: 0,
         photo: "assets/images/dana-scully.jpg"
       },
       {
         question: "What is Mulder's nickname?", 
         choice: ["Creepy", "Spooky", "Foxy", "Pervy" ],
         answer: 1,
         photo: "assets/images/spookyMulder.gif"
       }, 
       {
         question: "Who is NOT part of the Syndicate?", 
         choice: ["William Mulder", "Alex Krycek", "Cigarette Smoking Man", "Victor Klemper", "Jeffery Spender", "Well-Manicured Man" ],
         answer: 4,
         photo: "assets/images/jefferySpender.jpg"
      }, 
      {
         question: "What is the Cigarette Smoking Man's real name?", 
         choice: ["John Spender", "William Spender", "C.G.B. Spender", "Jeffrey Spender" ],
         answer: 2,
         photo: "assets/images/cigaretteMan.jpg"
      }, 
      {
         question: "How do you kill the alien bounty hunter?", 
         choice: ["Gun shot to the head.", `Stabbing the back of the neck with an "alien stiletto."`, "A lethal dose of the black oil virus.", "A special incinerator weapon." ],
         answer: 1,
         photo: "assets/images/alienStiletto.jpg"
      }, 
      {
         question: "What happens to Scully when she removes the metallic chip implant in the back of her neck?", 
         choice: ["It triggers a silent alarm at MUFON headquarters.", "She gets temporarily paralyzed.", "Black oil seeps from her eyes.", "She develops cancer." ],
         answer: 3,
         photo: "assets/images/scullyImplant.jpg"
      }, 
      {
         question: "Samantha Mulder was given to the alien colonists in exchange for what?", 
         choice: ["Secrets to the alien colonists' plans for world destruction.", "The exact date of colonization.", "An alien fetus.", "The cure to any human disease." ],
         answer: 2,
         photo: "assets/images/samantha.jpg"
      }, 
      {
         question: "Which U.S. President was first made aware of the aliens plans for colonization?", 
         choice: ["John F. Kennedy", "Franklin D. Roosevelt", "Harry Truman", "Richard Nixon" ],
         answer: 2,
         photo: "assets/images/truman.jpg"
      },
      {
         question: "Who was Emily Sim?", 
         choice: ["She was a 3-year-old girl who developed psychic abilities due to the black oil.", "She was Scully's youngest sister.", "She was a clone of Samantha Mulder.", "She was the result of a failed alien-human hybrid experiment, created from Scully's ova." ],
         answer: 3,
         photo: "assets/images/emily.jpg"
      },
      {
         question: "What is the purpose of a Super Soldier?", 
         choice: ["They were created by alien rebels to protect humans from colonization.", "The were created by the alien colonists to ensure humans do not survive colonization.", "They were created by the government to protect humans from the alien rebels.", ],
         answer: 1,
         photo: "assets/images/supersoldiers.jpg"
      },
      {
         question: "What are Super Soldiers vulnerable to?", 
         choice: ["Water", "Magnetite", "Sulpher", "Hydrogen Peroxide" ],
         answer: 1,
         photo: "assets/images/magnetite.jpg"
      },
      {
         question: "When is the official date of colonization?", 
         choice: ["August 24, 2007", "December 21, 2012", "July 7, 2047", "October, 13, 2014" ],
         answer: 1,
         photo: "assets/images/colonization.jpg"
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