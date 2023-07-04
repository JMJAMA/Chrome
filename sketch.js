let rmImg;
let myShader;

let h;
let m;
let s;
let startTime;



function preload() {
  rmImg = loadImage('pattern3 comp.jpeg');
  
  myShader = loadShader('displayTexture.vert', 'displayTexture.frag');
}
function setup() {
  h = hour();
  m = minute();
  s = second();
  startTime = h*m*s;
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  
}

function draw(){
  
  shader(myShader);
  myShader.setUniform("uTexture0", rmImg);
  myShader.setUniform("uResolution", [width, height]);
  myShader.setUniform("uTime", millis()/1000);
  myShader.setUniform("uStartTime", startTime);
  
  rect(0,0,width,height);
}