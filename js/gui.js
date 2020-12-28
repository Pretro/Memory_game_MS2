let gameBoard = document.getElementById('game_board');
let scoreBoardTime = document.getElementById('game_time');
let scoreBoardCounts = document.getElementById('click_counts');
let scoreBoardCards = document.getElementById('matched_cards');
let game;
let updateScoreBoardReference;

function startGameClick() {
    if (game) {
        return;
    }
    game = createGame(onFlip, onMatch, onTimeout, onWin);
    game.start();
    gameBoard.innerHTML = createGameBoard(game.cards);
    updateScoreBoardReference = setInterval(updateScoreBoard, 100);
}

function createGameBoard(cards) {
    return cards.map(card => '<div class="card card_back" id="c' + card.index + '" onclick="play(' + card.index + ')"></div>')
        .join('');
}

function updateScoreBoard() {
    let elapsedSeconds = Math.ceil((Date.now() - game.gameTime.getTime()) / 1000);
    scoreBoardTime.innerHTML = 60 - elapsedSeconds;
    scoreBoardCounts.innerHTML = game.countClick;
    scoreBoardCards.innerHTML = '' + game.countMatches + '/10';
}

function onFlip(card) {
    let playedCard = document.getElementById('c' + card.index);
    if (card.open) {
        playedCard.classList.remove("card_back");
        playedCard.classList.add("card_front" + card.variant);
    } else {
        playedCard.classList.remove("card_front" + card.variant);
        playedCard.classList.add("card_back");
    }
}

function onMatch(card) {
    let playedCard = document.getElementById('c' + card.index);
    playedCard.classList.add("card_match");
}

function onTimeout() {
    clearInterval(updateScoreBoardReference);
    updateScoreBoard();
    game = undefined;
    document.getElementById('result').innerHTML = 'You looser';
}

function onWin() {
    clearInterval(updateScoreBoardReference);
    updateScoreBoard();
    game = undefined;
    document.getElementById('result').innerHTML = 'You are a boring winner';
}

function play(cardNumber) {
    if (!game) {
        return;
    }
    game.play(cardNumber);
}


