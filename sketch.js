let time = 0;
var fps = 120;
var offset = 350;
let wave = [];
let official_x_offset = 400;

let cycle1, cycle2;

function setup() {
  createCanvas(1500, windowHeight);
  frameRate(fps);
  // We add our cycles here 
  cycle1 = new Cycle(200, 300, 120 , 3);
  cycle2 = new Cycle(200, 450, 40 , 0.6);
  cycle3 = new Cycle(150, 100 , 20 , 0.3);
}

class Cycle {
  constructor(center_x,center_y,r, period){
    // Main Circle
    this.radius = r;
    this.center_x = center_x;
    this.center_y = center_y;
    this.period = period;
    this.theta = 0;
    this.c = TWO_PI * this.radius;
    this.wave = new Wave(this.c, 
      this.period, this.radius,
      this.center_x, this.center_y);
  }

  draw_ellipse(){
    stroke(205, 205, 0);
    noFill();
    circle(this.center_x,this.center_y,this.radius * 2);
  }

  draw_rotation(){
    fill(0,200,150);
    circle( this.center_x + this.x, this.center_y + this.y , 5  );
    stroke(123,123,0);
    strokeWeight(2.1);
    line(this.center_x, this.center_y , this.center_x + this.x , this.center_y +this.y);
  }

  update_theta(){
    this.x = (this.radius * cos(this.theta)) ;
    this.y = (this.radius * sin(this.theta));
    this.theta += TWO_PI / (this.period * fps);
  }
}


class Queue{
  constructor(size) {
    this.elements = [];
    this.size = size;
  }
  
  enqueue(e) {
    if (this.elements.length >= this.size){
      this.dequeue();
    }
    this.elements.unshift(e);
  }

  dequeue(){
      this.elements.pop();
  }
}

class Wave {
  constructor(c, period, radius, center_x, center_y){
    // For extending waves 
    this.center_x = center_x
    this.center_y = center_y
    this.c = c; 
    this.period = period;
    this.wave_arr_size = this.period * fps;

    this.radius = radius;
    
    this.wave_coord_x = [];
    for (let i = 0; i <= 1000; i+=0.5 ){
      this.wave_coord_x.push(i + official_x_offset);
    }
  
    this.wave_coord_y = new Queue(this.wave_coord_x.length);
  }

  draw_wave(x_val) {

    fill(200,200,230);
    for (var i = 0; i < this.wave_coord_y.elements.length; i++) {
      circle( this.wave_coord_x[i]  , this.wave_coord_y.elements[i] + this.center_y, 4 );
    }

    // Draw that line as well
    strokeWeight(3);
    stroke(100, 100, 0);
    line( this.center_x + x_val, 
      this.center_y + this.wave_coord_y.elements[0], 
      official_x_offset, 
      this.center_y + this.wave_coord_y.elements[0] );
  }

  update_wave(y_val){
    this.wave_coord_y.enqueue(y_val);
  }
}

function addArrays(ar1, ar2){
  var ar3 = [];
  for(var i in ar1)
      ar3.push(ar1[i] + ar2[i]);
  return ar3;
}


function draw() {
  background(0);

  // First Cycle 
  cycle1.draw_ellipse();
  cycle1.draw_rotation();
  cycle1.update_theta();
  // cycle1.wave.draw_wave(cycle1.x);
  // cycle1.wave.update_wave(cycle1.y);
  
  // ADD ANOTHER CYCLE
  // Plot cycle2 at x,y location of prev cycle
  cycle2.center_x = cycle1.center_x +  cycle1.x;
  cycle2.center_y = cycle1.center_y + cycle1.y;
  cycle2.wave.center_x = cycle2.center_x;
  // CRUX OF THE CODE : cycle 1 is that base !!
  cycle2.wave.center_y = cycle1.center_y;

  cycle2.draw_ellipse();
  cycle2.draw_rotation(); 
  cycle2.update_theta();
  // cycle2.wave.draw_wave(cycle2.x);
  // cycle2.wave.update_wave(cycle2.y + cycle1.y);
    
  
  // ADD ANOTHER YET AGAIN
  cycle3.center_x = cycle2.center_x +  cycle2.x;
  cycle3.center_y = cycle2.center_y + cycle2.y;
  cycle3.wave.center_x = cycle3.center_x;
  // CRUX OF THE CODE : cycle 1 is that base !!
  cycle3.wave.center_y = cycle1.center_y;

  cycle3.draw_ellipse();
  cycle3.draw_rotation(); 
  cycle3.update_theta();
  cycle3.wave.draw_wave(cycle3.x);
  cycle3.wave.update_wave(cycle2.y + cycle1.y + cycle3.y);

}
