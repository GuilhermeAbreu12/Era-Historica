import { recentPosts } from "./bd.js";

let cardPost = document.getElementById('blog-content');
let postsPerPage = 3;
let currentIndex = 0;
let temasContainer = document.querySelector('#temas__container');

// Função para mostrar mais posts
function showPosts() {
    let content = '';

    let nextPosts = recentPosts.slice(currentIndex, currentIndex + postsPerPage);

    nextPosts.forEach((post, index) => {
        content += `
        <div class="blog-item">
            <div class="blog-img">
                <img src="${post.img1}" alt="${post.altText}">
            </div>
            <div class="blog-text">
                <span class="Card-data">${post.data}</span>
                <h2 class="Card-title">${post.titulo}</h2>
                <p class="Card-subtitle">${post.subtitulo}</p>
                <a href="${post.link}" class="button">Acessar</a>
            </div>
        </div>
        `;
    });

    cardPost.innerHTML += content;

    currentIndex += postsPerPage;

    if (currentIndex >= recentPosts.length) {
        document.getElementById('load-more').style.display = 'none';
        document.getElementById('show-all').style.display = 'none'
    }
}

// Função para mostrar todos os posts
function showAllPosts() {
    let content = '';
    recentPosts.forEach((post) => {
        content += `
        <div class="blog-item">
            <div class="blog-img">
                <img src="${post.img1}" alt="${post.altText}">
            </div>
            <div class="blog-text">
                <span class="Card-data">${post.data}</span>
                <h2 class="Card-title">${post.titulo}</h2>
                <p class="Card-subtitle">${post.subtitulo}</p>
                <a href="${post.link}" class="button">Acessar</a>
            </div>
        </div>
        `;
    });

    cardPost.innerHTML = content;

    document.getElementById('load-more').style.display = 'none';
    document.getElementById('show-all').style.display = 'none';
}

// Inicializa a página com os primeiros posts
showPosts();

// Eventos
document.getElementById('load-more').addEventListener('click', showPosts);
document.getElementById('show-all').addEventListener('click', showAllPosts);

// Sessão temática
import { listaTemas } from "./bd.js";
// Iterar a base de dados
let atual = 0;
let conteudo = [];

for (atual in listaTemas){
    conteudo += `
        <div class="temasCard" tabindex="0">
            <div class="temasCard__img">
                <img src="${listaTemas[atual].img}" alt="a">
            </div>
            <div class="temasCard__body">
                <p class="Card-title">${listaTemas[atual].title}</p>
                <p class="Card-subtitle">${listaTemas[atual].subtitle}</p>
                <a href="${listaTemas[atual].link}" class="button">Acessar</a>
            </div>
        </div>
    `
}
// Gerar
temasContainer.innerHTML = conteudo


