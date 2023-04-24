import React from "react";

export default function Card(movie) {
  let img_path = "https://image.tmdb.org/t/p/w500";
  const movieinfo = movie.info;

  return (
    <div className="movie">
      <img className="poster" src={img_path + movieinfo.poster_path} alt="" />
      <div className="movie-details">
        <div className="box">
          <h4 className="title">{movieinfo.title}</h4>
          <p className="rating">{movieinfo.vote_average}</p>
        </div>
        <div className="overview">
          <h1>Overview</h1>
          <p>{movieinfo.overview}</p>
        </div>
      </div>
    </div>
  );
}
