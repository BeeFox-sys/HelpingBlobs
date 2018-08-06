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
   if (getCookie('blob') == ''){
     blob = new Blob(width/2,-height);
  } else {
    loadBlob();
  }
   $("#moodLevel").html(blob.mood);
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


  $("#age").html(blob.age+" Hours");
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
  array = [blob.radi, blob.mood, blob.blobness, blob.hue, blob.sat, blob.bri, blob.eyeHeight, blob.eyeDist, blob.eyeRadi, blob.eyeHue, blob.eyeSat, blob.eyeBri, blob.created, blob.hygiene, blob.activity, blob.health, str(blob.name)];
  document.cookie = "blob="+array;

}
function loadBlob() {
  array = getCookie('blob').split(",");
  console.log(array);
  blob = new Blob(width/2,-height,array[0],array[1],array[2],array[3],array[4],array[5],array[6],array[7],array[8],array[9],array[10],array[11], array[12], array[13], array[14],array[15],str(array[16]));

}

  function windowResized() {
  resizeCanvas(windowWidth/3, windowWidth/3);
}

window.onbeforeunload = function(){
  saveBlob();
};

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

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
