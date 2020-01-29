

class Number {
    constructor (data){
        this.data = data;

        this.dom = {};        
    }
    
    renderPlayerNumbers () {

        var $playerNumber = this.dom.playerNumber = $("<div>", {
            class: "playerNumber",            
            style: "font-size: 40px; font-weight: bold; border-style: solid; border-color: aqua; width: 40px; text-align: center; display: inline-block",
            text: this.data
        });
        return $playerNumber;
    }    
    
}

class Mastermind {
    constructor (options) {
        this.options = options;

        this.domElements = {
            rules: {},
            computer: {},
            selectBox: {},
            player: {}
        };

        this.dom = {
            gameRules: $(options.gameRules),
            playerGuessesArea: $(options.playerGuessesArea),
            computerRandomCode: $(options.computerRandomCode),
            message: $(options.message),
            sort: $(options.sort)
        }

        this.computerCode = [];

        this.selectedPlayerNumbers = [];

        this.switch = false;

    //bind
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.correctMyGuess = this.correctMyGuess.bind(this);
    this.checkingPlayerGuess = this.checkingPlayerGuess.bind(this);
    this.gameRules = this.gameRules.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    }

    eventListener() {
        $(".youGuess").on("click", this.handleClick1);        
        this.dom.sort.on("change", this.handleSort);
        $("#changeChoice").on("click", this.correctMyGuess);
        $("#checkGuess").on("click", this.checkingPlayerGuess);
        $("#h3").on("click", this.gameRules);        
        
    }

    gameRules () {
        this.dom.gameRules.empty();

        var $frame = this.domElements.rules.frame = $("<div>", {
            style: "border: solid 1px; padding-left: 1px"
        })

        var $gameRules1 = this.domElements.rules.gameRules1 = $("<p>", {
            text: 'You are playing against the computer. Your goal is to break the code of the computer. The computer chooses a random code, which includes four numbers out of the numbers 1 to 6.'
        });
        
        var $gameRules2 = this.domElements.rules.gameRules2 = $("<p>", {
            text:'In each turn, you may choose any combination of four numbers out of the numbers 1 to 6. Once you choose a combination, the computer will provide you with the following feedback: A blue circle indicates that your guessed number is included in the code of the computer and is in that exact position. The yellow circle indicates that your guessed number is included in the code of the computer, but is not in that exact position.'
        });        

        var $gameRules3 = this.domElements.rules.gameRules3 = $("<p>", {
            text:'For example, if the code of the computer is 1234, and your combination is 1325, your feedback would be: one blue circle because the 1 is included and is in that exact position, two yellow circles because the 2 and 3 are included, but they are not in those exact positions. You will have only three circles in this combination because the 5 is not included in the code of the computer.'
        });        

        var $gameRules4 = this.domElements.rules.gameRules4 = $("<p>", {
            text:'You play your turns until you guess the right code. You can restart the game at any time by clicking "Click here to start the game."                                                     Use the DROPDOWN MENU BOX to choose your numbers. Each number can be chosen only ONCE.    If you choose a number and change your mind during a specific turn, click the button "Correct My Guess" to delete that number.'
        });        

        var $gameRules5 = this.domElements.rules.gameRules5 = $("<p>", {
            text:'GOOD LUCK AND HAVE FUN!'
        });

        var $closePopup = this.domElements.closePopup = $("<button>", {
            text: "Close",
            on: {
                click:this.handleClick2 
            }
        });

        $frame.append($gameRules1, $gameRules2, $gameRules3, $gameRules4, $gameRules5, $closePopup);

        this.dom.gameRules.append($frame);
    }
    
    handleClick1 (e) {
        if (e) e.preventDefault;
        
        this.getRandomNumbers();  
        this.renderSelectBox ();

    }

