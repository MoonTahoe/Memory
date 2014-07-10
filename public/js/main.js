window.onload = function () {

    var debugGame = false,
        cardTableElement = document.getElementsByTagName("section")[0],
        messageElement = document.querySelector('header>p'),
        message = new Messenger(messageElement),
        timer = new Timer(),
        game = new MemoryGame(cardTableElement, debugGame);

    game.on("match", function (match) {
        message.update("Last Matched Element: " + match);
    });

    game.on("end", function () {
        timer.stop();
        message.update("You Finished in: " + Math.floor(timer.time / 1000) + " seconds");

        timer.reset();

        setTimeout(function () {
            game.deal(function () {
                timer.start();
            });
        }, 5000);

    });

    game.deal(function () {
        timer.start();
    });

};