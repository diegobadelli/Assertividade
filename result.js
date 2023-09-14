// Get score from localStorage 
const score = localStorage.getItem('quizScore');
const resetButton = document.getElementById('reset-button'); // Botão de reiniciar

// Map score to result text
let level;
let message;
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

// Get result element
const result = document.querySelector('#result-message');

function resetForm() {

    // Reset form logic

    window.location.href = 'index.html';

}

resetButton.addEventListener('click', resetForm); // Adicionar evento para o botão de reiniciar

// Build result view 
result.innerHTML = `
  <h2>Nível de Assertividade</h2>
  <p>${level}</p>
  <p class="result-text">${message}</p>
  <p>Total de Pontos: ${score}</p>
`;