    handleClick2 (e) {
        if (e) e.preventDefault;

        this.dom.gameRules.empty();
    }

renderSelectBox () {

    this.dom.sort.empty();
       
    var $optionEmpty = this.domElements.optionEmpty = $("<option>", {
        value: ""        
    });

    var $option1 = this.domElements.option1 = $("<option>", {
        value: "1",
        text: "1"
    });

    var $option2 = this.domElements.option2 = $("<option>", {
        value: "2",
        text: "2"
    });

    var $option3 = this.domElements.option3 = $("<option>", {
        value: "3",
        text: "3"
    });

    var $option4 = this.domElements.option4 = $("<option>", {
        value: "4",
        text: "4"
    });

    var $option5 = this.domElements.option5 = $("<option>", {
        value: "5",
        text: "5"
    });

    var $option6 = this.domElements.option6 = $("<option>", {
        value: "6",
        text: "6"
    });

    this.dom.sort.append($optionEmpty, $option1, $option2, $option3, $option4, $option5, $option6);
    
}

    correctMyGuess () {
        this.selectedPlayerNumbers.pop();
        //$("#playerGuessesArea").children().last().remove(); Also good, but all classes in that parent
        $(".playerNumber").last().remove();
    }
    
    getRandomNumbers() {
        this.dom.playerGuessesArea.empty();
        this.dom.message.empty(); //EMPTY DIVS
            

        this.computerCode = []; //empties the array
        var i=0;
        while (i < 4) {
         var number = Math.floor(Math.random()*10 + 1);
         if (number <= 6 && this.computerCode.length <=4 && this.computerCode.indexOf(number) ===-1){
              this.computerCode.push(number);
              i++;
         }
        }
        console.log("this.computerCode Array: ", this.computerCode);
        
        var container = this.renderComputerCode();
        this.dom.computerRandomCode.empty();
        this.dom.computerRandomCode.append(container);
        
    }

    renderComputerCode() {        
        
        var $container = this.domElements.computer.container = $("<div>", {
            class: "computerCode",
            text: "COMPUTER'S  SECRET  CODE",
            style: "border: 5px; background-image: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); padding-top: 10px; padding-bottom: 10px; text-align: center; font-weight: bold; width: 35%"
            
        });
        return $container;
      
    } 

    handleSort(e) {
        if (e) e.preventDefault;

        console.log ("handleSort was called");

        if (this.switch) {
            this.selectedPlayerNumbers = [];
            this.switch=false;
        }
        

        if (this.dom.sort.val() == "") {
            console.log("--- was chosen");
        } else {
            
            var selectedNumber = this.dom.sort.val();
            console.log("selectedNumber: ", selectedNumber, ",", this.dom.sort.val());
            if (this.selectedPlayerNumbers.length <= 3 && this.selectedPlayerNumbers.indexOf(selectedNumber) === -1) {
                this.selectedPlayerNumbers.push(selectedNumber);
                
                var number = new Number (selectedNumber);
                var thePlayerNumber = number.renderPlayerNumbers();
                
                this.dom.playerGuessesArea.append(thePlayerNumber);                 

            } else if (this.selectedPlayerNumbers.length === 4)  {
                alert("You already chose 4 numbers");
            } else alert("Each number can be chosen only once");            
                    
        console.log("this.selectedPlayerNumbers array: ", this.selectedPlayerNumbers);
        
        }
    
    }
    

