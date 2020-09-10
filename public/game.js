var colorArray = ["green", "red", "yellow", "blue"];
var randomChosenColor;
var gamePattern = [];
var userClickedPatter = [];
var gameStarted = false;
var level = -1;

$(document).keypress((e) => {
  if (e.key === "a" && gameStarted === false) {
    gameStarted = true;
    nextSequence();
  }
});

// playColorSound(randomChosenColor);

$(".btn").on("click", (e) => {
  if (gameStarted) {
    var userChoseColor = e.target.id;
    // addUserChosenColorToPatter(userChoseColor);
    userClickedPatter.push(userChoseColor);
    playColorSound(userChoseColor);
    animatePress(userChoseColor);
    if (gamePattern.length === userClickedPatter.length) {
      checkAnswers();
    }
  }
});

function checkAnswers() {
  if (gamePattern.toString() == userClickedPatter.toString()) {
    nextSequence();
  } else {
    gameFailed();
  }
}

function gameFailed() {
  gamePattern = [];
  userClickedPatter = [];
  gameStarted = false;
  level = -1;
  $("h1")[0].innerText = "You failed......";
  $("body").css("background-color", "red");
  playColorSound("wrong");
  setTimeout(() => {
    $("h1")[0].innerText = "Press A Key to Start";
    $("body").css("background-color", "#011F3F");
  }, 1000);
}

function animatePress(selectedColor) {
  $("#" + selectedColor).toggleClass("pressed");
  setTimeout(() => {
    $("#" + selectedColor).toggleClass("pressed");
  }, 600);
}

function playColorSound(color) {
  // new Audio("sounds/" + color + ".mp3").play();
  new Audio("sounds/" + color + ".mp3").play();
}

function buttonFlash(target) {
  for (let index = 0; index < 5; index++) {
    $("#" + target)
      .fadeOut(100)
      .fadeIn(100);
  }
}

function addUserChosenColorToPatter(userColor) {
  // userClickedPatter[userClickedPatter.length] = userColor;
  userClickedPatter.push(userColor);
}

function addRandomChosenColorToPattern(randomColor) {
  var length = gamePattern.length;
  gamePattern[length] = randomColor;
}

function nextSequence() {
  userClickedPatter = [];
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  levelUp();
  updateTitle();
  randomChosenColor = colorArray[randomNumber];
  buttonFlash(randomChosenColor);
  gamePattern[gamePattern.length] = randomChosenColor;
}

function levelUp() {
  level++;
}

function updateTitle() {
  $("h1")[0].innerText = "Level " + level;
}
