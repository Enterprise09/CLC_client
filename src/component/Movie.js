import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Movie.css";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

function Movie({ id, year, title, summary, poster, genres }) {
  const history = useHistory();

  useEffect(() => {
    if (id === undefined || id === null) {
      alert("올바르지 않은 접근 경로 입니다.\n홈으로 돌아갑니다.");
      history.push("/");
    }
  }, []);

  return (
    // Link to detail view with some state
    <Link
      to={{
        pathname: `/movie/${id}`,
        state: {
          id,
          year,
          title,
          summary,
          poster,
          genres,
        },
      }}
    >
      <div className="movie">
        <img src={poster} alt={title} title={title} />
        <div className="movie__data">
          <h3 className="movie__title">{title}</h3>
          <h5 className="movie__year">{year}</h5>
          <ul className="movie__genres">
            {genres.map((genre, index) => (
              <li key={index} className="gneres__gnere">
                {genre}
              </li>
            ))}
          </ul>
          <p className="movie__summary">{summary.slice(0, 180)}...</p>
        </div>
      </div>
    </Link>
  );
}

// check state value
Movie.propTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
