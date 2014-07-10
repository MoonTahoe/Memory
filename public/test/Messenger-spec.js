describe("Messenger", function () {

    var msg, el;

    beforeEach(function () {
        el = document.createElement("p");
        msg = new Messenger(el);
    });

    it("can be created", function () {
        expect(msg).toBeDefined();
        expect(msg.el).toBe(el);
    });

    it("can be created with a default message", function () {
        msg = new Messenger(el, "Initial Message");
        expect(msg.message).toBe("Initial Message");
        expect(el.innerHTML).toBe("Initial Message");
    });

    it("can update the message", function() {
        msg.update("New Message");
        expect(msg.message).toBe("New Message");
        expect(el.innerHTML).toBe("New Message");
    });

    describe("Errors", function () {

        var Error;

        beforeEach(function () {
            Error = null;
        });

        it("should throw an error when created without DOM element", function () {

            try {
                msg = new Messenger();
            } catch (err) {
                Error = err;
            }

            expect(Error).toBeDefined();
            expect(Error.message).toEqual("Messenger constructor requires a DOM element as an argument.");

        });

        it("should throw an error when the first argument is not a HTMLElement", function () {
            try {
                msg = new Messenger({});
            } catch (err) {
                Error = err;
            }

            expect(Error).toBeDefined();
            expect(Error.message).toEqual("Messenger DOM element argument not a HTMLElement.");
        });

        it("should throw an error when the second argument is not a string", function () {
            try {
                msg = new Messenger(el, 33);
            } catch (err) {
                Error = err;
            }

            expect(Error).toBeDefined();
            expect(Error.message).toEqual("Messenger Message not a string.");
        })

    });

});