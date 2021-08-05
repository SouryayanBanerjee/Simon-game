/*____________________ Variables______________________*/

  var userClickedPattern = [];
  var gamePattern = [];
  var randomChosenColor;
  var level = 0;
  var changeText;
  var started = false;
  var colorsArr = ["red","blue","green","yellow"];
  var i;





/*____________________ Functions______________________*/

function playSound (name)
  {
    var soundFile = "sounds/"+name+".mp3";
    var audio = new Audio (soundFile);
    audio.play();
  }
function nextSequence () {
  i = 0;
  started = true;
  userClickedPattern = [];
  level++;
  changeText = "Level - " + level;
  $("h1").text(changeText) + level;
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);

  randomChosenColor = colorsArr[randomNumber];
  gamePattern.push(randomChosenColor);

  var chosenId = "#" + randomChosenColor;
  $(chosenId).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound (randomChosenColor);
}

function animatePress (currentColor) {
  currentColor = "#"+currentColor;
  $(currentColor).addClass("pressed");
  setTimeout(function() {
    $(currentColor).removeClass("pressed");
  }, 100);
}

function checkingAns () {
  i++;
  if (userClickedPattern[i-1]===gamePattern[i-1])
  return true;
  else
  return false;
}

function newGame() {
  level = 0;
  gamePattern = [];
  started = false;
  $("h1").text("Game Over,Press A Key To Restart");
}







/*____________________ Event Listeners______________________*/



$(".btn").click(function() {
  if (started === true) {
    var userClickedColor = $(this).attr("id");
    userClickedPattern.push(userClickedColor);
    var checking = checkingAns(i);
    if (checking === false)
    {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      newGame();
    }
    else {
      playSound (userClickedColor);
      animatePress(userClickedColor);
      if (i === level) {
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
    }
  }

  });



$(document).keypress(function(event) {
  if(started === false)
  nextSequence();
})
