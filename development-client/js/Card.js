/*global window */

(function(exports) {

    var Card = function(val, element) {
        this.faceUp = false;
        this.FaceValue = val;
        this.cardElement = element;
    };
    Card.prototype.flip = function() {
        if (this.faceUp) {
            this.cardElement.removeAttribute("class");
            this.cardElement.innerHTML = "";
        } else {
            this.cardElement.setAttribute("class","selected");
            this.cardElement.innerHTML = "<span>" + this.FaceValue + "</span>";
        }
        this.faceUp = !this.faceUp;
    };
    Card.prototype.discard = function() {
        this.cardElement.parentNode.removeChild(this.cardElement);
    };

    exports.Card = Card;

})(window);


