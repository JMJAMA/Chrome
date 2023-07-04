
let img,img1,img2,img3,img4;

let pg,pg1,pg2;

function preload(){


  img = loadImage("pattern1.jpg");
  img1 = loadImage("pattern2.jpg");
  img2 = loadImage("pattern3.jpg");
  img3 = loadImage("pattern4.jpg");
  img4 = loadImage("pattern4.jpg");


}


function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);

  pg = createGraphics(width,height,WEBGL);
  pg1 = createGraphics(width,height,WEBGL);
  pg2 = createGraphics(width,height,WEBGL);

 

  // img.resize(width,0);
  // img1.resize(width,0);
  // img2.resize(width,0);
}

function draw() {
  background(0);

  let mx = map(mouseX,0,width-200,0.22,0.34);
   let mpg = map(mouseX,0,width,0.2,0.33);
  

  pg.push();
  pg.imageMode(CENTER);
  pg.scale(mpg);
  pg.image(img,0+(mpg*2500),0);

  pg.pop();




  push();
  imageMode(CENTER);
  
  image(pg,0,0);
  noStroke();
  fill(0,0,0,100);
  rect(-width/2,-height/2,width,height);
  pop();


  let fadeout = map(mouseX,0,width/2,0,255);
  

   if(mouseX < width/2){

   
  push();
  //translate(-width/2,-height/2);
  scale(mx);
  blendMode(SCREEN,0);
  imageMode(CENTER);
  
  image(img3,width/2-(mpg*3000),height/2);
  pop();

   }

   else{

    push();
  //translate(-width/2,-height/2);
  scale(mx);
  blendMode(SCREEN);
  imageMode(CENTER);
  image(img2,width/2-(mpg*1500),height/2);
  pop();



   }


  //image(img2,0,0);
  

  


}
