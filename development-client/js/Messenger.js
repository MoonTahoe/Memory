/* global HTMLElement, window */

(function (exports) {

    function checkRequired(el, msg) {

        if (!el) {
            throw new Error("Messenger constructor requires a DOM element as an argument.");
        }

        if (!(el instanceof HTMLElement)) {
            throw new Error("Messenger DOM element argument not a HTMLElement.");
        }

        if (msg) {
            if (typeof msg !== "string") {
                throw new Error("Messenger Message not a string.");
            }
        }

    }

    function Messenger(el, msg) {
        this.el = el;
        this.message = "";

        checkRequired(el, msg);

        if (msg) {
            this.el.innerHTML = msg;
            this.message = msg;
        }

    }

    Messenger.prototype.update = function (message) {
        this.message = message;
        this.el.innerHTML = message;
    };

    exports.Messenger = Messenger;

})(window);
