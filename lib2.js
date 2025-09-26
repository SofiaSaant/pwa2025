// console.log('Bienvenido');

var lienzo = document.getElementById("lienzo");
var cd = lienzo.getContext("2d");

function exhibirLineas(){
  var x = 0;
  while (x < 400){
    cd.moveTo(x, 0);
    cd.lineTo(400, 300-x);
    cd.stroke();
    x = x + 10;
  }
}
