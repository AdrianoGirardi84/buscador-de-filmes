// Substitua o texto entre aspas pela chave que você recebeu no e-mail
const apiKey = 'b8747b52'; 

const botao = document.getElementById('btn-buscar');
const listaFilmes = document.getElementById('lista-filmes');
const inputFilme = document.getElementById('input-filme');

// Função que busca o filme na API
async function buscarFilme() {
    const nomeFilme = inputFilme.value;
    
    // Se o campo estiver vazio, não faz nada
    if (nomeFilme === '') {
        alert('Por favor, digite o nome de um filme');
        return;
    }

    // O "fetch" é como o seu site fazendo uma ligação para a API
    const url = `https://www.omdbapi.com/?s=${nomeFilme}&apikey=${apiKey}`;
    
    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (dados.Response === 'True') {
        exibirFilmes(dados.Search);
    } else {
        listaFilmes.innerHTML = '<p>Filme não encontrado! 😕</p>';
    }
}

// Função que limpa a tela e mostra os novos filmes
function exibirFilmes(filmes) {
    listaFilmes.innerHTML = ''; // Limpa a busca anterior

    filmes.forEach(filme => {
        const card = document.createElement('div');
        card.classList.add('movie-card');

        card.innerHTML = `
            <img src="${filme.Poster !== 'N/A' ? filme.Poster : 'https://via.placeholder.com/300x450?text=Sem+Foto'}" alt="${filme.Title}">
            <h3>${filme.Title}</h3>
            <p>Ano: ${filme.Year}</p>
        `;

        listaFilmes.appendChild(card);
    });
}

// Escutar o clique do botão
botao.addEventListener('click', buscarFilme);
// Fazer a busca ao apertar a tecla "Enter" no teclado
inputFilme.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarFilme();
    }
});

// Vamos modificar um detalhe dentro da função buscarFilme que já temos:
// No final da função buscarFilme (antes de fechar a última chave), adicione:
// inputFilme.value = '';