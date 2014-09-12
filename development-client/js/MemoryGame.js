/* global Deck, Card, EventCaller, document, window */
(function (exports) {

    function MemoryGame(gameTable, debug) {
        this.table = gameTable;
        this.deck = new Deck();
        this.MemoryItems = ['!', '@', '#', '$', '%', '&', '*', '+', '=', '?'];
        this.FaceUpCards = [];
        this.debug = debug || false;
        this.showTime = (debug) ? 0 : 1500;

        for (var i = 0; i < this.MemoryItems.length; i++) {
            this.deck.GameCards.push(new Card(this.MemoryItems[i], document.createElement('div')));
            this.deck.GameCards.push(new Card(this.MemoryItems[i], document.createElement('div')));
        }

        Object.defineProperty(this, "gameCards", {
            get: function () {
                return this.deck.GameCards;
            }
        });

    }

    function checkCards(showingCards, game) {

        if (showingCards.length === 2) {
            if (showingCards[0].FaceValue === showingCards[1].FaceValue) {
                game.emit('match', showingCards[1].FaceValue);
                setTimeout(function () {

                    showingCards[0].discard();
                    showingCards[1].discard();
                    showingCards.pop();
                    showingCards.pop();

                    if (!game.table.children.length) {
                        game.emit('end');
                    }

                }, game.showTime);
            }
            else {
                setTimeout(function () {
                    showingCards[0].flip();
                    showingCards[1].flip();
                    showingCards.pop();
                    showingCards.pop();
                }, game.showTime);
            }
        }
    }

    MemoryGame.prototype = new EventCaller();

    MemoryGame.prototype.deal = function (done) {
        var game = this;

        this.gameCards.forEach(function (card) {
            if (card.faceUp) {
                card.flip();
            }
        });

        if (!this.debug) {
            this.deck.shuffle();
        }

        this.gameCards.forEach(function (gameCard) {
            gameCard.cardElement.onclick = function () {
                if (game.FaceUpCards.length < 2) {

                    if (gameCard !== game.FaceUpCards[0]) {
                        gameCard.flip();
                        game.FaceUpCards.push(gameCard);
                        checkCards(game.FaceUpCards, game);
                    }
                }
            };
            game.table.appendChild(gameCard.cardElement);
        });

        this.emit('deal', this.table, this.debug);
        if (done) {
            done(this.table);
        }

    };

    exports.MemoryGame = MemoryGame;

})(window);
