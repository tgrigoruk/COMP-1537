var currentNumberOfPages = null;
var movies = null;
var currPage = 1;
var pageSize = 3;
var numberOfPageButtons = 5;

function getMovieData() {
  currPage = 1;
  movie = $("#movie-title").val();
  $.ajax({
    url: `https://api.themoviedb.org/3/search/movie?api_key=bab41f87cd616dd4eb77708d7f29e2dc&query=${movie}`,
    type: "GET",
    success: (data) => {
      $("#movies-container").empty();
      movies = data.results;
      // console.log('data results ', movies);
      currentNumberOfPages = Math.ceil(movies.length / pageSize);
      if (movies.length) {
        currPage = 1;
        updatePageButtons(currPage);
        $("#no-movies-found").hide();
        $("#page-buttons-container").show();
        displayMovies(currPage);
      } else {
        $("#bd-image").attr("src", "");
        $("#page-buttons-container").hide();
        $("#no-movies-found").show();
      }
    },
  });
}

function displayMovies(page) {
  $("#movies-container").empty();
  firstMovieInPageIndex = (page - 1) * pageSize;
  lasttMovieInPageIndex = Math.min(firstMovieInPageIndex + pageSize, movies.length);
  for (let i = firstMovieInPageIndex; i < lasttMovieInPageIndex; i++) {
    createCardFromTemplate(movies, i);
  }
}

function createCardFromTemplate(movies, index) {
  let cardTemplate = document.querySelector("#movieCardTemplate");
  let newcard = cardTemplate.content.cloneNode(true);
  newcard.querySelector(".movie-number").innerHTML = index + 1;
  newcard.querySelector(".title").innerHTML = movies[index].original_title;
  newcard.querySelector(".overview").innerHTML = movies[index].overview;
  if (movies[index].poster_path) {
    poster = "https://image.tmdb.org/t/p/w200" + movies[index].poster_path;
  } else {
    poster = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
  }
  newcard.querySelector(".poster").src = poster;
  let movie_id = "movie-" + index;
  newcard.querySelector(".movie-card").id = movie_id;
  document.getElementById("movies-container").appendChild(newcard);
  if (movies[index].backdrop_path) {
    $("#" + movie_id).attr(
      "backdrop",
      "https://image.tmdb.org/t/p/original" + movies[index].backdrop_path
    );
  } else {
    $("#" + movie_id).attr("backdrop", "");
  }
  $(".movie-card").click(function () {
    $("#bd-image").attr("src", $(this).attr("backdrop"));
  });
}


function updatePageButtons(page) {
  $("#numbered-buttons").empty();
  let minPage = Math.max(1, page - Math.floor(numberOfPageButtons / 2));
  minPage = Math.min(minPage, currentNumberOfPages - numberOfPageButtons + 1);
  minPage = Math.max(1, minPage);
  minPage > 1 ? $("#first").show() : $("#first").hide();
  // minPage > currentNumberOfPages - numberOfPageButtons ? $("#last").hide() : $("#last").show();
  currPage == currentNumberOfPages ? $("#last").hide() : $("#last").show();
  currPage == 1 ? $("#prev").hide() : $("#prev").show();
  currPage == currentNumberOfPages ? $("#next").hide() : $("#next").show();
  actualNumberOfPageButtons = Math.min(numberOfPageButtons, currentNumberOfPages);
  for (let i = minPage; i < minPage + actualNumberOfPageButtons; i++) {
    $("#numbered-buttons").append(
      `<button class="page-button" id="p${i}">${i}</button>`
    );
    $(`#p${i}`).click(changePage);
    if (i == currPage) {
      $(`button:contains(${i})`).css("background-color", "rgb(95, 187, 218)");
    }
  }
}


function changePage() {
  let pageButtonPressed = this.innerHTML;
  let prevPage = currPage;
  if (!isNaN(pageButtonPressed)) {
    currPage = parseInt(pageButtonPressed);
  } else {
    switch (pageButtonPressed) {
      case "&gt;&gt;":
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
  currPage = Math.min(currPage, currentNumberOfPages);
  if (currPage != prevPage) {
    updatePageButtons(currPage);
    displayMovies(currPage);
  }
}


function pageSizeSelected() {
  let firstMovie = (currPage - 1) * pageSize;
  pageSize = parseInt(this.value);
  currentNumberOfPages = Math.ceil(movies.length / pageSize);
  currPage = Math.floor(firstMovie / pageSize) + 1;
  updatePageButtons(currPage);
  displayMovies(currPage);
}

function setup() {
  $("#numbered-buttons").css("grid-template-columns", `repeat(${numberOfPageButtons}, 1fr)`);
  $("#get-movie").click(getMovieData);
  $("#page-buttons-container, #first, #prev, #next, #last, #no-movies-found").hide();
  $(".page-button").click(changePage);
  $("#page-size").change(pageSizeSelected);
}
$(document).ready(setup);
