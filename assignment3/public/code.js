var heroku = "https://calm-ocean-32732.herokuapp.com";

let unicornData = null;
function process_res(data) {
  unicornData = data;
  if (unicornData !== null) {
    filterUnicorn(unicornData);
  } else {
    console.log("No unicorns have been requested yet!");
  }
}

function findUnicornByName() {
  console.log("findUnicornByName() got called");
  console.log($("#unicornName").val());

  $.ajax({
    url: heroku + "/findUnicornByName",
    type: "POST",
    data: {
      unicornName: $("#unicornName").val(),
    },
    success: process_res,
  });
}

function findUnicornByFood() {
  carrotIsChecked = "unchecked";
  appleIsChecked = "unchecked";

  if ($("#carrot").is(":checked")) carrotIsChecked = "checked";

  if ($("#apple").is(":checked")) appleIsChecked = "checked";

  $.ajax({
    url: heroku + "/findUnicornByFood",
    type: "POST",
    data: {
      carrotIsChecked: carrotIsChecked,
      appleIsChecked: appleIsChecked,
    },
    success: process_res,
  });
}

function findUnicornByWeight() {
  lowerWeight = $("#lowerWeight").val();
  higherWeight = $("#higherWeight").val();
  console.log(lowerWeight + " " + higherWeight);

  $.ajax({
    url: heroku + "/findUnicornByWeight",
    type: "POST",
    data: {
      lowerWeight: lowerWeight,
      higherWeight: higherWeight,
    },
    success: process_res,
  });
}

// function filter() {
//   unicornNameFilter = $("#unicornNameFilter").is(":checked") ? 1 : 0;
//   unicornWieghtFilter = $("#unicornWieghtFilter").is(":checked") ? 1 : 0;
//   $.ajax({
//     url: heroku + "/filter",
//     type: "POST",
//     data: {
//       unicornFilter: {name: unicornNameFilter, weight: unicornWieghtFilter}
//     },
//     success: process_res,
//   });
// }

function filterUnicorn() {
  if (unicornData === null) {
    console.log("No unicorns have been requested yet!");
    return;
  }
  unicornNameFilter = $("#unicornNameFilter").is(":checked") ? 1 : 0;
  unicornWieghtFilter = $("#unicornWieghtFilter").is(":checked") ? 1 : 0;
  let uList = [];
  if (!(unicornNameFilter || unicornWieghtFilter)) {
    uList = "<pre>" + JSON.stringify(unicornData, null, 2) + "</pre>";
  } else {
    unicornData.forEach((unicorn) => {
      let unicornDisplay = [];
      if (unicornNameFilter) unicornDisplay.push(unicorn.name);
      if (unicornWieghtFilter) unicornDisplay.push(unicorn.weight);
      uList.push(`<p>${unicornDisplay.join(", ")}</p>`);
    });
  }
  $("#result").html(uList);
}

function setup() {
  $("#findUnicornByName").click(findUnicornByName);
  $("#findUnicornByFood").click(findUnicornByFood);
  $("#findUnicornByWeight").click(findUnicornByWeight);
  $("#filter").click(filterUnicorn);
}

$(document).ready(setup);
