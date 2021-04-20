//##############################################################################
// Boilerplate
//##############################################################################
var c = document.querySelector("#c");
var w = 1920;
var h = 1080;
c.width = w;
c.height = h;

var S = Math.sin;
var C = Math.cos;
var T = Math.tan;
var R = function (r, g, b, a) {
    a = a === undefined ? 1 : a;
    return "rgba(" + (r | 0) + "," + (g | 0) + "," + (b | 0) + "," + a + ")";
};
var x = c.getContext("2d");
var startT = +new Date();

function u(t) {
  // your code here
  matrixBinary(t);
}

function loop() {
    requestAnimationFrame(loop);
    u((new Date() - startT) / 1000);
}

loop();

//##############################################################################
// Dweets
//##############################################################################

function duelingWaves(t) {
  x.clearRect(0, 0, w, h);
  let rectWidth = Math.ceil(w / 100);
  for (i = 0; i < 100; i++) {
    x.fillStyle = R(0, 0, 0);
    x.fillRect(i*rectWidth, 0, rectWidth, h/2 + (((h/27) * Math.sin((2 * t) + (i/4)))));
    x.fillStyle = R(255, 255, 255);
    x.fillRect(i*rectWidth, 0, rectWidth, h/2 + (((h/27) * Math.cos((7 * t) + (i/2)))));
  }
}

function duelingWavesColors(t) {
  x.clearRect(0, 0, w, h);
  let rectWidth = Math.ceil(w / 100);
  for (i = 0; i < 100; i++) {
    x.fillStyle = R(
      Math.floor(255/2) + Math.floor(255/2) * Math.cos((t*0.5) + (-i/2)), 
      Math.floor(255/2) + Math.floor(255/2) * Math.sin((t*0.3) + (-i/2)), 
      Math.floor(255/2) + Math.floor(255/2) * Math.cos((t*0.7) + (i/2)));

    x.fillRect(i*rectWidth, 0, rectWidth, ((h/2) - (h/100)) + (((h/3) * Math.sin((0.5 * t) + (i/4)))));
    x.fillStyle = R(20, 20, 20);
    x.fillRect(i*rectWidth, 0, rectWidth, ((h/2) + (h/100)) + (((h/3) * Math.sin((1 * t) + (i/3)))));
    
  }
}

function matrixBinary(t) {
  x.fillStyle = rgb(0, 0, 0, 0.06);
  x.fillRect(0, 0, 2e3, 2e3);
  for (let px of [30, 25, 20, 15, 10, 7]){
      for (i=0; i < 2e3; i+=px+5) {
          for (let p of [2, 3,]) {
              x.font = px + "px monospace";
              x.fillStyle = rgb(0, 255, 0);
              let yCoord = ((1e6*sin(Math.pow(i + (p*111), p))) + (t*px*15))%1100;
              let adjustedY = yCoord - (yCoord % px);
              let char = Math.round(sin((adjustedY + (i*1e3) + 1e5) * (adjustedY + (i*1e3) + 1e5)) + 0.5);
              x.fillText(char, i, adjustedY, 80);
          }
      }
  }
}