let recentPosts = [
    {
        'nome': 'Top 10 fatos sobre Napoleão Bonaparte',
        'data': '1 Setembro 2024',
        'img': '../imgs/post8.webp',
        'descricao': 'Um dos maiores líderes militares que esse mundo foi capaz de experimentar, hoje vamos falar sobre o francês Napoleão Bonaparte',
        'link': 'post.html?id=0'
    },
    {
        'nome': 'Top 10 fatos sobre Júlio César',
        'data': '30 Agosto 2024',
        'img': '../imgs/post9.webp',
        'descricao': 'O líder romano mais famoso, bom moço para uns, ditador para outros, conheça a história do maior imperador romano de todos os tempos, a história de Júlio César',
        'link': 'post.html?id=1'
    },
    {
        'nome': 'Top 10 fatos sobre as Pirâmides do Egito',
        'data': '3 Julho 2024',
        'img': '../imgs/post5.webp',
        'descricao': 'Uma das 7 maravilhas do mundo antigo, cartão de visita para os turistas do Egito, suposta prova de vida extra-terrestre, conheça 10 fatos curiosos sobre essas obras de arte',
        'link': 'post.html?id=2'
    },
    {
        'nome': 'Top 10 fatos sobre Alexandre o Grande',
        'data': '1 Julho 2024',
        'img': '../imgs/post7.webp',
        'descricao': 'Um líder nato e conquistador revolucionário, o homem que mudou para sempre a cultura europeia e formou a base do que hoje conhecemos como cultura ocidental',
        'link': 'post.html?id=3'
    }
];

let cardPost = document.getElementById('blog-content');
let postsPerPage = 3;
let currentIndex = 0;

// Função para mostrar mais posts
function showPosts() {
    let content = '';

    let nextPosts = recentPosts.slice(currentIndex, currentIndex + postsPerPage);

    nextPosts.forEach((post, index) => {
        content += `
        <div class="blog-item">
            <div class="blog-img">
                <img src="${post.img}" alt="${post.nome}">
            </div>
            <div class="blog-text">
                <span>${post.data}</span>
                <h2>${post.nome}</h2>
                <p>${post.descricao}</p>
                <a href="${post.link}"><button class="button">Acessar</button></a>
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
                <img src="${post.img}" alt="${post.nome}">
            </div>
            <div class="blog-text">
                <span>${post.data}</span>
                <h2>${post.nome}</h2>
                <p>${post.descricao}</p>
                <a href="${post.link}"><button class="button">Acessar</button></a>
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
