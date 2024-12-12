const searchWrapper = document.querySelector('.search');
const inputBox = searchWrapper.querySelector('input');
const sugestBox = searchWrapper.querySelector('.list');
const icon = searchWrapper.querySelector('.icon');
let linkTag = searchWrapper.querySelector('a');
let webLink;

// Função para ocultar sugestões
function HideSuggestions() {
    searchWrapper.classList.remove('active');
    currentIndex = -1;
    sugestBox.innerHTML = ''; // Limpa as sugestões
}

inputBox.onkeyup = (e) => {
    let userData = e.target.value.trim(); // Remove espaços extras
    let emptyArray = [];

    if (e.key === 'Enter' && userData) {
        // Verifica se há uma URL correspondente no mapa de redirecionamento
        if (redirecionamentos[userData]) {
            // Redireciona para a URL específica
            window.location.href = redirecionamentos[userData];
        } else {
            // Se não houver, pesquisa no Google
            window.open(`https://www.google.com/search?q=${userData}`, '_blank');
        }
    }

    if (userData) {
        icon.onclick = () => {
            if (redirecionamentos[userData]) {
                window.location.href = redirecionamentos[userData];
            } else {
                webLink = `https://www.google.com/search?q=${userData}`;
                linkTag.setAttribute('href', webLink);
                linkTag.click();
            }
        };

        // Filtra sugestões
        emptyArray = sugestoes.filter((data) => {
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });

        // Exibe as sugestões
        emptyArray = emptyArray.map((data) => {
            return `<li>${data}</li>`;
        });

        searchWrapper.classList.add('active');
        ShowSuggestions(emptyArray);

        let allList = sugestBox.querySelectorAll('li');
        if (allList.length === 0) return;
        for (let i = 0; i < allList.length; i++) {
            allList[i].setAttribute('onclick', 'select(this)');
        }
    } else {
        HideSuggestions();
    }
};

inputBox.onkeydown = (e) => {
    const allList = sugestBox.querySelectorAll('li');

    if (e.key === 'ArrowDown') {
        // Navegar para baixo
        currentIndex = (currentIndex - 1) % allList.length;
        updateActiveSuggestion(allList);
    } else if (e.key === 'ArrowUp') {
        // Navegar para cima
        currentIndex = (currentIndex + 1 + allList.length) % allList.length;
        updateActiveSuggestion(allList);
    } else if (e.key === 'Enter' && currentIndex >= 0) {
        // Selecionar sugestão ativa
        e.preventDefault(); // Evita comportamento padrão de envio de formulário
        allList[currentIndex].click();
    } else if (e.key === 'Escape') {
        // Fechar sugestões
        searchWrapper.classList.remove('active');
        currentIndex = -1;
    }
};
inputBox.addEventListener('keydown', (e) => {
    const allList = sugestBox.querySelectorAll('li');

    if (e.key === 'ArrowDown') {
        // Navegar para baixo
        navigateSuggestions(allList, -1); // 1 para mover para baixo
    } else if (e.key === 'ArrowUp') {
        // Navegar para cima
        navigateSuggestions(allList, 1); // -1 para mover para cima
    } else if (e.key === 'Enter' && currentIndex >= 0) {
        // Selecionar sugestão ativa
        e.preventDefault(); // Prevenir comportamento padrão
        allList[currentIndex]?.click(); // Garante que o item existe
    }
});

inputBox.addEventListener('keyup', (e) => {
    let userData = e.target.value;
    let emptyArray = [];

    if (e.key === 'Enter' && currentIndex === -1 && userData) {
        // Pesquisar diretamente o texto digitado
        window.open(`https://www.google.com/search?q=${userData}`, '_blank');
    }

    if (userData) {
        icon.onclick = () => {
            webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute('href', webLink);
            linkTag.click();
        };

        // Filtrar sugestões
        emptyArray = sugestoes.filter((data) => {
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });

        // Criar itens da lista de sugestões
        emptyArray = emptyArray.map((data) => {
            return `<li>${data}</li>`;
        });

        ShowSuggestions(emptyArray);

        // Adiciona o evento de clique às sugestões
        let allList = sugestBox.querySelectorAll('li');
        for (let i = 0; i < allList.length; i++) {
            allList[i].setAttribute('onclick', 'select(this)');
        }
    } else {
        HideSuggestions();
    }
});


function handleNavigation(e) {
    const allList = sugestBox.querySelectorAll('li');

    if (e.key === 'ArrowDown') {
        navigateSuggestions(allList, 1); // Navegar para baixo
    } else if (e.key === 'ArrowUp') {
        navigateSuggestions(allList, -1); // Navegar para cima
    } else if (e.key === 'Enter' && currentIndex >= 0) {
        e.preventDefault(); // Prevenir comportamento padrão
        allList[currentIndex]?.click(); // Garante que o item existe
    } else if (e.key === 'Escape') {
        searchWrapper.classList.remove('active'); // Fechar a lista
        currentIndex = -1;
    }
}
function navigateSuggestions(allList, step) {
    if (allList.length === 0) return;

    currentIndex = (currentIndex + step + allList.length) % allList.length;
    updateActiveSuggestion(allList);
}

function updateActiveSuggestion(allList) {
    allList.forEach((item, index) => {
        item.classList.remove('active-suggestion'); // Remover destaque de todos
        if (index === currentIndex) {
            item.classList.add('active-suggestion'); // Adicionar destaque no ativo
        }
    });
}
function select(element) {
    let selectData = element.textContent.trim();
    inputBox.value = selectData;

    if (redirecionamentos[selectData]) {
        window.location.href = redirecionamentos[selectData];
    } else {
        icon.onclick = () => {
            webLink = `https://www.google.com/search?q=${selectData}`;
            linkTag.setAttribute('href', webLink);
            linkTag.click();
        };
    }

    HideSuggestions();
}

// Exibe as sugestões quando o input ganha foco
inputBox.addEventListener('focus', () => {
    if (sugestBox.children.length > 0) {
        searchWrapper.classList.add('active');
    }
});

// Esconde as sugestões quando o input perde o foco
inputBox.addEventListener('blur', () => {
    // Adicione um pequeno atraso para capturar cliques na lista antes de escondê-la
    setTimeout(() => {
        if (!sugestBox.matches(':hover')) {
            HideSuggestions();
        }
    }, 200)
});

// evento `mouseleave` na barra de pesquisa
searchWrapper.addEventListener('mouseleave', () => {
    if (!inputBox.matches(':focus') && !sugestBox.matches(':hover')) {
        HideSuggestions();
    }
});

// Função que exibe sugestões
function ShowSuggestions(list) {

    // Atualiza a visibilidade da lista com base no conteúdo
    if (list.length > 0) {
        searchWrapper.classList.add('active');
        sugestBox.innerHTML = list.join('');
    } else {
        HideSuggestions();
    }
}