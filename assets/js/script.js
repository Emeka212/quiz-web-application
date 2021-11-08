//=============================================
// ASSIGNING ALL SECTION (REQUIMENT) TO A VAR
//=============================================

// first section
const firstSection = document.querySelector(".first-section");
const firstSectionBtn = document.querySelector(".first-section button");
// second section
const secondSection = document.querySelector(".second-section");
const secondSectionExitBtn = document.querySelector(".second-section .exit");
const secondSectionContinueBtn = document.querySelector(
  ".second-section .continue"
);
// third section
const thirdSection = document.querySelector(".third-section");
// forth section
const fourthSection = document.querySelector(".fourth-section");
const fourthSectionReplayBtn = document.querySelector(
  ".fourth-section .replay"
);
const fourthSectionQuitBtn = document.querySelector(".fourth-section .quit");

//=============================================
// ONCLICK EVENT TO MOVE FRONT OR BACK
//=============================================
firstSectionBtn.onclick = () => {
  firstSection.classList.add("display-none");
  secondSection.classList.add("display-flex");
};
secondSectionExitBtn.onclick = () => {
  firstSection.classList.remove("display-none");
  secondSection.classList.remove("display-flex");
};
secondSectionContinueBtn.onclick = () => {
  secondSection.classList.remove("display-flex");
  thirdSection.classList.add("display-flex");
  [start(), runInterval(), pickAnswer()];
};
fourthSectionReplayBtn.onclick = () => {
  fourthSection.classList.remove("display-flex");
  thirdSection.classList.add("display-flex");
  replay();
};
fourthSectionQuitBtn.onclick = () => {
  fourthSection.classList.remove("display-flex");
  firstSection.classList.remove("display-none");
  quit();
};

//=============================================
// DISPLAYING THE NUMBER OF QUESTION AVAILABLE
//=============================================
const numOfQue = document.querySelector(".third-section .bottom .numOfQue");
const timeLeft = document.querySelector(".third-section .top .timeLeft");
const Que = document.querySelector(".third-section .middle .conn");
const progressBar = document.querySelector(".third-section .top .progress-bar");
const optionConn = document.querySelector(".third-section .option-conn");
const numOutOf = document.querySelector(".third-section .bottom .numOutOf");
const numOfQue1 = document.querySelector(".fourth-section .numOfQue");
const scoreDiv = document.querySelector(".fourth-section .popup-conn .score");

//=============================================
// ASSINGING ALL THE REQUIRMENT WE NEED FOR THE QUIZ
// BOTH THE NUM THAT WILL INCREEMENT
//=============================================
let timmer = 19;
let counter = -1;
let score = 0;
let progressBarNum = 0;
let allow = true;

//=============================================
// THIS IS THE BTN THAT MOVE TO THE NXT QUESTION
//=============================================
const nxtBtn = document.querySelector(".third-section .bottom .nxtQue");
nxtBtn.onclick = () => {
  if (nxtBtn.innerText == "Finish") {
    scoreDiv.innerText = score;
    thirdSection.classList.remove("display-flex");
    fourthSection.classList.add("display-flex");
  } else {
    [start(), continues(), pickAnswer(), checkQueEnd()];
  }
};

//===========================================
// THIS EXECUTE SO THAT THE TIMMER AND PROGRESS BAR CAN START
// ALL OVER AGAIN ANY TIME A NEW QUESTION IS BEING DISPLAYED
//============================================
function continues() {
  runInterval();
}

//=============================================
// THIS INCREEMENT THE SCORE ONLY WHEN A USER GET IT RIGHT
//=============================================
function theScore() {
  score++;
}

//=============================================
// THIS INCREASE AND DECREASES THE PROGRESS BAR AND TIMMER
//=============================================
let runIntervals = null;
function runInterval() {
  timeLeft.innerHTML = 20;
  runIntervals = setInterval(() => {
    progressBar.style.width = `${(progressBarNum += 5)}%`;
    timeLeft.innerHTML = timmer >= 10 ? timmer-- : "0" + timmer--;
    timmer == -1 ? automateAnswer() : "";
  }, 1000);
}

//=============================================
// THIS MAKE THE QUIZ TO START
//=============================================
function start() {
  counter++;
  Que.innerHTML = `${counter + 1}. ${questions[counter]}`;
  optionConn.innerHTML = "";
  for (let i = 0; i < questionOptions[counter].length; i++) {
    const element = questionOptions[counter][i];
    optionConn.innerHTML += `
    <li>
      <span>${element}</span>
      <b></b>
    </li>`;
  }
  numOutOf.innerHTML = counter + 1;
  nxtBtn.classList.remove("display-block");
}

//=============================================
// THIS EXECUTE BASE ON WHAT THE USER PICK AT THE END OF THE QUIZ
//=============================================
function replay() {
  counter = -1;
  score = 0;
  nxtBtn.innerText = "Next Que";
  allow = true;
  [start(), runInterval(), pickAnswer()];
}
function quit() {
  counter = -1;
  score = 0;
  allow = true;
  nxtBtn.innerText = "Next Que";
}

//=============================================
// THIS ENABLE THE USER TO PICK AN ANSWER
//=============================================
function pickAnswer() {
  const options = document.querySelectorAll(".third-section .middle li");
  for (let i = 0; i < options.length; i++) {
    const element = options[i];
    element.onclick = function () {
      if (allow == true) {
        clearInterval(runIntervals);
        timmer = 19;
        progressBarNum = 0;
        nxtBtn.classList.add("display-block");
        let li = this;
        execute(li);
        allow = false;
      }
    };
  }
}

//=============================================
// DISPLAYING THE NUMBER OF QUESTION AVAILABLE
//=============================================
for (let i = 0; i < questions.length + 1; i++) {
  const element = questions[i];
  numOfQue.innerHTML = i;
  numOfQue1.innerHTML = i;
}

//=============================================
// THIS WILL CHECK IF IT'S THE LAST QUESTION
//=============================================
function checkQueEnd() {
  allow = true;
  if (numOutOf.innerText == numOfQue.innerText) {
    nxtBtn.innerText = "Finish";
  }
}

//=============================================
// THIS WILL INDICATE RIGHT OR WRONG ANSWER
//=============================================
function execute(li) {
  let type = "";
  li.innerText == questionAnswers[counter]
    ? [(type = "right"), theScore()]
    : [(type = "wrong"), automateAnswer()];

  li.classList.add(type);
  const thisLi = document.querySelector(`.third-section .${li.className} b`);
  thisLi.innerText = type == "right" ? "Right" : "Wrong";
}

//=============================================
// THIS WILL ALLOW COMPUTER TO PICK THE RIGHT ANSWER
//=============================================
function automateAnswer() {
  const options = document.querySelectorAll(".third-section .middle li");
  clearInterval(runIntervals);
  allow = false;
  timmer = 19;
  progressBarNum = 0;
  nxtBtn.classList.add("display-block");
  for (let i = 0; i < options.length; i++) {
    const element = options[i];
    if (element.innerText == questionAnswers[counter]) {
      element.classList.add("right");
      document.querySelector(
        `.third-section .${element.className} b`
      ).innerText = "Right";
    }
  }
}
