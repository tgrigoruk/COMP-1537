var currentNumberOfPages = null;
var movies = null;
var currPage = 1;
var pageSize = 3;
var numberOfPageButtons = 5;


function getMovieData() {
  currPage = 1;
  displayPageNum(currPage);
  movie = $("#movie-title").val();
  $.ajax({
    url: `https://api.themoviedb.org/3/search/movie?api_key=bab41f87cd616dd4eb77708d7f29e2dc&query=${movie}`,
    type: "GET",
    success: (data) => {
      $("#movies-go-here").empty();
      movies = data.results;
      currentNumberOfPages = Math.ceil(movies.length / pageSize);
      if (currentNumberOfPages) {
        currPage = 1;
        updatePageButtons(currPage);
        $("#page-buttons-container").show();
        displayMovies(currPage);
      } else {
        $("#page-buttons-container").hide();
        $("#display-page-num").text("No movies found!");
      }
    },
  });
}

function displayMovies(page) {
  // console.log(movies);
  $("#movies-go-here").empty();
  firstMovieInPageIndex = (page - 1) * pageSize;
  lasttMovieInPageIndex = Math.min(firstMovieInPageIndex + pageSize);
  for (let i = firstMovieInPageIndex; i < lasttMovieInPageIndex; i++) {
    createCardFromTemplate(movies, i);
  }
}

function createCardFromTemplate(movies, index) {
  let cardTemplate = document.querySelector("#movieCardTemplate");
  let newcard = cardTemplate.content.cloneNode(true);
  newcard.querySelector(".title").innerHTML = movies[index].original_title;
  newcard.querySelector(".overview").innerHTML = movies[index].overview;
  newcard.querySelector(".poster").src =
    "https://image.tmdb.org/t/p/w200" + movies[index].poster_path;
  // give unique id to each movie
  let movie_id = "movie-" + index;
  newcard.querySelector(".movie-card").id = movie_id;
  document.getElementById("movies-go-here").appendChild(newcard);
  // can't figure out how to change this attr beforehand!
  $("#" + movie_id).attr(
    "backdrop",
    "https://image.tmdb.org/t/p/original" + movies[index].backdrop_path
  );
  $(".movie-card").click(function () {
    $("#bd-image").attr("src", $(this).attr("backdrop"));
  });
}

function displayPageNum(num) {
  $("#display-page-num").text("Page " + num);
}

function updatePageButtons(page) {
  $("#numbered-buttons").empty();
  let minPage = Math.max(1, page - Math.floor(numberOfPageButtons / 2));
  maxPage = currentNumberOfPages - numberOfPageButtons;
  minPage = Math.min(minPage, maxPage);
  minPage > 1 ? $("#first, #prev").show() : $("#first, #prev").hide();
  minPage + numberOfPageButtons == currentNumberOfPages ? $("#last, #next").hide() : $("#last, #next").show();

  for (let i = minPage; i < minPage + numberOfPageButtons; i++) {
    $("#numbered-buttons").append(
      `<button class="page-button">${i}</button>`
    );
  }
  $(".page-button").click(changePage);
}


function changePage() {
  let chosenPage = this.innerHTML;
  let prevPage = currPage;
  if (!isNaN(chosenPage)) {
    currPage = parseInt(chosenPage);
  } else {
    switch (chosenPage) {
      case "&gt;&gt;":
        console.log("next");
        currPage++;
        break;
      case "&lt;&lt;":
        currPage--;
        break;
      case "first":
        currPage = 1;
        break;
      case "last":
        currPage = currentNumberOfPages - 1;
        break;
    }
  }
  currPage = Math.max(1, currPage);
  currPage = Math.min(currPage, currentNumberOfPages - 1);
  if (currPage != prevPage) {
    updatePageButtons(currPage);
    displayPageNum(currPage);
    displayMovies(currPage);
  }
}


function pageSizeSelected() {
  pageSize = parseInt(this.value);
  currentNumberOfPages = Math.ceil(movies.length / pageSize);
  // console.log(pageSize, currentNumberOfPages);
  // find movie index, ensure on right page to display first movie on page

  updatePageButtons();// BROKEN!
  
  // displayMovies(???);
}
function setup() {
  $("#numbered-buttons").css("grid-template-columns", `repeat(${numberOfPageButtons}, 1fr)`);
  $("#get-movie").click(getMovieData);
  $(".page-button").click(changePage);
  $("#page-buttons-container").hide();
  $("#first, #prev").hide();
  $("#page-size").change(pageSizeSelected);
}
$(document).ready(setup);
