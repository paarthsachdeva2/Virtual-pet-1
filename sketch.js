var dog,sadDog,happyDog;
var foodS,foodStock,feedTime,lastFeed,feed,addFood,foodObject


function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database()
  foodObject=new Food()
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObject.display();
  feedTime=database.ref('FeedTime')
  feedTime.on("value",function(data){
    lastFeed=data.val()
  })
  fill(255,255,254);
  textSize(15);
  if(lastFeed>=12){
    text("lastFeed:"+lastFeed%12+"PM",350,30)

  }else if(lastFeed==0){
    text("lastFeed:12 AM",350,30);
  }
  else{
    text("lastFeed:"+lastFeed+"AM",350,30);
  }
  
  
  drawSprites();
}


//function to read food Stock

function readStock(data){
   foodS=data.val()
   foodObject.updateStock(foodS);
}


//function to update food stock and last fed time


//function to add food in stock

function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<=0){
    foodObj.updateStock(foodObj.getFoodStock()*0);
  } else{
    foodObj.updateStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
    Food:foodObject.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}