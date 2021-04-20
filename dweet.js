//##############################################################################
// Boilerplate
//##############################################################################

const c = document.querySelector("#c");
let width = 1920;
let height = 1080;
c.width = width;
c.height = height;

let S = Math.sin;
let sin = S;
let C = Math.cos;
let cos = C;
let T = Math.tan;
let tan = T;

let floor = Math.floor;
let ceil = Math.ceil;

let R = function(r, g, b, a) {
    a = a === undefined ? 1 : a;
    return `rgba(${r|0},${g|0},${b|0},${a})`;
}
let rgb = R;

let x = c.getContext("2d");
let startT = +new Date();

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

function duelingWavesColors(t) {
    x.clearRect(0, 0, width, height);
    let rectWidth = ceil(width / 100);
    for (i = 0; i < 100; i++) {
        x.fillStyle = rgb(
            floor(255/2) + floor(255/2) * cos((t*0.5) + (-i/2)),
            floor(255/2) + floor(255/2) * sin((t*0.3) + (-i/2)),
            floor(255/2) + floor(255/2) * cos((t*0.7) + (i/2))
        );
        x.fillRect(i*rectWidth, 0, rectWidth, ((height/2) - (height/100)) + (((height/3 * sin((0.5*t) + (i/4))))));
        x.fillStyle = rgb(20, 20, 20);
        x.fillRect(i*rectWidth, 0, rectWidth, ((height/2) + (height/100)) + (((height/3 * sin((1*t) + (i/3))))));
    }
}

function spiral(t) {
    let startTime = t + 0;
    let spiralSpeed = 100;
    let spiralWidthFactor = 0.2;

    x.fillStyle = rgb(0, 0, 0);
    x.fillRect(0, 0, 2e3, 2e3);

    for (i = 1; i < 2e3; i++) {
        x.fillStyle = rgb(255, 255, 255);

        let spiralWidth = sin(i*i) * spiralWidthFactor;

        let X = 960 + (i * sin(spiralSpeed * startTime/i + spiralWidth));
        let Y = 540 + (i * cos(spiralSpeed * startTime/i + spiralWidth));

        let size = 3;

        x.fillRect(X, Y, size, size);
    }
}

function blackHole(t) {
    // https://frankforce.com/dissecting-a-dweet-black-hole/
    let startTime = t + 4;
    let spiralSpeed = 150;
    let tiltFactor = 0.4;
    let spiralDepth = 4000;
    let twinkleFrequency = 0.7;
    let maxTwinkle = 7;
    let spiralWidthFactor = 1;
    let distanceFactor = 500;
    let trailLength = 7;

    x.fillStyle = rgb(0, 0, 0, 0.1 * (10 - trailLength));
    x.fillRect(0, 0, 2e3, 2e3);
    
    for (i = 1; i < 2e3; i++) {
        x.fillStyle = rgb(10*i + 30, 0.4*i + 30, 2*i + 30);
        
        let spiralWidth = sin(i*i) * spiralWidthFactor;

        let X = 960 + (i * sin(spiralSpeed*startTime/i + spiralWidth));
        let Y = 540 + (tiltFactor ? tiltFactor : 1) * (i * cos(spiralSpeed*startTime/i + spiralWidth) + (spiralDepth/i));

        let size = (distanceFactor ? ((Y + distanceFactor) / (1080 + distanceFactor)) : 1) * cos((twinkleFrequency*t) + (100*i*i)) * maxTwinkle;

        x.fillRect(X, Y, size, size);
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
    