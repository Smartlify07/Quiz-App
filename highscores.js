// High scores page

const highScoresCard = document.querySelector(".high-scores .container");

const clearButton = highScoresCard.querySelector(".clear-scores");

const hightScoresLayout = highScoresCard.querySelector(".high-scores-layout");

function getHighScores() {
  const highScores = JSON.parse(localStorage.getItem("scores")) || [];

  const sortedHighScores = highScores.sort((a, b) => b.score - a.score); // Sort from highest score to lowest

  const highScoresList = `
        <ul class="high-scores-list">
                ${sortedHighScores
                  .map(
                    (score, index) => `
         <li>
        ${index + 1}. ${score.name.toUpperCase()} - ${score.score}
        </li>
          `
                  )
                  .join("")}
        </ul>
        `;

  hightScoresLayout.innerHTML += highScoresList;
}

getHighScores();

function clearHighScores() {
  localStorage.removeItem("scores"); // remove items from local storage
  hightScoresLayout.innerHTML = ``;
}

clearButton.addEventListener("click", clearHighScores);
