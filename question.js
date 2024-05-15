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

// Quiz data
const quizData = [
  {
    question: "Question1",
    choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
    correctAnswerIndex: "",
  },

  // Add more questions here...
];

let currentQuestion = -1;

function loadNextQuestion() {
  currentQuestion++;

  if (currentQuestion >= quizData.length) {
    showResult();
    return;
  }

  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");

  questionElement.innerHTML = quizData[currentQuestion].question;

  // Clear previous choices from the list
  while (choicesElement.firstChild) {
    choicesElement.removeChild(choicesElement.firstChild);
  }

  // Add new choices to the list
  for (let i = 0; i < quizData[currentQuestion].choices.length; i++) {
    const listItem = document.createElement("li");
    listItem.innerHTML = quizData[currentQuestion].choices[i];

    listItem.addEventListener("click", handleAnswer);

    choicesElement.appendChild(listItem);
  }
}

function handleAnswer(event) {
  const selectedOptionText = event.target.innerHTML;

  const resultMessage = document.getElementById("result");

  if (
    selectedOptionText ===
    quizData[currentQuestion].choices[
      quizData[currentQuestion].correctAnswerIndex
    ]
  ) {
    resultMessage.textContent = "Correct!";
  } else {
    resultMessage.textContent = "Incorrect!";
  }
  setTimeout(() => {
    resultMessage.textContent = "";
    loadNextQuestion();
  }, 1000);
}

function showResult() {
  const submitButton = document.getElementById("submit-btn");
  submitButton.style.display = "none";

  const container = document.getElementById("quiz-container");
  container.style.textAlign = "center";
  container.innerHTML =
    "<h2>Congratulations! You have completed the quiz.</h2>";

  //You can add high scores/score sheet elements here
}

loadNextQuestion();
