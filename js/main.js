$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText){
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=6be75f67395913eaf1a30277bde07319&query='+searchText)
    .then((response) => {
        console.log(response);
        let movies = response.data.results;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
            <div class="col-md-3">
                <div class="well text-center">
                    <img src="${"http://image.tmdb.org/t/p/w185/" + movie.poster_path}">
                    <h5>${movie.title}</h5>
                    <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href=#>Movie Details</a>
                </div>
            </div>
            `;
        })

        $('#movies').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=6be75f67395913eaf1a30277bde07319')
    .then((response) => {
        console.log(response);
        let movie = response.data;

        let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${"http://image.tmdb.org/t/p/w185/" + movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.genres}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} minutes</li>
              <li class="list-group-item"><strong>Rating:</strong> ${movie.vote_average}</li>
              <li class="list-group-item"><strong>Language:</strong> ${movie.original_language}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.overview}
            <hr>
            <a onclick="favoriteSelected('${movie.id}', '${movie.title}')" class="btn btn-primary" href=#>Add to favorites</a>
            <a href="index.html" class="btn btn-default">Go Back To Discover</a>
          </div>
        </div>
        `;

        $('#movie').html(output)
    })
    .catch((err) => {
        console.log(err);
    });
}

function getDiscover(){
  console.log('haha')
  axios.get('https://api.themoviedb.org/3/discover/movie?api_key=6be75f67395913eaf1a30277bde07319')
  .then((response) => {
    console.log(response);
    let movies = response.data.results;
    let output = '';
    $.each(movies, (index, movie) => {
        output += `
        <div class="col-md-3">
            <div class="well text-center">
                <img src="${"http://image.tmdb.org/t/p/w185/" + movie.poster_path}">
                <h5>${movie.title}</h5>
                <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href=#>Movie Details</a>
            </div>
        </div>
        `;
    })

    $('#movies').html(output);
  })
  .catch((err) => {
    console.log(err);
  });


}

function favoriteSelected(id, title){
  localStorage.setItem(title, id);
  window.location = 'favorites.html';
  return false;
}


function getFavorites(){
  const items = {...localStorage};
  for (var a in items) {
    console.log(items[a]);
 }

  axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=6be75f67395913eaf1a30277bde07319')
  .then((response) => {
    console.log(response);

    $('#favmovie').html(output);
})
.catch((err) => {
    console.log(err);
});

}

