function displayMovie(data) {
  var movies = data.results;
  console.log(movies);
  var cardTemplate = document.querySelector("#movieCardTemplate");

  let movieBackdrops = [];
  for (i = 0; i < movies.length; i++) {
    let title = movies[i].original_title;
    let overview = movies[i].overview;
    let poster = movies[i].poster_path;
    let backdrop = movies[i].backdrop_path;
    let posterPath = "https://image.tmdb.org/t/p/w200";

    movieBackdrops.push(backdrop);

    // to do this without using <template>...
    // $('#results').append(title + '<br');
    // $('#results').append(`<p>${overview}</p>`);
    // $('#results').append(`<img src=${poster}><br>`);

    var newcard = cardTemplate.content.cloneNode(true);
    newcard.querySelector(".title").innerHTML = title;
    newcard.querySelector(".overview").innerHTML = overview;
    newcard.querySelector(".poster").src = posterPath + poster;
    // give unique id to each movie
    newcard.querySelector(".movie-card").id = "movie-" + i;
    document.getElementById("movies-go-here").appendChild(newcard);
  }
  $(".movie-card").click(displayBackdrop);

  localStorage.setItem("movieBackdrops", movieBackdrops);
}

function displayBackdrop() {
  const movid = $(this)[0].id.replace("movie-", "");
  const movieBackdrops = localStorage.getItem("movieBackdrops").split(",");
  bd = movieBackdrops[movid]; ///5lVQD8bKoc1HqZ1tYZcfYX0CStz.jpg
  bdUrl = "https://image.tmdb.org/t/p/original" + bd;
  // console.log(bd);

  // this doesn't work
  // $("body").css("background-image", url(bdUrl));
  // neither does this
  // $('body').append('<style>body:before{background-image: url(' + bdUrl + ')}</style>');
  $("#bd-image").attr('src', `https://image.tmdb.org/t/p/original${bdUrl}`);
  // document.getElementById("d-image").src = `https://image.tmdb.org/t/p/original${bdUrl}`;
  // $("#head-container").html(
  //   `<img id="bd-image" src=https://image.tmdb.org/t/p/original${bd} width=100%>`
  // );
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
  $("#get-movie").click(getMovieData);
}
$(document).ready(setup);
