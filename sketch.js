let width = window.innerWidth;
let height = window.innerHeight;

let buttons_top = [];
let buttons_middle = [];
let buttons_bottom = [];

let achievement;
let arcade_bonus;
let arcade_game;
let arcade_race;
let arcade_robot;
let arcade_retro;

let confetti = [];

function setup() {
  canvas = createCanvas(width, height);
  
  achievement = loadSound('achievement.wav');
  arcade_bonus = loadSound('arcade_bonus.wav');
  arcade_game = loadSound('arcade_game.wav');
  arcade_race = loadSound('arcade_race.wav');
  arcade_robot = loadSound('arcade_robot.wav');
  arcade_retro = loadSound('arcade_retro.wav');

  let b1 = new Button(width/3, height/3, 200, 80, color(226, 132, 19), color(244, 190, 124),achievement);
  let b2 = new Button(width/2, height/3, 200, 80, color(0, 159, 183), color(153, 241, 255), arcade_bonus);
  let b3 = new Button(2*width/3, height/3, 200, 80, color(145, 145, 233), color(204, 204, 245), arcade_game);

  let b4 = new Button(width/3, height/2, 200, 80, color(205, 92, 92), color(240, 128, 128), arcade_race);
  let b5 = new Button(width/2, height/2, 200, 80, color(72, 209, 204), color(175, 238,238), arcade_robot);
  let b6 = new Button(2*width/3, height/2, 200, 80, color(255, 215, 0), color(255, 255, 0), arcade_retro);

  let b7 = new Button(width/3, 2*height/3, 200, 80, color(255, 163, 175), color(255, 214, 220),  arcade_bonus);
  let b8 = new Button(width/2, 2*height/3, 200, 80, color(143, 45, 86), color(216, 131, 166),  arcade_race);
  let b9 = new Button(2*width/3, 2*height/3, 200, 80, color(236, 78, 32), color(234, 162, 133), arcade_game);

  buttons_top.push(b1);
  buttons_top.push(b2);
  buttons_top.push(b3);

  buttons_middle.push(b4);
  buttons_middle.push(b5);
  buttons_middle.push(b6);

  buttons_bottom.push(b7);
  buttons_bottom.push(b8);
  buttons_bottom.push(b9);
}

function mousePressed() {
  for (let i = 0; i < buttons_top.length; i++) {
    buttons_top[i].clicked(mouseX, mouseY);
    buttons_middle[i].clicked(mouseX, mouseY);
    buttons_bottom[i].clicked(mouseX, mouseY);
  }
}

function mouseReleased() {
  for (let i = 0; i < buttons_top.length; i++) {
    buttons_top[i].y = height/3;
    buttons_middle[i].y = height/2;
    buttons_bottom[i].y = 2*height/3;
  }
}

function draw() {
  background(156, 122, 107);
  noStroke();
  for (let i = 0; i < buttons_top.length; i++) {
    buttons_top[i].show();
    buttons_middle[i].show();
    buttons_bottom[i].show();
  }

  for (let i = confetti.length - 1; i >= 0; i--) {
    confetti[i].update();
    confetti[i].show();
    if (confetti[i].finished()) {
      confetti.splice(i, 1);
    }
  }
}

class Button {
  constructor(x, y, w, h, color, accent, sound) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.accent = accent;
    this.sound = sound;
  }

  show() {
    noStroke();
    fill(this.color);
    rect((this.x - 100), this.y, this.w, 50);

    fill(this.accent);
    ellipse(this.x, this.y, this.w, this.h);

    fill(this.color);
    arc(this.x, (this.y + 50), this.w, this.h, TWO_PI, PI);
  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.w / 2) {
      this.y = this.y + 10;
      this.sound.play();
      this.addConfetti();
    }
  }

  addConfetti() {
    for (let i = 0; i < 100; i++) {
      confetti.push(new Confetti(this.x, this.y));
    }
  }
}

class Confetti {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 10);
    this.gravity = 0.1;
    this.vx = random(-2, 2);
    this.vy = random(-5, -1);
    this.alpha = 255;
    this.color = color(random(255), random(255), random(255), this.alpha);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.alpha -= 2;
    this.color.setAlpha(this.alpha);
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

  finished() {
    return this.alpha < 0;
  }
}
