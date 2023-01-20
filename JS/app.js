'use strict';

let allStoreLocations = [];

let hoursArray = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00am', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];

function StoreLocation(location, min, max, avgCookies) {
  this.location = location;
  this.min = min;
  this.max = max;
  this.avgCookies = avgCookies;
  this.totalCookies = 0;

  //this.hoursList = [];
  this.customersPerHour = [];
  this.cookiesPerHour = [];

  allStoreLocations.push(this);

  console.log(this);
}

function storeCreator() {
  for (let i = 0; i < allStoreLocations.length; i++) {
    allStoreLocations[i].avgCustomers();
    allStoreLocations[i].avgCookiesPerHour();
    allStoreLocations[i].renderTableData();
  }
}

StoreLocation.prototype.avgCustomers = function () { //prototype makes 'this' available within the scope of the protoypes function.
  let min = this.min;
  let max = this.max;
  for (let i = 0; i < hoursArray.length; i++) {
    let random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
    this.customersPerHour.push(random);
  }
};

StoreLocation.prototype.avgCookiesPerHour = function () {
  for (let i = 0; i < hoursArray.length; i++) {
    let cookieCalc = Math.ceil(this.customersPerHour[i] * this.avgCookies);
    this.cookiesPerHour.push(cookieCalc);
    this.totalCookies += cookieCalc;
  }
  console.log(this.totalCookies);
};

StoreLocation.prototype.dailyLocationTotal = function() {
  var sumOfCookies = 0;
  for (var i = 0; i < this.cookiesPerHour.length; i++) {
    sumOfCookies = this.cookiesPerHour[i] + sumOfCookies;
  }
  return sumOfCookies;
};

StoreLocation.prototype.renderTableData = function () {
  let tableBody = document.getElementById('tableBody');
  let tableRow = document.createElement('tr');
  tableBody.appendChild(tableRow);

  let cellOne = document.createElement('td');
  tableRow.appendChild(cellOne);

  cellOne.innerHTML = this.location;

  for (let i = 0; i < hoursArray.length; i++) {
    let nextCell = document.createElement('td');

    nextCell.innerHTML = this.cookiesPerHour[i];
    tableRow.appendChild(nextCell);

  }
  let cellTotal = document.createElement('td');
  cellTotal.innerHTML = this.totalCookies;
  tableRow.appendChild(cellTotal);

  let tableFootCell = document.createElement('th');
  tableFootCell.innerHTML = 'Totals';
  tableRow.appendChild(tableFootCell);

  let superTotal = 0;
  for (let i = 0; i < allStoreLocations.length; i++) {
    superTotal = superTotal + allStoreLocations[i].dailyLocationTotal();
  }
  tableFootCell = document.createElement('td');
  tableFootCell.innerHTML = superTotal;
  tableRow.appendChild(tableFootCell);
  tableRow.id = 'footer';
  tableBody.appendChild(tableRow);
};


new StoreLocation('Seattle', 23, 65, 6.3);
new StoreLocation('Tokyo', 3, 24, 1.2);
new StoreLocation('Dubai', 11, 32, 3.7);
new StoreLocation('Paris', 20, 38, 2.3);
new StoreLocation('Lima', 2, 16, 4.6);

storeCreator();

let newStore = document.getElementById('addLocation');

newStore.addEventListener('submit', customCity);

function customCity(event) {
  event.preventDefault();

  let valueOne = event.target.cityName.value; //target.cityName.value allows you to target the values of the cityName form ID. The event part in the beginning just lets it know each variable is being set equivalent to the events
  let valueTwo = parseInt(event.target.min.value);
  let valueThree = parseInt(event.target.max.value);
  let valueFour = parseFloat(event.target.avgCookies.value);

  let newStoreInput = new StoreLocation(valueOne, valueTwo, valueThree, valueFour);

  allStoreLocations.push(newStoreInput);

  newStoreInput.avgCustomers();
  newStoreInput.avgCookiesPerHour();
  newStoreInput.renderTableData();

}


/*
function renderTableFooter (allLocations) {
  var table = document.getElementById('cookieData');
  var row = document.createElement('tr');
  var tableFootCell = document.createElement('th');
  var hoursOfDay = 14;
  tableFootCell.textContent = 'Totals';
  row.appendChild(tableFootCell);

  var cookieTotalArray = [];
  // to look at 14 hours of the day for 14 totals cells
  for (var i = 0; i < hoursOfDay; i++) {
    var cookieTotal = 0;
    // add up each index from all locations
    for (var j = 0; j < allLocations.length; j++) {
      cookieTotal = cookieTotal + allLocations[j].cookiesPerHourArray[i];
    }
    cookieTotalArray.push(cookieTotal);
    tableFootCell = document.createElement('td');
    tableFootCell.textContent = cookieTotalArray[i];
    row.appendChild(tableFootCell);
  }

  var superTotal = 0;
  for (var i = 0; i < allLocations.length; i++) {
    superTotal = superTotal + allLocations[i].dailyLocationTotal();
  }
  tableFootCell = document.createElement('td');
  tableFootCell.textContent = superTotal;
  row.appendChild(tableFootCell);
  row.id = 'footer';
  table.appendChild(row);
};

  let footerElement = document.getElementById('footer');
  footerElement.parentNode.removeChild(footerElement); // referenced where I got this in the README


  renderTableFooter(allStoreLocations); 

  */
