const form = document.getElementById('quiz-form');
const resultDiv = document.getElementById('result');
const backButton = document.getElementById('back-button');
const nextButton = document.getElementById('next-button');
const resultButton = document.getElementById('result-button');
const questions = form.querySelectorAll('.question');
const resultMessage = document.getElementById('result-message');
const totalQuestions = questions.length;
let currentQuestionIndex = 0;
let score = 0;

function showQuestion(index) {
  questions.forEach((question, i) => {
    if (i === index) {
      question.style.display = 'block';
    } else {
      question.style.display = 'none';
    }
  });
}

function calculateScore() {
  const inputs = questions[currentQuestionIndex].querySelectorAll('input[type="radio"]:checked');
  inputs.forEach(input => {
    score += parseInt(input.value);
    localStorage.setItem('quizScore', score);
  });
}

function redirectToResults() {
  window.location.href = 'results.html';
}

function goToNextQuestion() {
  calculateScore();
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    showQuestion(currentQuestionIndex);
  } else {
    resultButton.style.display = 'block';
    backButton.style.display = 'none';
    nextButton.style.display = 'none';
  }
}

function goToPreviousQuestion() {
  calculateScore();
  currentQuestionIndex--;
  if (currentQuestionIndex >= 0) {
    showQuestion(currentQuestionIndex);
  }
}


nextButton.addEventListener('click', goToNextQuestion);
backButton.addEventListener('click', goToPreviousQuestion);
resultButton.addEventListener('click', () => {
  // Redirecionar para a página de resultados na mesma aba
  window.location.href = 'result.html';
});

// Initialize by showing the first question
showQuestion(currentQuestionIndex);
