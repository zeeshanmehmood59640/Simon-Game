"using strict";
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let randomChosenColor = 0;
let gameStarted = false;
let level = 0;
const modal = $(".modal");
const overlay = $(".overlay");
const btnCloseModal = $(".close-modal");
const btnsOpenModal = $(".show-modal");
function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level: " + level);
  let randomNumber = Math.trunc(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  level++;
}
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    $("#level-title").text("Game Over! Score = " + (level - 1));
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("#level-title").text("Press any Key to Start ");
    }, 3000);
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 3000);
    level = 0;
    gameStarted = false;
    gamePattern = [];
  }
}
function playSound(name) {
  let audio = new Audio(name + ".mp3");
  audio.play();
}
function animatePress(currentColor) {
  let element = $("#" + currentColor);
  element.addClass("pressed");
  setTimeout(function () {
    element.removeClass("pressed");
  }, 100);
}

$(".btn").click(function () {
  if (gameStarted) {
    let userChosenColor = this.id;
    animatePress(userChosenColor);
    $("#" + userChosenColor)
      .fadeOut(100)
      .fadeIn(100);
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
});
$(document).keydown(function () {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});

const openModal = function () {
  modal.removeClass("hidden");
  overlay.removeClass("hidden");
};

const closeModal = function () {
  modal.addClass("hidden");
  overlay.addClass("hidden");
};
btnsOpenModal.click(openModal);
btnCloseModal.click(closeModal);
