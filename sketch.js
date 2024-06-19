let width = window.innerWidth;
let height = window.innerHeight;

function setup() {
  canvas = createCanvas(weight, height);
}

function draw() {
  background(247, 178, 183);
}
class Button {
  constructor(x, y, w, h, color, accent, song) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.accent = accent;
    this.song = song;
  }
}

show() {
  noStroke();

  fill(this.color); 
  rect(this.x, this.y, this.w, this.h);

  fill(this.accent); 
  ellipse(this.x, this.y, this.w, this.h);

  fill(this.color); 
  arc(this.x, this.y, this.w, this.h, TWO_PI, PI);
};
