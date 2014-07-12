/* global Timer */
describe("Timer", function () {

    beforeEach(function () {
        this.timer = new Timer();
    });

    afterEach(function () {
        this.timer.stop();
    });

    it("should start", function (done) {
        var timer = this.timer;
        var startTime = timer.time;
        timer.start();
        setTimeout(function () {
            expect(typeof timer.time).toBe("number");
            expect(timer.time).not.toEqual(startTime);
            done();
        }, 1000);
    });


    it("should stop", function (done) {
        var timer = new Timer();
        var startTime = timer.time;
        timer.start();
        setTimeout(function () {
            expect(timer.time).not.toEqual(startTime);
            expect(timer.time).toEqual(600);
            done();
        }, 600);
    });

});