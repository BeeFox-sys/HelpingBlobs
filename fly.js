class Fly{

  constructor(){
    this.size = random(3,10);
    this.pos = createVector(random(this.size, width-this.size),random(this.size, height/5*4));
    this.acc = createVector(0,0);
    this.vel = createVector(0,0);
    this.vel.limit(.5);

  }

  drawFly(){
    fill(0,70,10);
    stroke(0,70,10);
    strokeWeight(2)
    ellipse(this.pos.x,this.pos.y, this.size, this.size)
  }

  updateFly(){
    if(frameCount % 10 == 0){
    this.acc.add(random(-0.2,0.2),random(-0.2,0.2));
  }
    this.vel.add(this.acc);
    this.acc.set(0,0);
    if(this.pos.x > width-this.size || this.pos.x < this.size){
      this.vel.set(-this.vel.x,0)
    }
    if(this.pos.y < this.size){
      this.vel.set(0, -this.vel.y)
    }
    if(this.pos.y > height/5*4){
      this.vel.add(0,-0.1)
    }
    this.pos.add(this.vel)

  }

}
