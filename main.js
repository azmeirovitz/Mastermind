
$(document).ready(initializing);




var mastermind;

function initializing () {
    mastermind = new Mastermind({
        gameRules: "#gameRules",
        computerRandomCode: "#computerRandomCode",
        playerGuessesArea: "#playerGuessesArea",
        message: "#message",
        sort: "#sort"

     });

    mastermind.eventListener();
     
}