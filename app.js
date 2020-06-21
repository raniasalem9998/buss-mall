'use strict'

var allProduct = [];
// console.log(allProduct);
var clicks = 0;
var productsSelect = document.getElementById('products');

var previousFirstImageIndex;
var previousSecondImageIndex;
var previousThirdImageIndex;


var firstImage = document.getElementById('first');
var secondImage = document.getElementById('second');
var thirdImage = document.getElementById('third');


var currentFirstImage;
var currentSecondImage;
var currentThirdImage;




function Product(name,path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.timesshown = 0;
  allProduct.push(this);
};



new Product('Bag','../img/bag.jpg');
new Product('Banana', '../img/banana.jpg');
new Product('bathroom', '../img/bathroom.jpg');
new Product('Boots', '../img/boots.jpg');
new Product('Breakfast', '../img/breakfast.jpg');
new Product('Bubblegum', '../img/bubblegum.jpg');
new Product('chair', '../img/chair.jpg');
new Product('cthulhu', '../img/cthulhu.jpg');
new Product('Dog Duck', '../img/dog-duck.jpg');
new Product('Dragon', '../img/dragon.jpg');
new Product('Pet sweep', '../img/pet-sweep.jpg');
new Product('Scissors', '../img/scissors.jpg');
new Product('Shark', '../img/shark.jpg');
new Product('Sweep', '../img/sweep.png');
new Product('Tauntaun', '../img/tauntaun.jpg');
new Product('Unicorn', '../img/unicorn.jpg');
new Product('Usb', '../img/usb.gif');
new Product('Water can', '../img/water-can.jpg');
new Product('Wine glass','../img/wine-glass.jpg');




function displayRandomImages() {

  var forbiddenIndex = [];

  if (clicks > 0) {
    forbiddenIndex = [previousFirstImageIndex, previousSecondImageIndex, previousThirdImageIndex];
  }

  var firstIndex = generateRandomNumber(forbiddenIndex);
  forbiddenIndex.push(firstIndex);
  var secondIndex = generateRandomNumber(forbiddenIndex);
  forbiddenIndex.push(secondIndex);
  var thirdIndex = generateRandomNumber(forbiddenIndex);

  previousFirstImageIndex = firstIndex;
  previousSecondImageIndex = secondIndex;
  previousThirdImageIndex = thirdIndex;

  currentFirstImage = allProduct[firstIndex];
  currentSecondImage = allProduct[secondIndex];
  currentThirdImage = allProduct[thirdIndex];

  firstImage.setAttribute('src', currentFirstImage.path);
  secondImage.setAttribute('src', currentSecondImage.path);
  thirdImage.setAttribute('src', currentThirdImage.path);

  currentFirstImage.timesshown += 1;
  currentSecondImage.timesshown += 1;
  currentThirdImage.timesshown += 1;
 
}

function generateRandomNumber(forbiddenIndex) {

  var allowed;
  var randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * allProduct.length);
    allowed = true;
    for (var i = 0; i < forbiddenIndex.length; i++) {
      if (forbiddenIndex[i] === randomNumber) {
        allowed = false;
      }
    }
  } while (!allowed);

  return randomNumber;
}


displayRandomImages();

// var chooseRounds=document.getElementById('chooseRounds');

// chooseRounds.addEventListener('submit',roundNum);
// var number;
// function roundNum(event){
//  number = event.target.rounds.value;
//   return number;
// }
// roundNum();


productsSelect.addEventListener("click", chooseImage);

function chooseImage(event) {
  if (clicks < 25) {
    var clickElement = event.target;
    var clickElementId = clickElement.id;
    if (clickElementId === "first" || clickElementId === "second" || clickElementId === "third") {
      clicks++;
      if (clickElementId === "second") {
        currentSecondImage.clicks += 1;
      }
      if (clickElementId === "first") {
        currentFirstImage.clicks += 1;
      }
      if (clickElementId === "third") {
        currentThirdImage.clicks += 1;
      }
      displayRandomImages();
    }

  }
  else {

    var results = document.getElementById('results');

    for (var i = 0; i < allProduct.length; i++) {
      var listLi = document.createElement('li');

      var perc = (( allProduct[i].clicks/allProduct[i].timesshown) * 100).toFixed(1);
      listLi.textContent = allProduct[i].name + ' has' + allProduct[i].clicks + ' clickes, and ' + allProduct[i].timesshown + ' times shown, so the average is '+ perc;
      results.appendChild(listLi);
      console.log(allProduct[i].timesshown)
    }

    productsSelect.removeEventListener('click', chooseImage)
  }

};

