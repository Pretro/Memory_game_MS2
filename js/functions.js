let gameBoard=document.getElementById('game_board');
let availableVariants = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9] ;
let cards=[];
let cardsX=[];
let countOpen = 0;
let countMatches = 0;
for(let i=0; i<=19; i++){
    cards.push('<div class="card card_back" id="c'+i+'" onclick="play('+i+')"></div>')
    let randomIndex = Math.floor(Math.random() * availableVariants.length ); 
    let selectedVariant =  availableVariants[randomIndex];
    availableVariants.splice(randomIndex,1);
    cardsX.push({index:i,variant:selectedVariant,open:false,found:false})
}
gameBoard.innerHTML=cards.join(''); 

function play(cardNumber){
    let card3=document.getElementById('c'+ cardNumber);
    if (cardsX[cardNumber].found || countOpen === 2){
        return;
    }
    if(cardsX[cardNumber].open){
        flipCardDown(cardNumber, card3);
    } else {
        flipCardUp(cardNumber,card3);
        if (countOpen === 2){
            let selectedCards = cardsX.filter(c=>c.open && !c.found);
            if (selectedCards[0].variant === selectedCards[1].variant){
                card3.classList.add("card_match");
                countMatches++;
                selectedCards[0].found=true;
                selectedCards[1].found=true;
                countOpen = 0;
            } else{
                console.log('Not Matched',selectedCards);
                setTimeout( ()=> {
                    flipCardDown(selectedCards[0].index, document.getElementById('c'+ selectedCards[0].index));
                    flipCardDown(selectedCards[1].index, document.getElementById('c'+ selectedCards[1].index));
                },500)
            }
        }
    }

    function flipCardDown(cardNumber, card3){
        card3.classList.remove("card_front"+cardsX[cardNumber].variant);
        card3.classList.add("card_back");
        cardsX[cardNumber].open = false;
        countOpen--;
    }

    function flipCardUp(cardNumber,card3){
        card3.classList.remove("card_back");
        card3.classList.add("card_front"+cardsX[cardNumber].variant);
        cardsX[cardNumber].open = true;
        countOpen++;    
    }
    
    console.log("play",cardNumber);
}