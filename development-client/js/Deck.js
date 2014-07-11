var Deck = function() {
    this.GameCards = [];
};
Deck.prototype.getCount = function() {
    return this.GameCards.length;
};
Deck.prototype.shuffle = function() {
    var CardBucket = [];
    var randomCard = function() {
        var i = Math.floor(Math.random() * CardBucket.length);
        var c = CardBucket[i];
        CardBucket.splice(i,1);
        return c;
    };
    var DeckCount = this.GameCards.length;
    for (var i=0; i<DeckCount;i++) {
        CardBucket.push(this.GameCards.pop());
    }
    for (i=0;i<DeckCount;i++) {
        this.GameCards.push(randomCard());
    }
};
Deck.prototype.deal = function() {
    return this.GameCards.splice(0,1);
};