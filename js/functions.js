let gameBoard=document.getElementById('game_board');

let cards=[];
for(let i=0; i<=19; i++){
    cards.push('<div class="card card_back" id="c'+i+'" onclick="play('+i+')"></div>')
}
gameBoard.innerHTML=cards.join(''); 

let card3=document.getElementById('c3');
card3.classList.remove("card_back");
card3.classList.add("card_front2");

function play(cardNumber){
    console.log("play",cardNumber);
} 