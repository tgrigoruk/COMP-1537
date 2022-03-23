currentNumberOfPages = null;
currentPageIndex = null;
movieList = null;
currPage = 1;
pageSize = 3;

function displayMovie() {
  // console.log(movies);
  let movies = movieList.results;
  $("#movies-go-here").empty();
  let cardTemplate = document.querySelector("#movieCardTemplate");
  // let movieBackdrops = [];

  currentPageIndex = (currPage - 1) * pageSize;
  for (let i = currentPageIndex; i < currentPageIndex + pageSize; i++) {
    let title = movies[i].original_title;
    let overview = movies[i].overview;
    let posterPath = "https://image.tmdb.org/t/p/w200" + movies[i].poster_path;
    let backdropPath = "https://image.tmdb.org/t/p/original" + movies[i].backdrop_path;
    console.log(backdropPath);
    let movie_id = "movie-" + i;

    // to do this without using <template>...
    // $('#results').append(title + '<br');
    // $('#results').append(`<p>${overview}</p>`);
    // $('#results').append(`<img src=${poster}><br>`);

    var newcard = cardTemplate.content.cloneNode(true);
    newcard.querySelector(".title").innerHTML = title;
    newcard.querySelector(".overview").innerHTML = overview;
    newcard.querySelector(".poster").src = posterPath;
    // give unique id to each movie
    newcard.querySelector(".movie-card").id = movie_id;
    document.getElementById("movies-go-here").appendChild(newcard);
    // can't figure out how to change this attr beforehand!
    $('#' + movie_id).attr("backdrop", backdropPath);
  }
  // must click event to class AFTER creation
  $(".movie-card").click(function() {
    $("#bd-image").attr("src", $(this).attr("backdrop"));
  });
}

function getMovieData() {
  currPage = 1;
  displayPageNum(currPage);
  movie = $("#movie-title").val();
  $.ajax({
    url: `https://api.themoviedb.org/3/search/movie?api_key=bab41f87cd616dd4eb77708d7f29e2dc&query=${movie}`,
    type: "GET",
    success: (data) => {
      movieList = data;
      displayMovie();
    },
  });
}

function getPage() {
  page = this.id.replace("page-", "");
  prevPage = currPage;
  if (!isNaN(page)) {
    currPage = parseInt(page);
  } else {
    switch (page) {
      case "next":
        currPage++;
        break;
      case "prev":
        currPage--;
        break;
      case "first":
        currPage = 1;
        break;
      case "last":
        currPage = 5;
        break;
    }
  }
  currPage = Math.max(1, currPage);
  currPage = Math.min(currPage, 5);
  if (currPage != prevPage) {
    displayMovie();
    displayPageNum(currPage);
  }
}

function displayPageNum(num) {
  $("#display-page-num").text("Page " + num);
}
function pageSizeSelected() {
  pageSize = this.val();
  console.log(pageSize);
  currentNumberOfPages = Math.ceil(movies.length / pageSize);
}
function setup() {
  $("#get-movie").click(getMovieData);
  $(".page-button").click(getPage);
  // $("#page-buttons-container").hide();
  $("select").change(pageSizeSelected);
}
$(document).ready(setup);
