'use strict';

let allStoreLocations = [];

let hoursArray = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00am', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm']

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

StoreLocation.prototype.avgCustomers = function () {  //prototype makes 'this' available within the scope of the protoypes function.
  var min = this.min;
  var max = this.max;
  for (let i = 0; i < hoursArray.length; i++) {
    var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
    this.customersPerHour.push(random);
  }
};


StoreLocation.prototype.avgCookiesPerHour = function () {
  for (let i = 0; i < hoursArray.length; i++) {
    let cookieCalc = Math.ceil(this.customersPerHour[i] * this.avgCookies);
    this.cookiesPerHour.push(cookieCalc);
    this.totalCookies += cookieCalc;
  }
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
};

new StoreLocation('Seattle', 23, 65, 6.3);
new StoreLocation('Tokyo', 3, 24, 1.2);
new StoreLocation('Dubai', 11, 32, 3.7);
new StoreLocation('Paris', 20, 38, 2.3);
new StoreLocation('Lima', 2, 16, 4.6);

storeCreator();
