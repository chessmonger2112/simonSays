$(function(){
  console.log("test");
  var backgroundColor = "#DDD"
  var borderRadius = 0;
  var theta = 0;
  var gameOver = true;
  app = {};
  var colors = ["green", "red", "blue","yellow"];

  var Model = Backbone.Model.extend({
    defaults: {
      sequence : [],
      numOfFlashes : 4,
      moves: 0
    },
    start : function()
    {
      var numOfFlashes = this.get("numOfFlashes");
      this.random(numOfFlashes);
      this.blinks();
    },
    random : function(numOfColors)
    {
      this.set({sequence: []});
      for (var index = 0; index < numOfColors; index ++)
      {
        var randomNumber = Math.random() * colors.length;
        var randomIndex = Math.floor(randomNumber);
        var randomColor = colors[randomIndex];
        this.attributes.sequence.push(randomColor);
      }
    },
    blinks: function(){
      var sequence = this.get("sequence");
      var duration = 1000;
      sequence.forEach(function(color,i){
        var delay = i * duration;
        var color = sequence[i];
        console.log("the ", i, " th color in the sequence is ",color, " delay is ",delay);
        setTimeout(x=> app.appView.blink(color,duration), delay);
      });
    },
    reset: function(){
      this.set({sequence: [],
              moves: 0});
      gameOver = false;
    },
    addColor: function(color){
      var sequence = this.get("sequence");
      var copySequence = sequence.slice(0,sequence.length); //why is this needed so comptuer model's value doesn't change?
      copySequence.push(color);
      player.set({sequence:copySequence});
      this.compare();
    },
    compare: function(){
      var movesPlayed = this.get("moves");
      var mySequence = this.get("sequence");
      var compSequence = computer.get("sequence");
      if (mySequence[movesPlayed] != compSequence[movesPlayed])
      {
        $("#gameOutcome").show();
        $("#gameOutcome").text("You fucking lost bro.");
        $("#startButton").show();
        gameOver = true;
      }
      movesPlayed += 1;
      this.set({moves: movesPlayed});
      if (movesPlayed === compSequence.length && !gameOver)
      {
        $("#gameOutcome").show();
        $("#gameOutcome").text("Congrats!! You just fucking won bro!!");
        $("#startButton").show();
      }
    },
  });

  player = new Model();
  computer = new Model(); // seems to work if Model is not invoked.

  app.AppView = Backbone.View.extend({
    el: '#container',
    initialize: function () {
    },
    events: {
     "click .color" : "color"
    },
    color: function(event){
      var colorPressed = event.target.id
      console.log("The color pressed is ", colorPressed);
      player.addColor(colorPressed);
      this.blink(colorPressed,1000);
    },
    blink: function(color,delay){
      var colorLimit = 16777217 //256 ^ 3;
      var colorValue = 0;
      var colorTimer = setInterval(function(){
        var hex = colorValue.toString(16);
        var hexLength = hex.length;
        for (var i = 0; i < 6 - hexLength;i ++)
        {
          hex = "0" + hex;
        }
        var red = parseInt(hex.slice(0,2),16);
        var green = parseInt(hex.slice(2,4),16);
        var blue = parseInt(hex.slice(4,6),16);
        $("#" + color).css("background-color","rgb(" + red + "," + green + ","+ blue + ")");
        colorValue += 4;
        colorValue %= colorLimit;
      },15);

      setTimeout(timeOut, delay);

      function timeOut()
      {
        clearInterval(colorTimer);
        $("#" + color).css("background-color", color);
      }
    }
  });

app.StartButton = Backbone.View.extend({
  el: "#start",
  events : {"click #startButton" : "start"},
  start : function(){
    computer.start();
    player.reset();
    $("#startButton").hide();
    $("#gameOutcome").hide();
  }
});

  app.appView = new app.AppView();
  app.startButton = new app.StartButton();

 // var buttonTimer = setInterval(function(){
 //    borderRadius = Math.round(Math.abs(Math.sin(theta) * 50));
 //    theta+= .01;
 //    $("button").css("border-radius",borderRadius + "%")
 // },15);

  // var fontSize = 32;
  // var deltaFont = .25;
  // var fontTimer = setInterval(function(){
  //   if (fontSize > 50)
  //   {
  //     deltaFont *= -1;
  //   }
  //   else if(fontSize < 15)
  //   {
  //     deltaFont *= -1;
  //   }

  //   fontSize += deltaFont;
  //   $("#header").css("font-size",fontSize + "px");
  //   }, 100);
});
