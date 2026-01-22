const apiKey = 'b8747b52';

const btnBuscar = document.getElementById('btn-buscar');
const inputFilme = document.getElementById('input-filme');
const filtroTipo = document.getElementById('filtro-tipo');
const listaFilmes = document.getElementById('lista-filmes');
const loader = document.getElementById('loader');
const modal = document.getElementById('modal-container');
const detalhesFilme = document.getElementById('detalhes-filme');
const fecharModal = document.getElementById('fechar-modal');

async function buscarFilme() {
    const termo = inputFilme.value;
    const tipo = filtroTipo.value;
    if (!termo) return alert("Digite um nome!");

    loader.style.display = 'block';
    listaFilmes.innerHTML = '';

    try {
        const url = `https://www.omdbapi.com/?s=${termo}&type=${tipo}&apikey=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();
        loader.style.display = 'none';

        if (data.Response === "True") {
            exibirFilmes(data.Search, listaFilmes);
        } else {
            listaFilmes.innerHTML = `<p>Filme não encontrado. 😕</p>`;
        }
    } catch (e) { console.error(e); loader.style.display = 'none'; }
}

function exibirFilmes(filmes, container) {
    container.innerHTML = '';
    filmes.forEach(filme => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
            <img src="${filme.Poster !== 'N/A' ? filme.Poster : 'https://via.placeholder.com/300x450'}" alt="${filme.Title}">
            <h3>${filme.Title}</h3>
            <p>${filme.Year}</p>
        `;
        card.onclick = () => verDetalhes(filme.imdbID);
        container.appendChild(card);
    });
}

async function verDetalhes(id) {
    const url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${apiKey}`;
    const res = await fetch(url);
    const filme = await res.json();

    detalhesFilme.innerHTML = `
        <div class="detalhes-layout">
            <img src="${filme.Poster}" alt="${filme.Title}">
            <div class="info-texto">
                <h2>${filme.Title}</h2>
                <p><strong>Sinopse:</strong> ${filme.Plot}</p>
                <p><strong>Nota:</strong> ⭐ ${filme.imdbRating}</p>
                <button class="btn-favorito" onclick="salvarFavorito('${filme.imdbID}', '${filme.Title.replace(/'/g, "\\'")}', '${filme.Poster}')">Favoritar ❤️</button>
            </div>
        </div>
    `;
    modal.classList.remove('modal-hidden');
}

function salvarFavorito(id, titulo, poster) {
    let favoritos = JSON.parse(localStorage.getItem('meusFavoritos')) || [];
    if (!favoritos.find(f => f.imdbID === id)) {
        favoritos.push({ imdbID: id, Title: titulo, Poster: poster });
        localStorage.setItem('meusFavoritos', JSON.stringify(favoritos));
        carregarFavoritos();
    }
}

function carregarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('meusFavoritos')) || [];
    const listaFav = document.getElementById('lista-favoritos');
    const secaoFav = document.getElementById('secao-favoritos');

    if (favoritos.length > 0) {
        secaoFav.classList.remove('modal-hidden');
        listaFav.innerHTML = '';
        favoritos.forEach(f => {
            const card = document.createElement('div');
            card.classList.add('movie-card');
            card.innerHTML = `
                <img src="${f.Poster}">
                <h3>${f.Title}</h3>
                <button onclick="removerFavorito(event, '${f.imdbID}')" style="color:red; background:none; border:none; cursor:pointer; padding:10px;">Remover 🗑️</button>
            `;
            card.onclick = () => verDetalhes(f.imdbID);
            listaFav.appendChild(card);
        });
    } else { secaoFav.classList.add('modal-hidden'); }
}

function removerFavorito(event, id) {
    event.stopPropagation();
    let favoritos = JSON.parse(localStorage.getItem('meusFavoritos')) || [];
    favoritos = favoritos.filter(f => f.imdbID !== id);
    localStorage.setItem('meusFavoritos', JSON.stringify(favoritos));
    carregarFavoritos();
}

btnBuscar.onclick = buscarFilme;
fecharModal.onclick = () => modal.classList.add('modal-hidden');
window.onclick = (e) => { if (e.target == modal) modal.classList.add('modal-hidden'); };
window.onload = carregarFavoritos;