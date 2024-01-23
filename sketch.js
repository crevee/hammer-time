let nails = [];
let nailsStep = 0;

let song;
let nailPlace;
let nailHammerHit;

let handImg;
let hammerImg;
let nailImg;

let handX = -30;
let handY = -40;
let hammerAngle = 0;

let FPS = 60;

let isHandPlacing = false;
let isSpacePressed = false;


class Nail{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.status = 0;
    //0 : nomal, 1 : studded:
  }
  update(){
    this.x += 4.5;
  }
  
  display(){
    if(this.status === 0 ){
     image(nailImg, this.x, this.y, 38, 96); 
    }else if(this.status === 1){
      image(nailImg, this.x, this.y + 85, 38, 96);
    }
  }
}

function preload(){
  song = loadSound("song.mp3");
  nailPlace = loadSound("SFX_NailPlace.mp3");
  nailHammerHit = loadSound("SFX_NailHammerHit.mp3");
  
  handImg = loadImage("hand.png")
  nailImg = loadImage("nail.png");
  hammerImg = loadImage("hammer.png");
}

function setup() {
  createCanvas(800, 500);
  frameRate(FPS);
  rectMode(CENTER);
  imageMode(CENTER);
  
  song.play();
  //console.log(song.currentTime());
}

function draw() {
  background(220, 221, 198);
  
  strokeWeight(3);
  stroke(80, 80, 80);
  line(0, 395, 800, 395);
  
  let notes = [7.3, 7.8, 8.3];
  
  if(song.currentTime() > notes[nailsStep]){
    isHandPlacing = true;
    
    setTimeout(function(){
      nailPlace.play();
      nails.push(new Nail(80, 348));
    }, 25);

    nailsStep++;
  }
  
  
  //Hand
  if(isHandPlacing){  
    handX += 25;
    handY += 25;
    
    if(handX > 140){
      isHandPlacing = false;
    }
  }else{
      handX -= 25;
      handY -= 25;
    
    if(handX < -30){
      handX = -30;
      handY = -40;
    }
  }
  
  image(handImg, handX, handY, 1024, 500);
  
  
  //Hammer
  if(isSpacePressed){
    for(let nail of nails){
      if(nail.status === 0 && nail.x > 550 && nail.x < 600){
        setTimeout(function(){
          nailHammerHit.play();
          nail.status = 1;
        }, 25);
      }
    }
    hammerAngle -= PI / 15;
    
    if(hammerAngle < 0){
      isSpacePressed = false;
    }
  }else if(!isSpacePressed && hammerAngle < PI / 2) {
    hammerAngle += PI / 15;
  }
  
  //Goal Line
  line(575, 0, 575, 500);
  
  push();
  translate(1024, 300);
  rotate(hammerAngle);
  image(hammerImg, 0, 0, 1024, 1000);
  pop();
  
  
  //Nails
  for(let nail of nails){
    nail.update();
    nail.display();
  }
}

function keyPressed(){
  if(key ===" "){
    isSpacePressed = true;
  }
}