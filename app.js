const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
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

const slider = document.querySelector(".slider");

let counter = 0;
let score = 0;
const timer = document.querySelector("#timer");

const scores = JSON.parse(localStorage.getItem("scores")) || [];

// Timer

const timerInterval = setInterval(() => {
  timer.textContent--;

  if (Number(timer.textContent) === 0) {
    clearInterval(timerInterval); // Stop the countdown
    displayScore(score); // Display the score when time is up
  }
}, 1000);

let question = `
        <div class="question-wrapper">
          <p>${questions[counter].questionText}</p>
          <ul>
          ${questions[counter].options
            .map((item) => `<li class="answer">${item}</li>`)
            .join("")}
          </ul>
        </div>
`;

slider.innerHTML += question; // append the question to the slider

const answers = document.querySelectorAll("li");

answers.forEach((answer) =>
  answer.addEventListener("click", () => {
    if (answer.textContent === questions[counter].answer) {
      score++;
    }
    counter++;

    const questionElement = slider.querySelector(".question-wrapper");

    const questionTitle = questionElement.querySelector("p");

    const answerList = questionElement.querySelectorAll("li");

    answerList.forEach((item, index) => {
      item.textContent = questions[counter].options[index];
    });

    questionTitle.textContent = questions[counter].questionText;
    if (counter === questions.length - 1) {
      displayScore(score); // Display the score card when the counter has reached the lenght of the questions array

      clearInterval(timerInterval); // Stop countdown
    }
  })
);

function displayScore(score) {
  const scoreCard = document.querySelector(".score-card");

  const scoreCardContainer = scoreCard.querySelector(".container");

  const form = scoreCardContainer.querySelector("form");

  scoreCard.style.display = "flex";

  slider.style.display = "none";

  const scoreText = document.createElement("p");

  scoreText.className = "score-text";

  scoreText.textContent = `${score} `;

  scoreCardContainer.insertBefore(scoreText, form);

  return score;
}

// form submission - Store the user's score in local storage

const form = document.querySelector(".score-card form");

//Add Score to local storage
function addScoreToStorage(name, score) {
  let scoreData = {
    score: score,
    name: name,
  };
  localStorage.setItem("scores", JSON.stringify([...scores, scoreData]));
  console.log(localStorage.getItem("scores"));
}

//Handle form submit, to record the highscores
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = form.querySelector("input");

  const score = document.querySelector(".score-text").textContent;

  const userName = input.value;

  if (userName !== "") {
    addScoreToStorage(userName, score);
    input.value = "";
    console.log(location.href);
    location.href = "./index.html";
  } else {
    const errorText = document.createElement("h3");
    errorText.className = "error-text";
    errorText.textContent = "Please enter a username";
    document.querySelector("#quiz").insertBefore(errorText, slider); // Display the text in the UI

    // Remove text after 3 seconds
    setTimeout(() => {
      errorText.remove();
    }, 2000);
  }
});
