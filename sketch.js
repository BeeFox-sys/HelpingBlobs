var blob,dragAng,dragDist,dragStart, grav;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  bg = loadImage("meadow.jpg");
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     console.log("Mobile");
   }
   grav = createVector(0,.5);
   blob = new Blob(width/2,height/2);
}

function draw() {
  image(bg,0,0,width,height);
  if(!dragStart && frameCount > 30){
  blob.applyVector(grav.x,grav.y);
  blob.update();
}
  blob.drawBlob();
}

function mousePressed(){
  if(dist(mouseX,mouseY,blob.pos.x,blob.pos.y) <= blob.radi){
    dragStart = true;
  }
}

function mouseDragged(){
  if(dragStart){
    blob.pos.set(mouseX,mouseY);
  }
}

function mouseReleased(){
  blob.applyVector(random(-5,5),-1)
  dragStart = false;
}
