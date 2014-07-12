/* global Deck, Card */

describe("Game Deck", function () {

    beforeEach(function () {
        this.deck = new Deck();
        var i, deck = this.deck;
        this.sampleCards = [];
        for (i = 0; i < 100; i++) {
            this.sampleCards.push(i.toString());
        }
        this.sampleCards.forEach(function (sampleCard) {
            deck.GameCards.push(new Card(sampleCard));
        });
    });

    it("can be created", function () {
        expect(this.deck).toBeDefined();
    });

    it("can hold cards", function () {
        var deck = this.deck;
        expect(deck.GameCards.length).toEqual(this.sampleCards.length);
        this.sampleCards.forEach(function (sampleCard, i) {
            expect(deck.GameCards[i].FaceValue.toString()).toEqual(sampleCard);
        });
    });

    it("can shuffle", function () {
        this.deck.shuffle();
        var shuffled = [];

        this.deck.GameCards.forEach(function (card) {
            shuffled.push(card.FaceValue);
        });

        expect(shuffled).not.toEqual(this.sampleCards);

    });

});
