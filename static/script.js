// Este script lida com o evento de clique no botão 'generate-button'
document.getElementById('generate-button').onclick = function() {
  // Captura a entrada do usuário no campo 'text-input'
  var userInput = document.getElementById('text-input').value;

  // Envia a entrada do usuário para o servidor via POST request para a rota '/generate_audio'
  fetch('/generate_audio', {
    method: 'POST', // Método HTTP
    headers: {
      'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
    },
    body: JSON.stringify({ text: userInput }) // Converte os dados do usuário em uma string JSON para o corpo da requisição
  })
  .then(response => response.json()) // Converte a resposta recebida em JSON
  .then(data => {
    // Após receber a resposta, cria um link para baixar o arquivo de áudio automaticamente
    var downloadLink = document.createElement('a');
    downloadLink.href = '/audio/' + data.audio_path; 
    downloadLink.download = data.audio_path; 
    downloadLink.textContent = 'Baixar Áudio'; 
    document.body.appendChild(downloadLink); 
    downloadLink.click(); 
    document.body.removeChild(downloadLink); 
  })
  .catch(err => console.error(err)); 
};
