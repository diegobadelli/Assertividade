const form = document.getElementById('quiz-form');
const resultDiv = document.getElementById('result');
const backButton = document.getElementById('back-button');
const nextButton = document.getElementById('next-button');
const resultButton = document.getElementById('result-button');
const resetButton = document.getElementById('reset-button'); // Botão de reiniciar
const downloadPDFButton = document.getElementById('download-pdf-button'); // Botão de baixar PDF
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

  if (score <= 25) {
    level = 'Baixa assertividade';
    message = 'Você está usando o comportamento defensivo com muita intensidade. Isso quer dizer que, diante das diversas situações do cotidiano, você tem escolhido a passividade ou agressividade para se relacionar com as pessoas. Essas escolhas devem estar propiciando conflitos no seu dia a dia, impedindo-o de ser feliz e de equilibrar sua autoestima. Alerta!';
  } else if (score <= 50) {
    level = 'Média assertividade';
    message = 'É provável que nas situações mais difíceis, nas quais se sente ameaçado, você está se armando e se defendendo com passividade ou agressividade. Em situações menos ameaçadoras, você tem conseguido ser assertivo.';
  } else if (score <= 75) {
    level = 'Boa assertividade';
    message = 'Na maioria das vezes, você tem se afirmado positivamente. Porém, fique atento às situações que lhe causam desconforto. Perceba se não está perdendo em algumas situações, principalmente naquelas com pontuação menor que 3.';
  } else {
    level = 'Excelente assertividade';
    message = 'Na sua percepção, você negocia bem os seus direitos e respeita os dos outros, comunica-se com eficácia e tem cuidado de sua autoestima.';
  }

  resultDiv.innerHTML = `<h2>Nível de Assertividade: ${level}</h2><p>${message}</p><p>Total de Pontos: ${score}</p>`;
  resultDiv.style.display = 'block';
  resultButton.style.display = 'block';
  resetButton.style.display = 'block'; // Mostrar o botão de reiniciar
  downloadPDFButton.style.display = 'block'; // Mostrar o botão de baixar PDF
}

function generatePDF() {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('Quiz de Assertividade - Respostas', 10, 10);

  let yOffset = 30;
  questions.forEach((question, index) => {
    const questionText = question.querySelector('p').innerText;
    const selectedAnswer = Array.from(question.querySelectorAll('input[type="radio"]:checked')).map(input => input.parentNode.innerText).join('\n');
    const questionScore = selectedAnswer.split(': ')[1];
    doc.text(`Pergunta ${index + 1}: ${questionText}`, 10, yOffset);
    doc.text(`Resposta: ${selectedAnswer}`, 10, yOffset + 10);
    doc.text(`Pontuação: ${questionScore}`, 10, yOffset + 20);
    yOffset += 40;
  });

  doc.save('quiz_result.pdf');
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

function resetForm() {

  // Reset form logic

  window.location.href = 'index.html';

}

nextButton.addEventListener('click', goToNextQuestion);
backButton.addEventListener('click', goToPreviousQuestion);
resultButton.addEventListener('click', showResult);
resetButton.addEventListener('click', resetForm); // Adicionar evento para o botão de reiniciar
downloadPDFButton.addEventListener('click', generatePDF); // Adicionar evento para o botão de baixar PDF

// Initialize by showing the first question
showQuestion(currentQuestionIndex);
