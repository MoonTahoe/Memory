describe("Event Caller", function () {

    beforeEach(function () {
        this.emitter = new EventCaller();
        var custom = function() {
            this.name = "Some Object";
        };
        custom.prototype = new EventCaller();
        this.myObj = new custom();
    });

    it("can be created", function () {
        expect(this.emitter).toBeDefined();
        expect(this.emitter.on).toBeDefined();
        expect(this.emitter.emit).toBeDefined();
        expect(this.emitter.remove).toBeDefined();
    });

    it("can be inherited", function () {
        expect(this.myObj.on).toBeDefined();
        expect(this.myObj.emit).toBeDefined();
        expect(this.myObj.remove).toBeDefined();
    });

    it("should add subscribers", function() {
        this.emitter.on('custom', function() {});
        expect(this.emitter.subscribers['custom']).toBeDefined();
        expect(this.emitter.subscribers['custom'].length).toEqual(1);
    });

    it("should remove subscribers", function() {
        this.emitter.on('custom', function() {});
        this.emitter.remove('custom');
        expect(this.emitter.subscribers['custom']).not.toBeDefined();
    });

    it("should emit events", function() {
        var customCalled;
        this.emitter.on('custom', function() {
            customCalled = true;
        });
        this.emitter.emit('custom');
        expect(customCalled).toBe(true);
    });

    it("should emit with arguments", function() {
        this.emitter.on('customWithArgs', function(num1, num2, article) {
            expect(num1).toBe(1);
            expect(num2).toBe(2);
            expect(article).toBe("shoe");
        });
        this.emitter.emit('customWithArgs',1,2,'shoe');
    });

});
