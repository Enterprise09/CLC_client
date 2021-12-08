import React from "react";
import "./Detail.css";

class Detail extends React.Component {
  componentDidMount() {
    console.log(this.props);
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push("/");
    }
  }
  //<span>{location.state.title}</span>;
  render() {
    const { location } = this.props;
    const { year, title, summary, poster, genres } = location.state;
    if (location.state) {
      return (
        <div className="detail_box">
          <img src={poster} />
          <h2 className="title_box">{title}</h2>
          <ul className="movie_genres">
            {genres.map((genre, index) => (
              <li key={index} className="li_genres">
                {genre}
              </li>
            ))}
          </ul>
          <p>
            <p className="summary_box"> {summary} </p>
          </p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Detail;
