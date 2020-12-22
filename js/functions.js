let gameBoard=document.getElementById('game_board');
let gameTime;
let cards=[];
let countOpen = 0;
let countClick = 0;
let countMatches = 0;

function createGame(){
    gameTime = new Date();
    cards=[];
    countOpen = 0;
    countClick = 0;
    countMatches = 0;
    let availableVariants = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];

    for(let i=0; i<=19; i++){
        let randomIndex = Math.floor(Math.random() * availableVariants.length ); 
        let selectedVariant =  availableVariants[randomIndex];
        availableVariants.splice(randomIndex,1);
        cards.push({index:i,variant:selectedVariant,open:false,found:false})
    }
    gameBoard.innerHTML=cards
        .map(card=>'<div class="card card_back" id="c'+card.index+'" onclick="play('+card.index+')"></div>')
        .join('');    
}

function play(cardNumber){
    countClick++;

    let card3=document.getElementById('c'+ cardNumber);
    if (cards[cardNumber].found || countOpen === 2){
        return;
    }
    if(cards[cardNumber].open){
        flipCardDown(cardNumber, card3);
    } else {
        flipCardUp(cardNumber,card3);
        if (countOpen === 2){
            let selectedCards = cards.filter(c=>c.open && !c.found);
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
                },1000)
            }
        }
    }

    function flipCardDown(cardNumber, card3){
        card3.classList.remove("card_front"+cards[cardNumber].variant);
        card3.classList.add("card_back");
        cards[cardNumber].open = false;
        countOpen--;
    }

    function flipCardUp(cardNumber,card3){
        card3.classList.remove("card_back");
        card3.classList.add("card_front"+cards[cardNumber].variant);
        cards[cardNumber].open = true;
        countOpen++;    
    }
}

function updateScoreBoard(){
    if (!gameTime){
        return;
    }
    let elapsedSeconds = (Date.now() - gameTime.getTime())/1000;
    document.getElementById('game_time').innerHTML = elapsedSeconds;
    document.getElementById('click_counts').innerHTML = countClick;
    document.getElementById('matched_cards').innerHTML = ''+countMatches+'/10';

    if(elapsedSeconds > 60){
        gameTime=undefined;
        document.getElementById('result').innerHTML = 'You looser';
    }
    if(countMatches===10){
        gameTime=undefined;
        document.getElementById('result').innerHTML = 'You are a boring winner';
    }
}

setInterval(updateScoreBoard,100);