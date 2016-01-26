var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Ball
var x = canvas.width/2;
var y = canvas.height-250;
var dx = -5;
var dy = 5;
var ballRadius = 10;

//Paddle
var paddleHeight = 100; 
var paddleWidth = 15;
var lPaddleY = (canvas.height - paddleHeight)/2;
var rPaddleY = (canvas.height - paddleHeight)/2;
var rPaddleCenter = rPaddleY + (paddleHeight/2);
var upPressed = false;
var downPressed = false;

//Score
var lScore = 0;
var rScore = 0;

//Listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 38){
		upPressed = true;
	}

	else if(e.keyCode == 40) {
		downPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 38){
		upPressed = false;
	}

	else if(e.keyCode == 40) {
		downPressed = false;
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#ffffff";
	ctx.fill();
	ctx.closePath();
}

function drawPaddles() {
	ctx.beginPath();
	ctx.rect(20, lPaddleY, paddleWidth, paddleHeight);
	ctx.fillStyle = "#ffffff";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.rect(980-paddleWidth, rPaddleY, paddleWidth, paddleHeight);
	ctx.fillStyle = "#ffffff";
	ctx.fill();
	ctx.closePath();
}

function drawNet() {
	ctx.setLineDash([15, 5]);
	ctx.beginPath();
	ctx.moveTo(canvas.width/2, 0);
	ctx.lineTo(canvas.width/2, 1000);
	ctx.lineWidth = 10;
	ctx.strokeStyle = "#ffffff";
	ctx.stroke();
}

function drawWalls() {
	ctx.setLineDash([100, 0]);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(1000, 0);
	ctx.lineWidth = 30;
	ctx.strokeStyle = "#ffffff";
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(0, 500);
	ctx.lineTo(1000, 500);
	ctx.lineWidth = 30;
	ctx.strokeStyle = "#ffffff";
	ctx.stroke();
}

function drawAI() {
	if(rPaddleY + (paddleHeight/2) < y){
		rPaddleY += 4;
	}
	else {
	    rPaddleY -= 4;
	}
}

function drawScore() {
	ctx.font = "100px Roboto";
	ctx.fillStyle = "#ffffff";
	ctx.fillText(lScore, (canvas.width/2)+22, 100);
	ctx.fillText(rScore, (canvas.width/2)-72, 100);
}

function drawBallCo() {
	ctx.font = "12px Arial";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("X: "+ x, 2, 50);
	ctx.fillText("Y: " + y, 2, 65);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddles();
	drawWalls();
	drawNet();
	drawScore();
	drawAI();
	//drawBallCo();

	x += dx;
	y += dy;

	//Wall Collision
	if(y + dy > canvas.height - ballRadius - ctx.lineWidth || y + dy < ballRadius + ctx.lineWidth) {
		dy = -dy;
	}

	//Paddle Collision
	else if(x + dx == 15 + paddleWidth){
	    if(y > lPaddleY && y < lPaddleY + paddleHeight){
	    	dx = -dx;
	    }
	    else{
	    	lScore++;
	    	if(lScore == 10){
	    		alert("Do day, a small victory is won for pong")
	    	}
	    	x = canvas.width/2;
	    	y = canvas.height-250;
	    	dx = -5;
	    	dy = 5;
	    }
    }
    else if(x + dx == 985-paddleWidth){
    	if(y > rPaddleY && y < rPaddleY + paddleHeight){
	    	dx = -dx;
	    }
	    else{
	    	rScore++;
	    	x = canvas.width/2;
	    	y = canvas.height-250;
	    	dx = -5;
	    	dy = 5;
	    }
    }

	if(upPressed){
		if(lPaddleY <= 0 + ctx.lineWidth){
			lPaddleY -= 0;
		}
		else{
			lPaddleY -= 7;
		}
	}

	else if(downPressed){
		if(lPaddleY + paddleHeight >= 500 - ctx.lineWidth){
			lPaddleY += 0;
		}
		else {
			lPaddleY += 7;
		}
	}
	requestAnimationFrame(draw);
}

draw();