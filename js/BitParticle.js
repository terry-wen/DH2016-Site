var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var W = canvas.width = window.innerWidth;
var H = canvas.height = window.innerHeight;
var generator = new particleGenerator(0, H, W, 0, 30);

//draw triangle shape
function drawTriangle(context, x, y, triangleWidth, triangleHeight, fillStyle) {
	context.save();
	context.translate(0,-triangleHeight/2);
	context.beginPath();
	context.moveTo(x, y);
	context.lineTo(x + triangleWidth / 2, y + triangleHeight);
	context.lineTo(x - triangleWidth / 2, y + triangleHeight);
	context.restore();
	context.closePath();
	context.strokeStyle = fillStyle;
	context.stroke();
}

//draw circle shape
function drawCircle(context, x, y, radius, fillStyle) {
	context.beginPath();
	context.arc(x,y,radius,0,2*Math.PI);
	context.closePath();
	context.strokeStyle = fillStyle;
	context.stroke();
}

//draw rectangle shape
function drawRect(context, x, y, width, height, fillStyle) {
	context.beginPath();
	context.rect(x,y,width,height);
	context.closePath();
	context.strokeStyle = fillStyle;
	context.stroke();
}

//returns random int
function randomIntgf(min, max) {
	return Math.floor(min + Math.random() * (max - min + 1));
}

//returns random int w/out rounding
function randomInt(min, max) {
	return min + Math.random() * (max - min);
}

//sets value to be between min or max
function clamp(value, min, max) {
	return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
}

function particle(x, y) {
  this.radius = randomInt(.1, 3);
	this.angleturn = randomInt(-.08, .08);
	this.angle = randomInt(1,0);
	this.type = randomIntgf(0,2);
	this.x = x;
	this.y = y;
	this.vx = randomInt(-4, 4);
	this.vy = randomInt(-2, 0);
}

particle.prototype.update = function() {
	this.x += this.vx;
	this.y += this.vy;
	this.vy += -0.08;
	this.vx *= 0.99;
	this.vy *= 0.99;
	this.angle += this.angleturn;
	this.radius -= .01;
	context.beginPath();
	context.textAlign = "center";
	context.globalAlpha = this.radius;
	context.lineWidth = 2;
  context.lineCap = 'round';
	context.save();
	context.translate(this.x,this.y);
	context.rotate(this.angle);

	if(this.type === 0) {
	  drawTriangle(context,0,0,15,13,"#ACBF66");
	} else if(this.type === 1) {
	  drawCircle(context,0,0,8,"#FFE499");
	} else if(this.type === 2) {
		drawRect(context,0,0,13,13,"#94C9ED");
	}

	context.restore();
	context.globalAlpha = 1;
  if(this.y > H+5) {
    this.vy *= -.5;
  }
  if(this.x > W || this.x < 0){
    this.vx *= -1;
  }
}

function particleGenerator(x, y, w, h, number) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.number = number;
  this.particles = [];
}

function update() {
  context.clearRect(0,0,W,H);
  generator.animate();
	requestAnimationFrame(update);
}

particleGenerator.prototype.animate = function() {
	if (this.particles.length < this.number) {
	  this.particles.push(new particle(clamp(randomInt(this.x, this.w+this.x),this.x,this.w+this.x),
		clamp(randomInt(this.y,this.h+this.y),this.y,this.h+this.y)));
	}
	for (var i = 0; i < this.particles.length; i++) {
	  p = this.particles[i];
	  p.update();
	  if (p.radius < .01 || p.y <0) {
			//a brand new particle replacing the dead one
	  	this.particles[i] = new particle(clamp(randomInt(this.x, this.w+this.x),this.x,this.w+this.x),
			clamp(randomInt(this.y,this.h+this.y),this.y,this.h+this.y));
	  }
	}
}

particleGenerator.prototype.updateWindow = function() {
	this.y = window.innerHeight;
	this.w = window.innerWidth;
	this.particles = [];
}

window.addEventListener("resize", function() {
	W = canvas.width = window.innerWidth;
	H = canvas.height = window.innerHeight;
	generator.updateWindow();
});

update();
