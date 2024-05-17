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

function loadNextQuestion() {
  //currentQuestion++;
  
  if(currentQuestion >= questions.length) {
     showResult();
     return;
   }

   const questionElement = document.getElementById("question");
   const choicesElement = document.getElementById("choices");

   questionElement.innerHTML = questions[currentQuestion].questionText;

   // Clear previous choices from the list
   while(choicesElement.firstChild) {   
       choicesElement.removeChild(choicesElement.firstChild);
    }

    // Add new choices to the list
    for(let i=0;i<questions[currentQuestion].options.length;i++) {   
        const listItem = document.createElement("li");
        listItem.innerHTML = questions[currentQuestion].options[i];
        
        listItem.addEventListener("click", handleAnswer);
        
        choicesElement.appendChild(listItem);
     }
}
function loadQuestions() {
  for (let question of questions ){
    const {questionText,options, } = question;
    const html= ` <li class="splide__slide">
    <div class="question-wrapper">

    <p id="question">${ questionText}_____.</p>

    <ul id="choices">
     ${options.map((option) =>{
      return `<li>${option}</li>`
     })}
    </ul>
  </div>
  </li>
`
qwcElement.insertAdjacentHTML('beforeend',html)
 const questionSlide = new Splide( '.splide' ).mount();
 questionSlide.mo
  }
}

function handleAnswer(event) {

const selectedOptionText=event.target.innerHTML;

const resultMessage=document.getElementById('result');

if(selectedOptionText===questions[currentQuestion].options[questions[currentQuestion].correctAnswerIndex]){
  resultMessage.textContent='Correct!';
}else{
  resultMessage.textContent='Incorrect!';
}
setTimeout(()=>{	
    resultMessage.textContent='';
    loadNextQuestion();
},1000); 

}


function showResult(){
const submitButton=document.getElementById('submit-btn');
submitButton.style.display='block';
  
const container=document.getElementById('quiz-container');
container.style.textAlign='center';
container.innerHTML='<h2>Congratulations! You have completed the quiz.</h2>';

container.scrollIntoView({ behavior:'smooth' });  

 let scoresTable = document.getElementById("scores-table");

 // Display high scores/score sheet elements

 // Create table header row       
 let headerRow = document.createElement("tr");
        
 let thName = document.createElement("th");   
 thName.textContent ='Name';                 
 headerRow.appendChild(thName);

 let thScore = document.createElement("th");    
 thScore.textContent ='Score';                  
 headerRow.appendChild(thScore);

 scoresTable.appendChild(headerRow);

 // Simulate fetching high scores from an API or storage
   
 // Mock data - Scores array containing objects with name and score
  
const randomScores=[{ name:'John',score:'2/3'},
{name:'Sarah',score:'3/3'},           
{name:'Mike',score:'1/3'}];

randomScores.forEach(score => {

let row=document.createElement('tr');

let tdName=document.createElement('td');          
tdName.textContent=`${score.name}`;


row.appendChild(tdName);

let tdScore=document.createElement('td');         
tdScore.textContent=`${score.score}`;



row.appendChild(tdScore);


scoresTable.appendChild(row);    

});

}
loadQuestions(

);