    checkingPlayerGuess () {
        console.log("checkingPlayerGuess was called");
        var $pegs = [];

        var convertedInt1 = parseInt(this.selectedPlayerNumbers[0]);
        var guess1 = this.computerCode.indexOf(convertedInt1);
        
        if (guess1 === 0) {
            var peg1 = 1;
            var $peg1 = this.domElements.player.peg1 = $("<span>", {
                class: "dot",
                style: "height: 25px; width: 25px; background-color: blue; border-radius: 50%; border-color: green; display: inline-block"
            });
        } else if ( guess1 != 0 && guess1 != -1) {
            var $peg1 = this.domElements.player.peg1 = $("<span>", {
                class: "dot",
                style: "height: 25px; width: 25px; background-color: yellow; border-radius: 50%; border-color: green; display: inline-block"
            });
        }
        $pegs.push($peg1);

        var convertedInt2 = parseInt(this.selectedPlayerNumbers[1]);
        var guess2 = this.computerCode.indexOf(convertedInt2);
        //var guess2 = this.computerCode.indexOf(this.selectedPlayerNumbers[1]);
        if (guess2 === 1) {
            var peg2 = 1;
            var $peg2 = this.domElements.player.peg2 = $("<span>", {
                class: "dot",
                style: "height: 25px; width: 25px; background-color: blue; border-radius: 50%; border-color: green; display: inline-block"
            });
        } else if ( guess2 != 1 && guess2 != -1) {
            var $peg2 = this.domElements.player.peg2 = $("<span>", {
                class: "dot",
                style: "height: 25px; width: 25px; background-color: yellow; border-radius: 50%; border-color: green; display: inline-block"
            });
        } 
        $pegs.push($peg2);  

        var convertedInt3 = parseInt(this.selectedPlayerNumbers[2]);
        var guess3 = this.computerCode.indexOf(convertedInt3);        
        //var guess3 = this.computerCode.indexOf(this.selectedPlayerNumbers[2]);
        if (guess3 === 2) {
            var peg3 = 1;
            var $peg3 = this.domElements.player.peg3 = $("<span>", {
                class: "dot",                
                style: "height: 25px; width: 25px; background-color: blue; border-radius: 50%; border-color: green; display: inline-block"
            });
        } else if ( guess3 != 2 && guess3 != -1) {
            var $peg3 = this.domElements.player.peg3 = $("<span>", {
                class: "dot",                
                style: "height: 25px; width: 25px; background-color: yellow; border-radius: 50%; border-color: green; display: inline-block"
            });
        }
        $pegs.push($peg3);

        var convertedInt4 = parseInt(this.selectedPlayerNumbers[3]);
        var guess4 = this.computerCode.indexOf(convertedInt4);
        //var guess4 = this.computerCode.indexOf(this.selectedPlayerNumbers[3]);
        if (guess4 === 3) {
            var peg4 = 1;
            var $peg4 = this.domElements.player.peg4 = $("<span>", {
                class: "dot",                
                style: "height: 25px; width: 25px; background-color: blue; border-radius: 50%; border-color: green; display: inline-block"
            });
        } else if ( guess4 != 3 && guess4 != -1) {
            var $peg4 = this.domElements.player.peg4 = $("<span>", {
                class: "dot",                
                style: "height: 25px; width: 25px; background-color: yellow; border-radius: 50%; border-color: green; display: inline-block"
            });
        }
        $pegs.push($peg4);
        console.log("$pegs: ", $pegs);

        var randomNumbers = []; //empties the array
        var i=0;
        while (i < 4) {
         var number = Math.floor(Math.random()*10);
         if (number < 4 && randomNumbers.length <=4 && randomNumbers.indexOf(number) ===-1){
             randomNumbers.push(number);
             if ($pegs[i]){
                this.dom.playerGuessesArea.append($pegs[i]);
             }             
              i++;
         }
        } 

        console.log("randomNumbers array: ", randomNumbers);        

        if (peg1 === 1 && peg2 === 1 && peg3 === 1 && peg4 === 1) {
            var $message = this.domElements.player.message = $("<h2>", {
                text: "GOOD JOB! YOU FOUND THE SECRET CODE! IF YOU WANT TO PLAY AGAIN, CLICK THE BLUE BOX." 
            });

            this.dom.message.append($message); //EMPTY DIVS            
            this.selectedPlayerNumbers = [];            
            this.renderSelectBox();

        } else {
            var $yourTurnAgain = this.domElements.player.$yourTurnAgain = $("<h3>", {
                text: "Your turn again. Choose numbers.",
                //style: "display: inline-block"
            });

            this.dom.playerGuessesArea.append($yourTurnAgain);
            this.yourTurnAgain();
            this.switch = true;
            
        }

    }

        yourTurnAgain () {

            this.dom.sort.empty();
            this.renderSelectBox();          
            
            console.log("this.selectedPlayerNumbers:::::", this.selectedPlayerNumbers);
            
            return;
        }
    
    


} 
   
// function myFunction() {
//     var x = Math.floor((Math.random() * 10) + 1);
//     document.getElementById("demo").innerHTML = x;
//}   