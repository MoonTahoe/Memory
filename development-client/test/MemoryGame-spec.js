/* global document, MemoryGame, jasmine */
describe("Memory Game", function () {

    describe("Starting the Game", function () {

        beforeEach(function () {
            this.section = document.createElement('section');
            this.game = new MemoryGame(this.section);
        });

        afterEach(function () {
            this.game.remove('deal');
            this.game = null;
        });

        it("should be able to create a new game", function () {
            expect(this.game).toBeDefined();
            expect(this.game.on).toBeDefined();
            expect(this.game.remove).toBeDefined();
            expect(this.game.emit).toBeDefined();
            expect(this.game.deal).toBeDefined();
            expect(this.game.table).toEqual(this.section);
            expect(this.game.gameCards.length).toEqual(20);
            this.game.gameCards.forEach(function (gameCard) {
                expect(gameCard.faceUp).toBe(false);
            });
        });

        it("should deal the game cards to a DOM Element", function (done) {
            this.game.deal(function (table) {
                expect(table.children.length).toEqual(20);
                done();
            });
        });

        it("should emit 'deal' event", function () {
            this.game.on('deal', function (table, debug) {
                expect(table).toBeDefined();
                expect(table.children.length).toEqual(20);
                expect(debug).toBe(false);
            });
            this.game.deal();
        });

        it("should deal shuffled cards", function () {
            var gameCards = this.game.gameCards,
                startCards = [];
            gameCards.forEach(function (card) {
                startCards.push(card);
            });
            this.game.deal(function () {
                expect(gameCards).not.toEqual(startCards);
            });
        });

        it("should be able to create a game in debug mode", function (done) {
            var game = new MemoryGame(this.section, true),
                startCards = [];
            game.gameCards.forEach(function (card) {
                startCards.push(card);
            });
            expect(game.debug).toBe(true);
            game.on('deal', function (table, debug) {
                expect(debug).toBe(true);
                expect(game.gameCards).toEqual(startCards);
                done();
            });

            game.deal();
        });

    });

    describe("Playing the Game", function () {

        beforeEach(function (done) {
            this.section = document.createElement('section');
            this.game = new MemoryGame(this.section, true);
            this.game.deal(function () {
                done();
            });
        });

        afterEach(function () {
            this.game.remove('match');
            this.game = null;
        });

        it("should be able to flip over one card", function () {
            var firstCard = this.section.firstChild;
            if (firstCard.onclick) {
                firstCard.onclick();
            }
            this.game.gameCards.forEach(function (card, i) {
                if (i === 0) {
                    expect(card.faceUp).toBe(true);
                    expect(card.cardElement.innerHTML).toBe("<span>!</span>");
                    expect(card.cardElement.getAttribute('class')).toBe("selected");
                } else {
                    expect(card.faceUp).toBe(false);
                    expect(card.cardElement.innerHTML).toBeFalsy();
                    expect(card.cardElement.getAttribute('class')).toBeFalsy();
                }
            });
        });

        describe("flipping over two cards", function () {

            it("should emit 'match' event", function (done) {
                var table = this.section,
                    firstCard = table.children[0],
                    secondCard = table.children[1];

                this.game.on('match', function (match) {
                    expect(match).toBe("!");

                    done();
                });

                if (firstCard.onclick) {
                    firstCard.onclick();
                }
                if (secondCard.onclick) {
                    secondCard.onclick();
                }
            });

            it("should flip over mismatched cards", function (done) {
                var table = this.section,
                    firstCard = table.children[0],
                    secondCard = table.children[3];

                if (firstCard.onclick) {
                    firstCard.onclick();
                }
                if (secondCard.onclick) {
                    secondCard.onclick();
                }

                expect(firstCard.innerHTML).toBe("<span>!</span>");
                expect(secondCard.innerHTML).toBe("<span>@</span>");
                expect(firstCard.getAttribute('class')).toBe('selected');
                expect(secondCard.getAttribute('class')).toBe('selected');

                setTimeout(function () {
                    expect(table.children.length).toEqual(20);
                    expect(firstCard.innerHTML).toBeFalsy();
                    expect(secondCard.innerHTML).toBeFalsy();
                    expect(firstCard.getAttribute('class')).toBeFalsy();
                    expect(secondCard.getAttribute('class')).toBeFalsy();
                    done();
                }, 2000);

            });

            it("should remove matched cards", function (done) {
                var table = this.section,
                    firstCard = table.children[0],
                    secondCard = table.children[1];

                this.game.on('match', function () {
                    setTimeout(function () {
                        expect(table.children.length).toEqual(18);
                        done();
                    }, 2000);
                });

                if (firstCard.onclick) {
                    firstCard.onclick();
                }
                if (secondCard.onclick) {
                    secondCard.onclick();
                }
            });

            it("should not allow a third card flip", function () {
                var table = this.section,
                    firstCard = table.children[0],
                    secondCard = table.children[2],
                    thirdCard = table.children[4];

                if (firstCard.onclick) {
                    firstCard.onclick();
                }
                if (secondCard.onclick) {
                    secondCard.onclick();
                }
                if (thirdCard.onclick) {
                    thirdCard.onclick();
                }

                expect(firstCard.innerHTML).toBe("<span>!</span>");
                expect(secondCard.innerHTML).toBe("<span>@</span>");
                expect(thirdCard.innerHTML).toBeFalsy();
                expect(firstCard.getAttribute('class')).toBe('selected');
                expect(secondCard.getAttribute('class')).toBe('selected');
                expect(thirdCard.getAttribute('class')).toBeFalsy();

            });

        });

    });

    describe("Ending the Game", function () {

        beforeEach(function (done) {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
            this.section = document.createElement('section');
            this.game = new MemoryGame(this.section, true);
            this.game.deal(function () {
                done();
            });
        });

        afterEach(function () {
            this.game.remove('end');
            this.game = null;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
        });

        it("should emit 'end' event", function (done) {
            var table = this.section;

            function playGame() {

                if (table.children.length) {
                    if (table.children[0] && table.children[0].onclick) {
                        table.children[0].onclick();
                    }
                    if (table.children[1].onclick) {
                        table.children[1].onclick();
                    }

                    if (table.children.length) {
                        setTimeout(playGame, 50);
                    }
                }
            }

            this.game.on('end', function () {
                expect(true).toBe(true);
                done();
            });

            playGame();

        });

    });

});
