const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "သင်သည်မည်သည့်သတ္တ၀ါဖြစ်သနည်း",
    answers: [
      { text: "ကျွဲ", correct: false },
      { text: "နွား", correct: false },
      { text: "ဆိတ်", correct: true },
      { text: "၀က်", correct: false },
    ],
  },
  {
    question: "အဘယ့်ကြောင့်ထားခဲ့ခံရသနည်း",
    answers: [
      { text: "နွားဖြစ်လို့", correct: false },
      { text: "ရုပ်ဆိုးလို့", correct: true },
      { text: "၀က်သားမစားလို့", correct: false },
      { text: "အသားမဲလို့", correct: false },
    ],
  },
  {
    question: "‌‌နှလုံးသားလေးနာကျင်ပါကမည်သို့လုပ်မည်နည်း",
    answers: [
      { text: "ငိုပါမည်", correct: false },
      { text: "အိပ်ပါမည်", correct: false },
      { text: "ဆွေးပါမည်", correct: false },
      { text: "ဘုရားရှစ်ခိုးပါမည်", correct: true },
    ],
  },
  {
    question: "ကမ္ဘာကြီးကိုရှာပါ",
    answers: [
      { text: "မမ", correct: false },
      { text: "မမ", correct: false },
      { text: "နွဲ့ဆိုးလေး", correct: true },
      { text: "မမ", correct: false },
    ],
  },
  {
    question: "သင်သည်ငါးတစ်ကောင်ဖြစ်ပါသလား",
    answers: [
      { text: "ဖြစ်ပါသည်", correct: false },
      { text: "မဖြစ်ပါ", correct: false },
      { text: "ခံစားမိပါသည်", correct: true },
      { text: "ထင်မြင်မိပါသည်", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  resultScreen.classList.remove("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;
  answersContainer.innerHTML = ""; 

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  questionText.textContent = currentQuestion.question;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
