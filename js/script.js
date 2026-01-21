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

function exibirFilmes(filmes) {
    listaFilmes.innerHTML = ''; 

    filmes.forEach(filme => {
        const card = document.createElement('div');
        card.classList.add('movie-card');

        // Note que usamos a crase ` para envolver tudo
        // E usamos onclick="verDetalhes('${filme.imdbID}')" com aspas simples dentro das duplas
        card.innerHTML = `
            <img src="${filme.Poster !== 'N/A' ? filme.Poster : 'https://via.placeholder.com/300x450?text=Sem+Foto'}" alt="${filme.Title}">
            <h3>${filme.Title}</h3>
            <p>Ano: ${filme.Year}</p>
        `;

        // Em vez de colocar o onclick no HTML, vamos adicionar via JavaScript que é mais seguro:
        card.addEventListener('click', () => {
            verDetalhes(filme.imdbID);
        });

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
const modal = document.getElementById('modal-container');
const fecharModal = document.getElementById('fechar-modal');
const detalhesFilme = document.getElementById('detalhes-filme');

// Função para buscar detalhes específicos de UM filme
async function verDetalhes(id) {
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
    const resposta = await fetch(url);
    const filme = await resposta.json();

    // Montando o conteúdo do Modal
    detalhesFilme.innerHTML = `
        <div class="detalhes-layout">
            <img src="${filme.Poster}" alt="${filme.Title}">
            <div>
                <h2>${filme.Title}</h2>
                <p><strong>Sinopse:</strong> ${filme.Plot}</p>
                <p><strong>Diretor:</strong> ${filme.Director}</p>
                <p><strong>Nota IMDB:</strong> ⭐ ${filme.imdbRating}</p>
            </div>
        </div>
    `;

    // Mostra o modal
    modal.classList.remove('modal-hidden');
}

// Fechar o modal ao clicar no X
fecharModal.addEventListener('click', () => {
    modal.classList.add('modal-hidden');
});

// Fechar o modal se clicar fora da caixa
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('modal-hidden');
});