import React from "react";
import { dbService } from "../databaseConfig";
import "./Detail.css";
import "../sass/Detail.scss";
import { Link } from "react-router-dom";

class Detail extends React.Component {
  state = {
    reviewArray: [],
  };

  componentDidMount() {
    // console.log(this.props);
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push("/");
    }
    dbService.collection("Review").onSnapshot((snapshot) => {
      const reviewArray = snapshot.docs.map((doc) => ({
        doc_id: doc.id,
        ...doc.data(),
      }));
      this.setState({ reviewArray: reviewArray });
    });
  }

  //<span>{location.state.title}</span>;
  render() {
    const { location } = this.props;
    const { id, year, title, summary, poster, genres } = location.state;
    const { reviewArray } = this.state;
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
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TITLE</th>
                  <th>SUMMARY</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {reviewArray.map((review) => (
                    <tr>
                      <td className="reviewer_id">{review.id}</td>
                      <td>
                        <Link
                          to={{
                            pathname: `/detail_review/${review.doc_id}`,
                            state: {
                              doc_id: review.doc_id,
                              movie_id: id,
                              title,
                              review,
                            },
                          }}
                        >
                          {review.title}
                        </Link>
                      </td>
                      <td>{review.content.slice(0, 30)}</td>
                    </tr>
                  ))}
                </>
              </tbody>
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
