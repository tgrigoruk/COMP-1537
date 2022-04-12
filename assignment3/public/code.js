var myURL = "https://calm-ocean-32732.herokuapp.com";
// myURL = "https://localhost:5001"

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
    url: myURL + "/findUnicornByName",
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
    url: myURL + "/findUnicornByFood",
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
    url: myURL + "/findUnicornByWeight",
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
//     url: myURL + "/filter",
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
    // uList = "<pre>" + JSON.stringify(unicornData, null, 2) + "</pre>";
    displayResults(unicornData);
  } else {
    unicornData.forEach((unicorn) => {
      let unicornDisplay = [];
      if (unicornNameFilter) unicornDisplay.push(unicorn.name);
      if (unicornWieghtFilter) unicornDisplay.push(unicorn.weight);
      uList.push(`<p>${unicornDisplay.join(", ")}</p>`);
    });
    $("#result").html(uList);
  }
}

function displayResults(unicorns) {
  $("#result").html(
    `<table>
      <thead>
        <tr id="uheader">
          <th>ID</th>
          <th>Name</th>
          <th>DOB</th>
          <th>Loves</th>
          <th>Weight</th>
          <th>Gender</th>
          <th>Vampires</th>
        </tr>
      </thead>
      <tbody id="utable"></tbody>
    </table>
          `
  );
  fields = ['_id', 'name', 'dob', 'loves', 'weight', 'gender', 'vampires']
  unicornData.forEach((unicorn) => {
    urow = "";
    fields.forEach((field) => {
      // console.log(field +" is "+value)
      if (field == "loves") {
        urow += "<td><ul>";
        unicorn[field].forEach((love) => {
          urow += `<li>${love}</li>`;
        });
        urow += "</ul></td>";
      } else if (unicorn[field] === undefined) {
        urow += `<td>N/A</td>`;
      } else {
        urow += `<td>${unicorn[field]}</td>`;
      }
    });
    $("#utable").append(`<tr>${urow}</tr>`);
  });
}

function setup() {
  $("#findUnicornByName").click(findUnicornByName);
  $("#findUnicornByFood").click(findUnicornByFood);
  $("#findUnicornByWeight").click(findUnicornByWeight);
  $("#filter").click(filterUnicorn);
}

$(document).ready(setup);
