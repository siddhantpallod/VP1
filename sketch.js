//Create variables here

var dogImg, happyDog, database, foodS, foodStock;
var dog;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87);


  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

  drawSprites();
  //add styles here

  fill(255,255,254);
  stroke("black");
  text("Food Remaining: " + foodS ,170,150);
  textSize(13);
  text("Note: Press Up Arrow key to feed Drago Milk!!",130,10,300,20);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(){

  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }

  database.ref('/').update({
    Food : x
  })
}

