let gameBoard = document.getElementById('game_board');
let game;
function onStartGameClick() {
    if (game) {
        return;
    }
    game = createGame();
    game.cards.forEach(card => {
        card.onFlip = function (card) {
            let playedCard = document.getElementById('c' + card.index);
            if (card.open) {
                playedCard.classList.remove("card_front" + card.variant);
                playedCard.classList.add("card_back");
            } else {
                playedCard.classList.remove("card_back");
                playedCard.classList.add("card_front" + card.variant);
            }
        }
        card.onMatch = function (card) {
            let playedCard = document.getElementById('c' + card.index);
            playedCard.classList.add("card_match");
        }
    });
    gameBoard.innerHTML = game.cards
        .map(card => '<div class="card card_back" id="c' + card.index + '" onclick="play(' + card.index + ')"></div>')
        .join('');

}

function play(cardNumber) {
    if (!game) {
        return;
    }
    game.play(cardNumber);
}