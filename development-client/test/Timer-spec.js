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
        timer.start();
        var time = timer.time;
        setTimeout(function () {
            timer.stop();
            expect(timer.time).not.toEqual(0); 
            expect(timer.time).toEqual(600);
            time = timer.time;
        }, 600);

        setTimeout(function () {
            done();
            expect(timer.time).toEqual(time);
        }, 1000);
    });

    it("should record time accurately", function (done) {
        var timer = new Timer();
        timer.start();
        setTimeout(function () {
            timer.stop();
            expect(timer.time).not.toEqual(0);
            expect(timer.time).toEqual(600);
            done();
        }, 600);
    });

});