class Blob{

constructor(xpos, ypos, r, m=-1, b,ch,cs,cb,eh,ed,er,ehu,es,eb,ag, hy=-1, ac=-1, hel=-1, name){
  this.radi =  +r || random(25, 100);
  this.blobness = +b || random(2, 2.8);
  this.hue = +ch || random(40, 270);
  this.sat = +cs || random(50, 100);
  this.bri = +cb || random(50, 100);
  this.eyeHeight = +eh || constrain(random(-this.radi),-this.radi+25,0);
  this.eyeDist = +ed || random(25, this.radi+this.eyeHeight);
  this.eyeRadi = +er || random(10,this.radi/5);
  this.eyeHue = +ehu || random(360);
  this.eyeSat = +es || random(100);
  this.eyeBri = +eb || random(50,100);
  this.eyeColour = color(this.eyeHue,this.eyeSat,this.eyeBri)
  this.pos =  createVector(0,0);
  if(xpos != null && ypos != null){
    this.pos.set(xpos,ypos);
  }else{
    this.pos.set(random(this.radi,width-this.radi),random(this.radi, height-pow(log(this.radi),this.blobness)));
  }
  this.acc = createVector(0,0);
  this.vel = createVector(0,0);
  this.vel.limit(8);
  this.created = +ag || Math.floor(((Date.now() / 1000)/60)/60)
  this.age = Math.floor(((Date.now() / 1000)/60)/60) - this.created;
  this.release = false;

  //Stats
  console.log(m,hy,hel,ac)
  if(+m != -1){this.mood = +m}else{this.mood = 100};
  if(+hy != -1){this.hygiene = +hy}else{this.hygiene = 100};
  if(+hel != -1){this.health = +hel}else{this.health = 100};
  if(+ac != -1){this.activity = +ac}else{this.activity = 100};
  this.name = name || null;
  console.log(this.name)
  if(this.name == null){
    this.name = window.prompt("Name your new blob!", "Blobby") || "Blobby";
  }
  this.actSat = map(this.activity,0,100,50,0);
  this.blobFill = color(this.hue, this.sat-this.actSat, this.bri);
  this.blobStroke = color(this.hue, this.sat-this.actSat, (this.bri-25));
}

drawBlob(){
  fill(this.blobFill);
  stroke(this.blobStroke);
  strokeWeight(5);
  applyMatrix();
  translate(this.pos.x, this.pos.y);
  beginShape();
  for (var i = 0; i <= TWO_PI; i+=0.1) {;
    var x = this.radi*cos(i);
    var y = this.radi*sin(i);
    if (y > 0) {
      y = pow(log(y), this.blobness);
    }
    vertex(x, y);
  }
  vertex(this.radi*cos(0), this.radi*sin(0));
  endShape();
  fill(this.eyeColour);
  translate(this.eyeDist, this.eyeHeight);
  ellipse(0, 0, this.eyeRadi, this.eyeRadi);
  translate(-(this.eyeDist*2), 0);
  ellipse(0, 0, this.eyeRadi, this.eyeRadi);
  resetMatrix();
}

applyVector(x,y){
  this.acc.add(x,y);
}

update(){
  this.vel.add(this.acc);
  this.acc.set(0,0);
  if(!this.release){
  if(this.pos.y > height){

  }else if(this.pos.y>=height-100 && this.vel.y > 0){
    this.vel.set(0,0);
  }
  if(this.pos.y > height+this.radi){
    this.pos.set(width/2,-height);
    this.applyVector(random(-5,5),random(-10,-3));
  }
  if(this.pos.x >= width-this.radi && this.vel.x > 0){
    this.vel.set(-this.vel.x, this.vel.y);
  } else if(this.pos.x <= this.radi && this.vel.x < 0){
    this.vel.set(-this.vel.x, this.vel.y);
  }
  if(random(100)<map(this.mood,0,100,0.2,2)&&this.pos.y>=height-100){
    this.applyVector(random(-5,5),random(-10,-3));
  }
  if((this.pos.x >= width+this.radi-10||this.pos.x <= -this.radi+10)&&this.pos.y>=height-100){
    this.applyVector(random(-5,5),random(-10,-3));
  }
}else{
  if(this.pos.y>=height-100 && this.vel.y > 0){
    this.vel.set(0,0);
  }
  if(frameCount % 30 == 0 && this.pos.y>=height-100){
    this.applyVector(3,-4);
  }
  if(this.pos.x>width+(this.radi*2)){
    newBlob();
  }
}
  this.pos.add(this.vel);
  this.age = Math.floor(((Date.now() / 1000)/60)/60) - this.created;
  this.actSat = map(this.activity,0,100,50,0);
  this.blobFill = color(this.hue, this.sat-this.actSat, this.bri);
  this.blobStroke = color(this.hue, this.sat-this.actSat, (this.bri-25));
}

getJSON() {
  return({'radi':this.radi, 'mood':this.mood, 'blobness':this.blobness, 'hue':this.hue, 'sat':this.sat, 'bri':this.bri,
  'eyeHeight':this.eyeHeight, 'eyeDist':this.eyeDist, 'eyeRadi':this.eyeRadi, 'eyeHue':this.eyeHue, 'eyeSat':this.eyeSat,
  'eyeBri':this.eyeBri, 'created':this.created, 'hygiene':this.hygiene, 'activity':this.activity, 'health':this.health,
  'name':str(this.name)});
}


//end of class Blob
}
