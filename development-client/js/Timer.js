/*global window */

(function (exports) {

    function Timer(iTime) {
        this.interval = null;
        this.intervalTime = iTime || 100;
        this.time = (/webkit/.test(window.navigator.userAgent.toLowerCase())) ? this.intervalTime : 0;
        this.ticks = 0;
    }

    Timer.prototype.start = function () {
        var self = this;
        this.interval = setInterval(function () {
            self.time += self.intervalTime;
        }, this.intervalTime);
    };

    Timer.prototype.stop = function () {
        clearInterval(this.interval);
    };

    Timer.prototype.reset = function () {
        this.stop();
        this.time = 0;
    };

    exports.Timer = Timer;

})(window);
