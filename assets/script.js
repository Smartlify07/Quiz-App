let swiper;
let duration = 51;
const durationInterval = 1000;
let totalScore = 0;
const addedScore = 10;

const score = document.querySelector('#score');
const scoreForm = document.querySelector('.score-container form');
const studentNameInput = document.querySelector('.student-name');


const timerElement = document.getElementById("timer");
const intervalID = setInterval(function () {
  duration--;
  timerElement.innerHTML = duration;
  if (duration <= 0) {
    clearInterval(intervalID);
    showResults();
  }
}, durationInterval);




const questions = [
  {
    questionText:
      "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText:
      "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];




// Quiz data

let currentQuestion = 0;
const qwcElement = document.querySelector("#qwc")
function loadQuestions() {
  for (let question of questions) {
    const { questionText, options, } = question;
    const html = ` <li class="swiper-slide">
    <div class="question-wrapper">

    <p id="question">${questionText}_____.</p>

    <ul id="choices">
     ${options.map((option) => {
      return `<li>${option}</li>`
    }).join('')}
    </ul>
    <span></span>
  </div>
  </li>
`
    qwcElement.insertAdjacentHTML('beforeend', html)
    swiper = new Swiper('.swiper', {
      // Optional parameters
      speed: 400,
    });
  }
}
function nextQuestion() {
  if (swiper) {
    setTimeout(function () {
      swiper.slideNext();
    }, 800)
  }
}
function checkAnswer() {
  const HTMLquestions = document.querySelectorAll(".question-wrapper");
  const HTMLresults = document.querySelectorAll(".question-wrapper span");

  HTMLquestions.forEach(function (question, index) {
    const result = document.querySelector(`${question.className} `)
    question.addEventListener("click", function (event) {

      const selectedOption = event.target;
      if (selectedOption.tagName === "LI") {
        const selectedOptionText = selectedOption.innerHTML;
        const answerText = questions[index].answer;

        if (selectedOptionText === answerText) {
          HTMLresults[index].innerHTML = "Correct answer";
          totalScore += addedScore;
          
        } else {
          duration -= 10;
          HTMLresults[index].innerHTML = "Incorrect answer";
          
        }
      }
      if(index=== questions.length -1){
        showResults();
      }
      else{
        nextQuestion();
      }
    });

  })
}

function showResults() {
  clearInterval(intervalID);
  const scoreContainer = document.querySelector('.score-container');
  const quiz = document.querySelector('.swiper');
 
  score.innerHTML = totalScore;
  scoreContainer.classList.remove('hidden');
  quiz.classList.add('hidden');
}

function storeHighScore(name) {
  if(!name) return false;
        const highScores = JSON.parse(localStorage.getItem('highScores'));
  if (highScores) {
    const nameExistsIndex = highScores.findIndex(item => item.name === name);
    if (nameExistsIndex!=-1) {
      const student = highScores[nameExistsIndex];
      if (student.score < totalScore) {
        student.score = totalScore;
        highScores[nameExistsIndex] = student;
        localStorage.setItem('highScores', JSON.stringify(highScores));
      }
    }
    else {
      highScores.push({ name, score: totalScore });
      localStorage.setItem('highScores', JSON.stringify(highScores));
    }
  }
  else{
    localStorage.setItem('highScores', JSON.stringify([
      { name, score: totalScore }
    ]));
  }
return true;
}



scoreForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const studentName = studentNameInput.value;

  
  if (storeHighScore(studentName))location.href = 'highscore.html';
    l
});
loadQuestions();
checkAnswer();
