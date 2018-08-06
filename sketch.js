var blob,dragAng,dragDist,dragStart,grav;

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent('Sketch');
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
  if(dragStart){
  blob.applyVector(random(-5,5),-1);
  dragStart = false;
}
}

function saveBlob(){
  array = [blob.radi, blob.mood, blob.blobness, blob.hue, blob.sat, blob.bri, blob.eyeHeight, blob.eyeDist, blob.eyeRadi, blob.eyeHue, blob.eyeSat, blob.eyeBri];
  document.cookie = "blob="+array;

}
function loadBlob() {
  decodedCookie = decodeURIComponent(document.cookie);
  decodedArray = decodedCookie.split("=");
  array = decodedArray[1].split(",");
  for(var i = 0; i < array.length; i++){
    array[i] = +array[i];
  }
  blob = new Blob(width/2,height/2,array[0],array[1],array[2],array[3],array[4],array[5],array[6],array[7],array[8],array[9],array[10],array[11]);

}
