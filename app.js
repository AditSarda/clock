var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");

var radius = canvas.height / 2;
ctx.translate(radius, radius);

radius = radius * 0.90;

setInterval(drawClock, 1000);

function drawClock() {

    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, 'lightBlue');
    grad.addColorStop(0.5, 'lightBlue');
    grad.addColorStop(1, 'white');

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI)
    ctx.fillStyle = "white";
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {

    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minutes * Math.PI / (60 * 6)) + (seconds * Math.PI / (360 * 60))
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);

    minutes = (minutes * Math.PI / 30) + (seconds * Math.PI / (30 * 60))
    drawHand(ctx, minutes, radius * 0.8, radius * 0.07);

    seconds = (seconds * Math.PI / 30)
    drawHand(ctx, seconds, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}