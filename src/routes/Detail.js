import axios from "axios";
import React from "react";
import "./Detail.css";
import "../sass/Detail.scss";
import { Link } from "react-router-dom";

class Detail extends React.Component {
  componentDidMount() {
    console.log(this.props);
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push("/");
    }
  }

  onSubmit = () => {
    axios.post();
  };

  //<span>{location.state.title}</span>;
  render() {
    const { location } = this.props;
    const { id, year, title, summary, poster, genres } = location.state;
    if (location.state) {
      return (
        <>
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
            <table className="table">
              <tr>
                <th align="center">id</th>
                <th align="center">title</th>
                <th className="count" align="center">
                  count
                </th>
              </tr>
              <tr>
                <td>ent</td>
                <td>so funny!</td>
                <td className="count">2</td>
              </tr>
              <tr>
                <td>dkdkd</td>
                <td>good for killing time</td>
                <td className="count">5</td>
              </tr>
              <tr>
                <td>jon</td>
                <td>hello !!!</td>
                <td className="count">1</td>
              </tr>
              <tr>
                <td>jae</td>
                <td>no time to die</td>
                <td className="count">2</td>
              </tr>
            </table>
            <Link
              className="write"
              to={{
                pathname: `/write_review/${id}`,
                state: {
                  id,
                  title,
                },
              }}
            >
              write
            </Link>
          </div>
        </>
      );
    } else {
      return null;
    }
  }
}

export default Detail;
