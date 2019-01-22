var card = $("#displayArea");
var timeLimit = 15;

// Question set
var segments = [{
  question: "Which city holds the record for being the farthest north Super Bowl host?",
  segments: ["Denver", "Detriot.", "Boston", "Minneapolis"],
  rightSelection: "Minneapolis",
  pic: "assets/Media/Video/snow1.gif"
}, {
  question: "Which NFL team holds the record for most Super Bowl appearances at 10?",
  segments: ["Redskins", "Broncos", "Patriots", "Cowboys"],
  rightSelection: "Patriots",
  pic: "assets/Media/Video/patriots.gif"
}, {
  question: "How many NFL teams have not won a Super Bowl?",
  segments: ["5", "12", "8", "11"],
  rightSelection: "12",
  pic: "assets/Media/Video/winners.gif"
}, {
  question: "Which city holds the record for hosting Super Bowls?",
  segments: ["Denver", "San Francisco", "New York", "Miami"],
  rightSelection: "Miami",
  pic: "assets/Media/Video/miami.gif"
}, {
  question: "Which team has won the most Super Bowls?",
  segments: ["Patriots", "Bills", "Steelers", "Raiders"],
  rightSelection: "Steelers",
  pic: "assets/Media/Video/pitt.gif"
}, {
  question: "Which NFL team won the very first Super Bowl, Super Bowl I, in January 1967? The trophy was name after the coach of this team.",
  segments: ["Colts", "Raiders", "Packers", "Redskins"],
  rightSelection: "Packers",
  pic: "assets/Media/Video/packers.gif"
}, {
  question: " This two-time starter for winning Super Bowl teams was the first QB to win the Super Bowl MVP.",
  segments: ["Namath", "Dawson", "Tarkenton", "Starr"],
  rightSelection: "Starr",
  pic: "assets/Media/Video/starr.gif"
}, {
  question: " Later officially named Super Bowl I, this 1967 triviaGame saw the Green Bay Packers defeat which team to take the first Super Bowl crown?",
  segments: ["Saints", "Chargers", "Titans", "Cheifs"],
  rightSelection: "Cheifs",
  pic: "assets/Media/Video/chiefs.gif"
}];

// Variable to hold our setInterval
var timer;

var triviaGame = {

  segments: segments,
  currentQuestion: 0,
  counter: timeLimit,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    triviaGame.counter--;
    $("#countNum").text(triviaGame.counter);
    if (triviaGame.counter === 0) {
      console.log("TIME UP");
      triviaGame.endOver();
    }
  },

  newQuestion: function() {

    timer = setInterval(triviaGame.countdown, 1000);

    card.html("<h2>" + segments[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < segments[this.currentQuestion].segments.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='" + segments[this.currentQuestion].segments[i]
      + "'>" + segments[this.currentQuestion].segments[i] + "</button>");
    }
  },

  nexQuest: function() {
    triviaGame.counter = timeLimit;
    $("#countNum").text(triviaGame.counter);
    triviaGame.currentQuestion++;
    triviaGame.newQuestion();
  },

  endOver: function() {

    clearInterval(timer);

    $("#countNum").html(triviaGame.counter);

    card.html("<h2>Out of Time!</h2>");
    card.append("<h3>The Correct Answer was: " + segments[this.currentQuestion].rightSelection);
    card.append("<img src='" + segments[this.currentQuestion].pic + "' />");

    if (triviaGame.currentQuestion === segments.length - 1) {
      setTimeout(triviaGame.results, 3 * 1000);
    }
    else {
      setTimeout(triviaGame.nexQuest, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    card.html("<h2>You did it. Your score is below:</h2>");

    $("#countNum").text(triviaGame.counter);

    card.append("<h3>Nice. You did it! Right Answers: " + triviaGame.correct + "</h3>");
    card.append("<h3>Nope. You are still a fool. Wrong Answers: " + triviaGame.incorrect + "</h3>");
    card.append("<h3>Unanswered: " + (segments.length - (triviaGame.incorrect + triviaGame.correct)) + "</h3>");
    card.append("<br><button id='tryAgain'>Try Again?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === segments[this.currentQuestion].rightSelection) {
      this.rightPoint();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    triviaGame.incorrect++;

    clearInterval(timer);

    card.html("<h2>Haha! You suck.</h2>");
    card.append("<h3>The Correct Answer was: " + segments[triviaGame.currentQuestion].rightSelection + "</h3>");
    card.append("<img src='" + segments[triviaGame.currentQuestion].pic + "' />");

    if (triviaGame.currentQuestion === segments.length - 1) {
      setTimeout(triviaGame.results, 3 * 1000);
    }
    else {
      setTimeout(triviaGame.nexQuest, 3 * 1000);
    }
  },

  rightPoint: function() {

    clearInterval(timer);

    triviaGame.correct++;

    card.html("<h2>Damn! I see genius!!!</h2>");
    card.append("<img src='" + segments[triviaGame.currentQuestion].pic + "' />");

    if (triviaGame.currentQuestion === segments.length - 1) {
      setTimeout(triviaGame.results, 3 * 1000);
    }
    else {
      setTimeout(triviaGame.nexQuest, 3 * 1000);
    }
  },

  reload: function() {
    this.currentQuestion = 0;
    this.counter = timeLimit;
    this.correct = 0;
    this.incorrect = 0;
    this.newQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#tryAgain", function() {
  triviaGame.reload();
});

$(document).on("click", ".answer-button", function(e) {
  triviaGame.clicked(e);
});

$(document).on("click", "#begin", function() {
  $("#container").prepend("<h2>Time Remaining: <span id='countNum'>15</span> Seconds</h2>");
  triviaGame.newQuestion();
});
