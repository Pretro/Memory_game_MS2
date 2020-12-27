function createGame() {
    return {
        gameTime: new Date(),
        cards: createCards(),
        countOpen: 0,
        countClick: 0,
        countMatches: 0,
        completed: false,
        play: function (cardNumber) {
            if (!this.completed) {
                return;
            }
            this.countClick++;

            if (this.cards[cardNumber].found || this.countOpen === 2) {
                return;
            }
            if (this.cards[cardNumber].open) {
                this.flipCardDown(cardNumber);
            } else {
                this.flipCardUp(cardNumber);
                if (this.countOpen === 2) {
                    let selectedCards = this.cards.filter(c => c.open && !c.found);
                    this.matchCards(selectedCards);
                }
            }
        },
        matchCards: function (selectedCards) {
            if (selectedCards[0].variant === selectedCards[1].variant) {
                this.countMatches++;
                this.countOpen = 0;
                if (this.countMatches===10){
                    this.completed = true;
                }
                selectedCards.forEach(selectedCard => {
                    selectedCard.found = true;
                    if (selectedCard.onMatch) {
                        selectedCard.onMatch(selectedCard)
                    }
                });
            } else {
                console.log('Not Matched', selectedCards);
                setTimeout(() => {
                    selectedCards.forEach(selectedCard => {
                        flipCardDown(selectedCard.index);
                    });
                }, 1000)
            }
        },
        flipCardDown: function (cardNumber) {
            this.cards[cardNumber].open = false;
            this.countOpen--;
            if (this.cards[cardNumber].onFlip) {
                this.cards[cardNumber].onFlip(this.cards[cardNumber]);
            }
        },
        flipCardUp: function (cardNumber) {
            this.cards[cardNumber].open = true;
            this.countOpen++;
            if (this.cards[cardNumber].onFlip) {
                this.cards[cardNumber].onFlip(this.cards[cardNumber]);
            }
        }
    }
}

function createCards() {
    cards = [];
    let availableVariants = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];

    for (let i = 0; i <= 19; i++) {
        let randomIndex = Math.floor(Math.random() * availableVariants.length);
        let selectedVariant = availableVariants[randomIndex];
        availableVariants.splice(randomIndex, 1);
        cards.push({ index: i, variant: selectedVariant, open: false, found: false })
    }
    return cards;
}

function updateScoreBoard() {
    if (!gameTime) {
        return;
    }
    let elapsedSeconds = (Date.now() - gameTime.getTime()) / 1000;
    document.getElementById('game_time').innerHTML = elapsedSeconds;
    document.getElementById('click_counts').innerHTML = countClick;
    document.getElementById('matched_cards').innerHTML = '' + countMatches + '/10';

    if (elapsedSeconds > 60) {
        gameTime = undefined;
        document.getElementById('result').innerHTML = 'You looser';
    }
    if (countMatches === 10) {
        gameTime = undefined;
        document.getElementById('result').innerHTML = 'You are a boring winner';
    }
}

setInterval(updateScoreBoard, 100);