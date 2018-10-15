function Turtle(name, age) {
  this.name = name;
  this.age = age;
  this.type = "turtle";
  this.image = "turtle.png";
}

function Dog(name, age) {
  this.name = name;
  this.age = age;
  this.type = "dog";
  this.image = "dog.png";
}

function Chicken(name, age) {
  this.name = name;
  this.age = age;
  this.type = "chicken";
  this.image = "chicken.png";
}


var animal = [new Turtle(), new Dog(), new Chicken()];
var names = ["Max", "Oreo", "Toto"];


function generateRandomIndex(maxIndex) {
  this.maxIndex = maxIndex;
  this.randomInt = Math.floor(Math.random() * maxIndex);
  return (this.randomInt);
}

function generateRandomName() {
  randomIndex = generateRandomIndex(names.length);
  randomName = names[randomIndex];
  return randomName;
}

function generateRandomAge() {
  generateRandomIndex(maxIndex)
}