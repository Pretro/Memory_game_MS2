function createGame(onFlip, onMatch, onTimeout, onWin) {
    return {
        gameTime: undefined,
        cards: createCards(),
        countOpen: 0,
        countClick: 0,
        countMatches: 0,
        completed: false,
        gameTimeReference: undefined,
        start: function () {
            this.gameTime = new Date();
            this.gameTimeReference = setTimeout(() => this.timeout(), 60000);
        },
        timeout: function () {
            this.completed = true;
            clearTimeout(this.gameTimeReference);
            onTimeout();
        },
        win: function () {
            this.completed = true;
            clearTimeout(this.gameTimeReference);
            onWin();
        },
        play: function (cardNumber) {
            if (this.completed) {
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
                selectedCards.forEach(selectedCard => {
                    selectedCard.found = true;
                    onMatch(selectedCard);
                });
                if (this.countMatches === 10) {
                    this.win();
                }
            } else {
                setTimeout(() => {
                    selectedCards.forEach(selectedCard => {
                        this.flipCardDown(selectedCard.index);
                    });
                }, 1000)
            }
        },
        flipCardDown: function (cardNumber) {
            this.cards[cardNumber].open = false;
            this.countOpen--;
            onFlip(this.cards[cardNumber]);
        },
        flipCardUp: function (cardNumber) {
            this.cards[cardNumber].open = true;
            this.countOpen++;
            onFlip(this.cards[cardNumber]);
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

