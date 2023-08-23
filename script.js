const form = document.getElementById('quiz-form');
const resultDiv = document.getElementById('result');
const backButton = document.getElementById('back-button');
const nextButton = document.getElementById('next-button');
const resultButton = document.getElementById('result-button');
const questions = form.querySelectorAll('.question');
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
  });
}

function showResult() {
  let level = '';
  let message = '';

  if (score <= 36) {
    level = 'Baixa assertividade';
    message = 'Você está usando o comportamento defensivo com muita intensidade. Isso quer dizer que, diante das diversas situações do cotidiano, você tem escolhido a passividade ou agressividade para se relacionar com as pessoas. Essas escolhas devem estar propiciando conflitos no seu dia a dia, impedindo-o de ser feliz e de equilibrar sua autoestima. Alerta!';
  } else if (score <= 72) {
    level = 'Média assertividade';
    message = 'É provável que nas situações mais difíceis, nas quais se sente ameaçado, você está se armando e se defendendo com passividade ou agressividade. Em situações menos ameaçadoras, você tem conseguido ser assertivo.';
  } else if (score <= 85) {
    level = 'Boa assertividade';
    message = 'Na maioria das vezes, você tem se afirmado positivamente. Porém, fique atento às situações que lhe causam desconforto. Perceba se não está perdendo em algumas situações, principalmente naquelas com pontuação menor que 3.';
  } else {
    level = 'Excelente assertividade';
    message = 'Na sua percepção, você negocia bem os seus direitos e respeita os dos outros, comunica-se com eficácia e tem cuidado de sua autoestima.';
  }

  resultDiv.innerHTML = `<h2>Nível de Assertividade: ${level}</h2><p>${message}</p><p>Total de Pontos: ${score}</p>`;
  resultDiv.style.display = 'block';
  resultButton.style.display = 'none';
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
resultButton.addEventListener('click', showResult);

// Initialize by showing the first question
showQuestion(currentQuestionIndex);
