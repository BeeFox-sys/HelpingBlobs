var blob,dragAng,dragDist,dragStart,grav,flies;

function setup() {
  canvas = createCanvas(windowWidth/3, windowWidth/3);
  canvas.parent('Sketch');
  colorMode(HSB);
  bg = loadImage("meadow.jpg");
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     console.log("Mobile");
   }
   grav = createVector(0,.5);
    if (localStorage.blob == undefined){
     blob = new Blob(width/2,-height);
   } else {
     loadBlob();
   }
    $("#lastOn").html(localStorage.lastOn);
 }
 flies = []

function draw() {
  image(bg,0,0,width,height);
  if(!dragStart && frameCount > 30){
  blob.applyVector(grav.x,grav.y);
  blob.update();
}
  blob.drawBlob();
  for(var i = 0; i < flies.length; i++){
    flies[i].updateFly()
    flies[i].drawFly()
  }
  stroke(0);
  noFill()
  strokeWeight(5);
  rect(0,0,width-1,height-1);

  if(blob.age == 1){
    $("#age").html(blob.age+" Hour");
} else if(blob.age>48*7){
  $("#age").html(int(blob.age/24/7)+" Weeks");
} else if(blob.age>48){
  $("#age").html(int(blob.age/24)+" Days");
} else{
    $("#age").html(blob.age+" Hours");
}
  $("#HealthBar").css("width", blob.health+"%")
  $("#MoodBar").css("width", blob.mood+"%")
  $("#HygieneBar").css("width", blob.hygiene+"%")
  $("#ActivityBar").css("width", blob.activity+"%")
  $("#blobName").html("<h1><b>"+blob.name+"</h1></b>")
  $("#currentTime").html(Math.floor(((Date.now() / 1000)/60)/60))

  if(blob.health == 0 && !blob.release){
    window.alert(blob.name+" felt uncared for. \nThey ran away!");
    blob.release = true;
  }

  if(map(Math.round(blob.hygiene/10),0,10,10,0) > flies.length){
    flies.push(new Fly());
  }else if(map(Math.round(blob.hygiene/10),0,10,10,0) < flies.length){
    flies.splice(flies.length-1, 1)
  }

}

function mousePressed(){
  if(dist(mouseX,mouseY,blob.pos.x,blob.pos.y) <= blob.radi && !blob.release){
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
}
dragStart = false;
}

function saveBlob(){
  blobJSON = {'radi':blob.radi, 'mood':blob.mood, 'blobness':blob.blobness, 'hue':blob.hue, 'sat':blob.sat, 'bri':blob.bri,
  'eyeHeight':blob.eyeHeight, 'eyeDist':blob.eyeDist, 'eyeRadi':blob.eyeRadi, 'eyeHue':blob.eyeHue, 'eyeSat':blob.eyeSat,
  'eyeBri':blob.eyeBri, 'created':blob.created, 'hygiene':blob.hygiene, 'activity':blob.activity, 'health':blob.health,
  'name':str(blob.name)};
  localStorage.setItem('blob', JSON.stringify(blobJSON));
  localStorage.setItem('lastOn',  Math.floor(((Date.now() / 1000)/60)/60))
}
function loadBlob() {
  blobJSON = eval("(" + localStorage.blob + ')');
  console.log(blobJSON);
  blob = new Blob(width/2, -height, blobJSON.radi, blobJSON.mood, blobJSON.blobness, blobJSON.hue, blobJSON.sat,
  blobJSON.bri, blobJSON.eyeHeight, blobJSON.eyeDist, blobJSON.eyeRadi, blobJSON.eyeHue, blobJSON.eyeSat,
  blobJSON.eyeBri, blobJSON.created, blobJSON.hygiene, blobJSON.activity, blobJSON.health, blobJSON.name);

}

  function windowResized() {
  resizeCanvas(windowWidth/3, windowWidth/3);
}

window.onunload = function(){
  saveBlob();
};

function releaseBlob() {
  if(window.confirm("Release "+blob.name+"? They'll be gone forever!")){
    blob.release = true;
  }
}

function newBlob(){
  blob = new Blob(width/2, -height);
}
function valBetween(v, min, max) {
    return (Math.min(max, Math.max(min, v)));
}
