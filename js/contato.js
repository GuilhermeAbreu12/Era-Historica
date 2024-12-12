let nome = document.getElementById('name')
let email = document.getElementById('email')
let mensagem = document.getElementById('mensagem')
let msg_sucesso = document.querySelector('#mensagem-sucesso')

function Enviar(){
    if (((nome.value != '') && (email.value != '') && (mensagem.value != ''))) {
        msg_sucesso.style.display = 'block'
    }
}