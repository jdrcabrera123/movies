import React, { useEffect, useState } from "react";
import Card from "../components/Card";

let API_Key = "&api_key=fa58ec5652a776d2fa272b913c1496d0";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_Key;
const genres = ["Popular", "Theatre", "Kids", "Drama", "Comedy"];

export default function MenuRoutes() {
  const [movieData, setMovieData] = useState([]);

  const [url_set, setUrl_set] = useState(url);

  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(url_set)
      .then((res) => res.json())
      .then((data) => {
        setMovieData(data.results);
      });
  }, [url_set]);

  const getData = (movieType) => {
    if (movieType == "Popular") {
      url = base_url + "/discover/movie?sort_by=popularity.desc" + API_Key;
    }
    if (movieType == "Theatre") {
      url =
        base_url +
        "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" +
        API_Key;
    }
    if (movieType == "Kids") {
      url =
        base_url +
        "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" +
        API_Key;
    }
    if (movieType == "Drama") {
      url =
        base_url +
        "/discover/movie?with_genres=18&primary_release_year=2014" +
        API_Key;
    }
    if (movieType == "Comedy") {
      url =
        base_url +
        "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" +
        API_Key;
    }
    setUrl_set(url);
  };

  const searchMovie = (evt) => {
    if (evt.key == "Enter") {
      url =
        base_url + "/search/movie?api_key=fa58ec5652a776d2fa272b913c1496d0&query="
        +
        search;
      setUrl_set(url);
      setSearch("");
    }
  };

  return (
    <>
      <div className="mainContainer">
        <h1> 🎬 Movies</h1>

        <nav className="nav__menu">
          <ul className="ul__menu">
            {genres.map((value, index) => {
              return (
                <li key={value}>
                  <a
                    href="#"
                    
                    name={value}
                    onClick={(e) => {
                      getData(e.target.name);
                    }}
                  >
                    {value}
                  </a>
                </li>
              );
            })}
          </ul>

          <form className="search__Form">
            <div className="search__btn">
              <input
                className="input__text"
                type="text"
                placeholder="Write movie name"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
                onKeyPress={searchMovie}
              />
            </div>
            <button>
              <i className="bx bx-search-alt-2"></i>
            </button>
          </form>
        </nav>
      </div>
      <div className="container">
        {movieData.length == 0 ? (
          <p className="notfound">Not Found</p>
        ) : (
          movieData.map((res, pos) => {
            return <Card info={res} key={pos} />;
          })
        )}
      </div>
    </>
  );
}
