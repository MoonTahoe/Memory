describe("Game Card", function() {

    beforeEach(function() {
        this.card = new Card("Ace", document.createElement('div'));
    });

    afterEach(function() {
        this.card = null;
    });

    it("can be created with a value", function() {
        expect(this.card).toBeDefined();
        expect(this.card.FaceValue).toBe("Ace");
    });

    it("has a DOM element for the card",function() {
        expect(this.card.cardElement).toBeTruthy();
        expect(this.card.cardElement.nodeName).toBe("DIV");
        expect(this.card.cardElement.className).toBeFalsy();
        expect(this.card.cardElement.innerHTML).toBeFalsy();
    });

    it("can flip", function() {
        expect(this.card.faceUp).toBeFalsy();
        expect(this.card.cardElement.className).toBeFalsy();
        expect(this.card.cardElement.innerHTML).toBeFalsy();
        this.card.flip();
        expect(this.card.faceUp).toBeTruthy();
        expect(this.card.cardElement.className).toEqual('selected');
        expect(this.card.cardElement.innerHTML).toBe('<span>Ace</span>');
        this.card.flip();
        expect(this.card.faceUp).toBeFalsy();
        expect(this.card.cardElement.className).toBeFalsy();
        expect(this.card.cardElement.innerHTML).toBeFalsy();
    });

    it("can be discarded", function() {
        var section = document.createElement('section');
        var size = section.children.length;
        section.appendChild(this.card.cardElement);
        expect(section.children.length).toEqual(size+1);
        this.card.discard();
        expect(section.children.length).toEqual(size);
    });

});
