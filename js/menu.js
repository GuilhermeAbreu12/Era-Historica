let btnMenuMob = document.querySelector('#btn-menu-mob')
let line1 = document.querySelector('.line-menumob-1')
let line2 = document.querySelector('.line-menumob-2')
let menuMobile = document.querySelector('#menu-mobile')

let body = document.querySelector('body')

function Interruptor(){
    line1.classList.toggle('ativo1')
    line2.classList.toggle('ativo2')
    menuMobile.classList.toggle('abrir')
    
    body.classList.toggle('no-overflow')
}

btnMenuMob.addEventListener('click', Interruptor)
