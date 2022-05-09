// var myURL = "https://calm-ocean-32732.herokuapp.com";
myURL = "http://localhost:5001";

function process_res(data) {
  console.log(data);
  // create list of unicorn buttons
  var uList = `<ol id="uList">`;
  data.forEach((unicorn) => {
    uList += `<li><button class="displayUnicorn" id="${unicorn.name}">${unicorn.name}</li>`;
  });
  $("#unicorn-buttons").html(uList + "</ol>");
  $(".displayUnicorn").click(displayUnicorn);
}

function process_unicorn(data) {
  console.log(data[0]);
  var uData = `<ul id="uData">`;
  Object.entries(data[0]).forEach(([key, val]) => {
    console.log(key + " + " + val);
    if (key == "loves") {
      uData += `<ul>`;
      val.forEach((love) => {
        uData += `<li>${love}</li>`;
      });
      uData += `</ul>`;
    } else {
      uData += `<li>${val}</li>`;
    }
  });
  console.log(uData);
  $("#unicorn-data").html(uData + "</ul>");
}

function getAllUnicorns() {
  console.log("getAllUnicorns() got called");
  $.ajax({
    url: myURL + "/getAllUnicorns",
    type: "POST",
    success: process_res,
  });
}

function displayUnicorn() {
  console.log(`displayUnicorn() got called on ${this.id}`);
  $.ajax({
    url: myURL + "/displayUnicorn",
    type: "POST",
    data: {
      unicornName: this.id,
    },
    success: process_unicorn,
  });
}

function setup() {
  $("#allUnicorns").click(getAllUnicorns);
}

$(document).ready(setup);
