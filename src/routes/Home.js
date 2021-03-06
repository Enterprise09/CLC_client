import React from "react";
import axios from "axios";
import Movie from "../component/Movie";
import "./Home.css";
import { dbService } from "../databaseConfig";

class Home extends React.Component {
  state = {
    isLoading: true,
  };

  getMovies = async () => {
    // get data from server
    await axios({
      baseURL: "http://localhost:8089",
      url: "/api/v2/movies",
      withCredentials: true,
      method: "get",
    })
      .then((res) => {
        const {
          data: { data },
        } = res;
        console.log(res);
        this.setState({ movies: data, isLoading: false });
      })
      .catch((err) => {
        console.log("ERR : ", err);
      });
    // const {
    //   data: {
    //     data: { movies },
    //   },
    // } = await axios.get("https://yts.mx/api/v2/list_movies.json");
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {/* save temporary to firebase */}
            {movies.map((movie) => {
              dbService
                .doc(`Movie_Info/${movie.id}`)
                .set({ ...movie })
                .then(console.log("Success"))
                .catch((err) => {
                  console.log(err);
                });
              return (
                // display movie data
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              );
            })}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
