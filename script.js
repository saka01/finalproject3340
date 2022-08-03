const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

var bigImg = document.getElementById("MainImg");
var smImg = document.getElementsByClassName("small-img");

smImg[0].onclick = function() {
    bigImg.src = smImg[0].src;
}
smImg[1].onclick = function() {
    bigImg.src = smImg[1].src;
}
smImg[2].onclick = function() {
    bigImg.src = smImg[2].src;
}
smImg[3].onclick = function() {
    bigImg.src = smImg[3].src;
   }
