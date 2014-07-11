function EventCaller() {
    this.subscribers = {};
}

EventCaller.prototype.on = function(event, callback) {
    if (!this.subscribers[event]) {
        this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
};

EventCaller.prototype.emit = function(event) {
    var args = arguments;
    if (this.subscribers[event]) {
        this.subscribers[event].forEach(function(handler) {
            if (args.length>1) {
                handler(args[1], args[2], args[3]);
            } else {
                handler();
            }
        });
    }
};

EventCaller.prototype.remove = function(event) {
    this.subscribers[event] = undefined;
};

