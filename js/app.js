'use strict'

let leftImageElement = document.getElementById('left-image');
let centerImageElement = document.getElementById('center-image');
let rightImageElement = document.getElementById('right-image');

let leftImageIndex;
let centerImageIndex;
let rightImageIndex;

let maxClicks = 25;
let userClicks = 0;

let productShown = [];

let productNames = [];

let productVotes = [];




function MallProduct(pName, source,) {
  this.pName = pName;
  this.source = source;
  this.shown = 0;
  this.votes = 0;
  MallProduct.products.push(this);
  productNames.push(pName)

}

MallProduct.products = [];


new MallProduct('bag.jpg', 'images/bag.jpg');
new MallProduct('banana.jpg', 'images/banana.jpg');
new MallProduct('bathroom.jpg', 'images/bathroom.jpg');
new MallProduct('boots.jpg', 'images/boots.jpg');
new MallProduct('breakfast.jpg', 'images/breakfast.jpg');
new MallProduct('bubblegum.jpg', 'images/bubblegum.jpg');
new MallProduct('chair.jpg', 'images/chair.jpg');
new MallProduct('cthulhu.jpg', 'images/cthulhu.jpg');
new MallProduct('dog-duck.jpg', 'images/dog-duck.jpg');
new MallProduct('dragon.jpg', 'images/dragon.jpg');
new MallProduct('pen.jpg', 'images/pen.jpg');
new MallProduct('pet-sweep.jpg', 'images/pet-sweep.jpg');
new MallProduct('scissors.jpg', 'images/scissors.jpg');
new MallProduct('shark.jpg', 'images/shark.jpg');
new MallProduct('sweep.png', 'images/sweep.png');
new MallProduct('tauntaun.jpg', 'images/tauntaun.jpg');
new MallProduct('unicorn.jpg', 'images/unicorn.jpg');
new MallProduct('usb.gif', 'images/usb.gif');
new MallProduct('water-can.jpg', 'images/water-can.jpg');
new MallProduct('wine-glass.jpg', 'images/wine-glass.jpg');





function generateRandomIndex() {
  return Math.floor(Math.random() * MallProduct.products.length);
}

// console.log(generateRandomIndex());

// console.log(MallProduct.products);



function renderThreeImages() {
  leftImageIndex = generateRandomIndex();
  // centerImageIndex = generateRandomIndex()
  // rightImageIndex = generateRandomIndex();

  do {
    centerImageIndex = generateRandomIndex();
    rightImageIndex = generateRandomIndex();
  } while ((leftImageIndex === centerImageIndex) || (centerImageIndex === rightImageIndex) || (leftImageIndex === rightImageIndex))

  leftImageElement.src = MallProduct.products[leftImageIndex].source;
  MallProduct.products[leftImageIndex].shown++;

  centerImageElement.src = MallProduct.products[centerImageIndex].source;
  MallProduct.products[centerImageIndex].shown++;

  rightImageElement.src = MallProduct.products[rightImageIndex].source;
  MallProduct.products[centerImageIndex].shown++;
}

renderThreeImages();



leftImageElement.addEventListener('click', handleUserClick);
centerImageElement.addEventListener('click', handleUserClick);
rightImageElement.addEventListener('click', handleUserClick);



function handleUserClick(event) {
  userClicks++;

  if (userClicks < maxClicks) {
    if (event.target.id === 'left-image') {
      MallProduct.products[leftImageIndex].votes++
    } else if (event.target.id === 'center-image') {
      MallProduct.products[centerImageIndex].votes++
    } else {
      MallProduct.products[rightImageIndex].votes++
    }
    renderThreeImages();
  } else {
    let list = document.getElementById('results-list');
    let productResult;
    for (let i = 0; i < MallProduct.products.length; i++) {
      productResult = document.createElement('li');
      list.appendChild(productResult);
      productResult.textContent = `${MallProduct.products[i].pName} products, ${MallProduct.products[i].votes} votes, ${MallProduct.products[i].shown} shown`;
    }

    leftImageElement.removeEventListener('click', handleUserClick);
    centerImageElement.removeEventListener('click', handleUserClick);
    rightImageElement.removeEventListener('click', handleUserClick);

    for (let i = 0; i < MallProduct.products.length; i++) {
      productVotes.push(MallProduct.products[i].votes);
      productShown.push(MallProduct.products[i].shown);
    }
    viewChart();
  }
}



function viewChart() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: productNames,
      datasets: [{
        label: productNames,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: productVotes
      },
      {
        label: productNames,
        backgroundColor: 'red',
        borderColor: 'red',
        data: productShown
      }]
    },

    // Configuration options go here
    options: {}
  });
}
