let gamePattern = [];
let userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];



function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);  //RCC
    level ++
    $("h1").text("level "+ level);
}


$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor); //UCC
    checkAnswers(userClickedPattern.length-1);
});


function playSound(name){
    new Audio("sounds/"+name+".mp3").play(); //RCC,UCC
}

function animatePress() {
    $(".btn").click(function () {
        $(this).addClass("pressed");
        setTimeout(()=>{
            $(this).removeClass("pressed");
        }, 100);
    });
}
animatePress();

//setTimeout(fn(){...} , 100);
//setTimeout(()=>{...} , 100);


let started = false;
var level = 0;
$(document).keypress(function(){
    if (!started){
        started = true;  
        nextSequence();
        $("h1").text("level "+ level);
        
        // use the button click fn here to avoid storing of UCP , before !started .
    }
})
//for mouse
$("h1").click(function(){
    if (!started) {
        started = true;  
        nextSequence();
        $("h1").text("level "+ level);
    } 
})




function checkAnswers(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length) {
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        }

    }else{
        new Audio("sounds/wrong.mp3").play();
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, press any key to restart");
        startOver();
    }
}


function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}







