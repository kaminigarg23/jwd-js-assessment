/* ***************************
  JWD JavaScript Assessment
  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.
    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers
      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.
      3. Add 2 more questions to the app (each question must have 4 options).
      4. Reload the page when the reset button is clicked (hint: search window.location)
      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */
let timerInterval;
const timerCountdown = () => {
  let min = 0;
  let sec = 60;
  timerInterval =
    setInterval(() => {
      const timeRemaining = document.querySelector("#time");

      sec--;
      if (sec >= 10) {
        timeRemaining.innerHTML = `${min}:${sec}`

      } else {
        timeRemaining.innerHTML = `${min}:0${sec}`
      }

      if (sec <= 0) {

        clearInterval(timerInterval);
        calculateScore();
        displayScore();

        disableOptions();

        submitBtn.setAttribute("disabled", "")
        timeRemaining.insertAdjacentHTML("afterend", `<h3 class="text-danger text-center">Sorry..Time is finished </h3>`)
      };
    }, 1000)
};

// //Task-4 ---- window reload

//     function reloadPage() {
//       location.reload();
//     }

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
    timerCountdown();
  });


  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/


  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 0,
    },
    {
      q: 'Which is the largest planet in the solar system',
      o: ['Jupitor', 'Earth', 'Mars', 'Neptune'],
      a: 0,
    },
    {
      q: 'Which is the largest country by population',
      o: ['China', 'Maxico', 'India', 'Russia'],
      a: 0,
    },
  ];
  const quizWrap = document.querySelector('#quizWrap');
  const displayQuiz = () => {
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };
  displayQuiz();

  const disableOptions = () => {
    const allRadioElements = document.querySelectorAll(`[type="radio"]`)
    const allLiElements = document.querySelectorAll(`li`)
    allRadioElements.forEach(eachRadioElement => {
      eachRadioElement.setAttribute("disabled", "");
    });
    allLiElements.forEach(eachLiElement => {
      eachLiElement.classList.add("text-black-50")
    });
  }
  //Calculate the score
  let score = 0;
  const calculateScore = () => {
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        // selecting each li
        const liElement = document.querySelector('#' + li);
        //Selecting each radio button
        const radioElement = document.querySelector('#' + r);
        if (quizItem.a == i) {
          //change background color of li element
          liElement.style.backgroundColor = "rgba(40,247,40,0.3)";
        };

        // If correct answer, increase score by 1
        if (radioElement.checked && quizItem.a == i) {
          score++;
        }
      }

    });
  };

  const displayScore = () => {
    let totalScore = document.querySelector("#score");
    totalScore.innerHTML = `<h2 class="text-dark mt-2 mb-5">Your total score is : <span class="text-info">${score}/${quizArray.length}</span></h2>`
  };

  const submitBtn = document.querySelector("#btnSubmit")
  submitBtn.addEventListener("click", () => {
    calculateScore();
    displayScore();
    // Disable option elements
    disableOptions();
    submitBtn.setAttribute("disabled", "")
    // Stop timer
    clearInterval(timerInterval);
  })

  //Reload the page
  const resetBtn = document.querySelector("#btnReset")
  resetBtn.addEventListener("click", () => {
    location.reload();
  })
});