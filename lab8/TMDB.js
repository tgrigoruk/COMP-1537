function displayMovie(data) {
  movies = data.results;
//   console.log(movies);
  var cardTemplate = document.querySelector('#movieCardTemplate');

  for (i = 0; i < movies.length; i++) {
    let title = movies[i].original_title;
    let overview = movies[i].overview;
    let poster = "https://image.tmdb.org/t/p/w200/" + movies[i].poster_path;
    let backdrop = movies[i].backdrop_path;
    // if (backdrop != null) {use} else {alternate image}
    // console.log(title, poster);

    // $('#results').append(title + '<br');
    // $('#results').append(`<p>${overview}</p>`);
    // $('#results').append(`<img src=${poster}><br>`);

    var newcard = cardTemplate.content.cloneNode(true);
    newcard.querySelector(".title").innerHTML = title;
    newcard.querySelector(".overview").innerHTML = overview;
    newcard.querySelector(".poster").src = poster;
    document.getElementById("movies-go-here").appendChild(newcard);
  }
}

function displayBackdrop() {
    w = $(this).id;
    $("right_div").html(`<img src=https://image.tmdb.org/t/p/original/${w} width=100%`);
}

function getMovieData() {
  movie = $("#movie-title").val();
  $.ajax({
    url: `https://api.themoviedb.org/3/search/movie?api_key=bab41f87cd616dd4eb77708d7f29e2dc&query=${movie}`,
    type: "GET",
    success: displayMovie,
  });
}

function setup() {
  // console.log('getw');
  $("#get_movie").click(getMovieData);
//   $('.poster').click(displayBackdrop);
}
$(document).ready(setup);
