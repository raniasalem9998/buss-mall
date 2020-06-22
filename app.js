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



var nameArray = [];
function Product(name, path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.timesshown = 0;
  nameArray.push(this.name);
  allProduct.push(this);
};



new Product('Bag', 'img/bag.jpg');
new Product('Banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('Boots', 'img/boots.jpg');
new Product('Breakfast', 'img/breakfast.jpg');
new Product('Bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('Dog Duck', 'img/dog-duck.jpg');
new Product('Dragon', 'img/dragon.jpg');
new Product('Pet sweep', 'img/pet-sweep.jpg');
new Product('Scissors', 'img/scissors.jpg');
new Product('Shark', 'img/shark.jpg');
new Product('Sweep', 'img/sweep.png');
new Product('Tauntaun', 'img/tauntaun.jpg');
new Product('Unicorn', 'img/unicorn.jpg');
new Product('Usb', 'img/usb.gif');
new Product('Water can', 'img/water-can.jpg');
new Product('Wine glass', 'img/wine-glass.jpg');




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

var chooseRounds = document.getElementById('chooseRounds');
var rounds = document.getElementById('rounds');
chooseRounds.addEventListener('submit', roundNum);
var number = 25;
function roundNum(event) {
  event.preventDefault();
  number = event.target.rounds.value;
  return number;
}


productsSelect.addEventListener("click", chooseImage);

function chooseImage(event) {
  if (clicks < number) {
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

    // var results = document.getElementById('results');


    resultChart();
    productsSelect.removeEventListener('click', chooseImage)
  }

};







var clickesArray = [];
console.log(clickesArray)
var showArray = [];
var percArray = [];
function resultChart() {
  for (var i = 0; i < allProduct.length; i++) {
    // var listLi = document.createElement('li');

    var perc = ((allProduct[i].clicks / allProduct[i].timesshown) * 100).toFixed(1);
    // listLi.textContent = allProduct[i].name + ' has' + allProduct[i].clicks + ' clickes, and ' + allProduct[i].timesshown + ' times shown, so the average is '+ perc;
    // results.appendChild(listLi);
    clickesArray.push(allProduct[i].clicks);
    showArray.push(allProduct[i].timesshown);
    percArray.push(perc);

  }







  var ctx = document.getElementById('chart').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [
        {
          label: 'percent of Votes',
          data: percArray,
          backgroundColor:

            'rgba(153, 102, 255, 0.3)'
          ,
          borderColor:
            'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'clickes',
          data: clickesArray,
          backgroundColor:

            'rgba(140, 80, 200, 0.3)'
          ,
          borderColor:
            'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'times shown',
          data: showArray,
          backgroundColor:

            'rgba(153, 102, 100, 0.3)'
          ,
          borderColor:
            'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });


}