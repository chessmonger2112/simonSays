$(function(){
  console.log("test");
  var backgroundColor = "#DDD"
  var borderRadius = 0;
  var theta = 0;

  app = {};

  var Model = Backbone.Model.extend({
    defaults: {
      sequence : []
    }
  });

  player = new Model;

  app.AppView = Backbone.View.extend({
    el: '#container',
    initialize: function () {
    },
    events: {
     "click .color" : "color"
    },
    green:function(event){
      console.log("green was clicked ",event);
      eventG = event;
    },
    color: function(event){
      var colorPressed = event.target.id
      console.log("The color pressed is ", colorPressed);
      player.attributes.sequence.push("green");
      this.blink(colorPressed);
    },
    blink: function(color){
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
        colorValue +=4;
        colorValue %= colorLimit;
      },15);

      setTimeout(timeOut, 1000);

      function timeOut()
      {
        console.log("Time out was called!!");
        clearInterval(colorTimer)
        $("#" + color).css("background-color", "#DDD");
      }
    }
  });


app.appView = new app.AppView();



 // var buttonTimer = setInterval(function(){
 //    borderRadius = Math.round(Math.abs(Math.sin(theta) * 50));
 //    theta+= .01;
 //    $("button").css("border-radius",borderRadius + "%")
 // },15);
var fontSize = 32;
var deltaFont = .25;
var fontTimer = setInterval(function(){
  if (fontSize > 50)
  {
    deltaFont *= -1;
  }
  else if(fontSize < 15)
  {
    deltaFont *= -1;
  }

  fontSize += deltaFont;
  $("#header").css("font-size",fontSize + "px");
}, 100)



});
