let pairsFound = 0;

let questionsAndResponses = [
  { question: "1", response: "assets/1.jpg" },
  { question: "2", response: "assets/2.jpg" },
  { question: "3", response: "assets/3.jpg" },
  { question: "4", response: "assets/4.jpg" },
  { question: "5", response: "assets/5.jpg" },
  { question: "6", response: "assets/6.jpg" },
  { question: "7", response: "assets/7.jpg" },
  { question: "8", response: "assets/8.jpg" },
  { question: "9", response: "assets/9.jpg" },
  { question: "10", response: "assets/10.jpg" },
  { question: "11", response: "assets/11.jpg" },
  { question: "12", response: "assets/12.jpg" },
  { question: "13", response: "assets/13.jpg" },
  { question: "14", response: "assets/14.jpg" },
  { question: "15", response: "assets/15.jpg" },
  { question: "16", response: "assets/16.jpg" },
  { question: "17", response: "assets/17.jpg" },
  { question: "18", response: "assets/18.jpg" },
  { question: "19", response: "assets/19.jpg" },
  { question: "20", response: "assets/20.jpg" },
  { question: "21", response: "assets/21.jpg" },
  { question: "22", response: "assets/22.jpg" },
  { question: "1", response: "assets/1.jpg" },
  { question: "2", response: "assets/2.jpg" },
  { question: "3", response: "assets/3.jpg" },
  { question: "4", response: "assets/4.jpg" },
  { question: "5", response: "assets/5.jpg" },
  { question: "6", response: "assets/6.jpg" },
  { question: "7", response: "assets/7.jpg" },
  { question: "8", response: "assets/8.jpg" },
  { question: "9", response: "assets/9.jpg" },
  { question: "10", response: "assets/10.jpg" },
  { question: "11", response: "assets/11.jpg" },
  { question: "12", response: "assets/12.jpg" },
  { question: "13", response: "assets/13.jpg" },
  { question: "14", response: "assets/14.jpg" },
  { question: "15", response: "assets/15.jpg" },
  { question: "16", response: "assets/16.jpg" },
  { question: "17", response: "assets/17.jpg" },
  { question: "18", response: "assets/18.jpg" },
  { question: "19", response: "assets/19.jpg" },
  { question: "20", response: "assets/20.jpg" },
  { question: "21", response: "assets/21.jpg" },
  { question: "22", response: "assets/22.jpg" },
];

questionsAndResponses.sort(() => Math.random() - 0.5);

for (let i = 0; i < questionsAndResponses.length; i++) {
  let scene = document.createElement("div");
  scene.classList.add("scene");

  let card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = questionsAndResponses[i].response;

  let cardFront = document.createElement("div");
  cardFront.classList.add("card-content", "card-front");
  // cardFront.textContent = questionsAndResponses[i].question;

  let cardBack = document.createElement("div");
  cardBack.classList.add("card-content", "card-back");
  // cardBack.textContent = questionsAndResponses[i].response;
  cardBack.style.background = `url(${questionsAndResponses[i].response})`;

  card.appendChild(cardFront);
  card.appendChild(cardBack);

  scene.appendChild(card);
  container.appendChild(scene);

  card.addEventListener("click", () => flipCard(card));
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function flipCard(card) {
  if (lockBoard) return;
  if (card === firstCard) return;

  card.classList.add("is-flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.value === secondCard.dataset.value;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", () => flipCard(firstCard));
  secondCard.removeEventListener("click", () => flipCard(secondCard));

  lockBoard = true;
  document.body.classList.add("no-click");

  firstCard.classList.add("highlight");
  secondCard.classList.add("highlight");

  setTimeout(() => {
    firstCard.classList.remove("highlight");
    secondCard.classList.remove("highlight");
  }, 1500);

  setTimeout(() => {
    firstCard.classList.add("hidden");
    secondCard.classList.add("hidden");

    resetBoard();
    lockBoard = false;
    console.log("lockBoard:", lockBoard);

    document.body.classList.remove("no-click");
    console.log("body classList:", document.body.classList);
  }, 2000);
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function checkForMatch() {
  let totalPairs = questionsAndResponses.length / 2;
  let isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    pairsFound++;
    disableCards();
    if (pairsFound === totalPairs) {
      alert("Vous avez gagné!");
    }
  } else {
    unflipCards();
  }
}