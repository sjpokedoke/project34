var dog, happydog, database, foodS, foodstock;

function preload(){
  dogimg = loadImage("dogImg.png");
  happydogimg = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250, 250, 10, 10);
  dog.addImage("dog", dogimg);
  dog.scale = 0.3;

  foodstock = database.ref('Food');
  foodstock.on("value", readStock);
}

function draw() {  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage("dog", happydogimg)
  }

  drawSprites();
  
  fill("white")
  text("Food Stock: "+ foodS, 100, 100);
  text("Note: Press up arrow key to feed Biscuit milk", 100, 50);
}

function readStock(data) {
  foodS = data.val();
}
function writeStock(x) {

  if(x<=0){
    x=0
  } else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}