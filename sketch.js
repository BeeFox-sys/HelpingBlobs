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
   lastHours = int(Math.floor(((Date.now() / 1000)/60)/60)) - localStorage.laston
   if(lastHours == 1){
     $("#lastOn").html(lastHours+" Hour ago");
 } else if(+lastHours>=48*7){
   $("#lastOn").html(int(+lastHours/24/7)+" Weeks ago");
 } else if(+lastHours>=24*7){
   $("#lastOn").html(int(+lastHours/24/7)+" Week ago");
 } else if(+lastHours>=24){
   $("#lastOn").html(int(+lastHours/24)+" Day ago");
 }else if(+lastHours>=48){
   $("#lastOn").html(int(+lastHours/24)+" Days ago");
 } else{
     $("#lastOn").html(lastHours+" Hours ago");
 }
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
  blobJSON = blob.getJSON();
  localStorage.setItem('blob', JSON.stringify(blobJSON));
  localStorage.setItem('laston',  int(Math.floor(((Date.now() / 1000)/60)/60)));
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
