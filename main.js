$(function(){
  console.log("test");
  var borderRadius = 0;
  var theta = 0;
  var colorLimit = 16777217 //256 ^ 3;
  var colorValue = 0;
  var red = null;
  var green = null;
  var blue = null;
  var hex = null;

  var colorTimer = setInterval(function(){
    hex = colorValue.toString(16);
    var hexLength = hex.length;
    for (var i = 0; i < 6 - hexLength;i ++)
    {
      hex = "0" + hex;
    }
    red = parseInt(hex.slice(0,2),16);
    green = parseInt(hex.slice(2,4),16);
    blue = parseInt(hex.slice(4,6),16);
    console.log("color value is ",colorValue, " hex is ",hex,hex.length);
    $("#header").css("background-color","rgb(" + red + "," + green + ","+ blue + ")");
    colorValue +=4;
    colorValue %= colorLimit;
  },15);

 // var buttonTimer = setInterval(function(){
 //    borderRadius = Math.round(Math.abs(Math.sin(theta) * 50));
 //    theta+= .01;
 //    $("button").css("border-radius",borderRadius + "%")
 // },15);

});
