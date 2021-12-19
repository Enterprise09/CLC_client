import React from "react";
import "./Detail.css";
import "../sass/Detail.scss";
import { Link } from "react-router-dom";
import axios from "axios";

class Detail extends React.Component {
  state = {
    reviewArray: [],
  };

  componentDidMount() {
    console.log(this.props);
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push("/");
      return null;
    }

    //get review data from server
    axios({
      url: "/api/review",
      method: "get",
      baseURL: "http://localhost:8089",
      withCredentials: true,
      params: {
        movieId: location.state.id,
      },
    })
      .then((res) => {
        const {
          data: { data },
        } = res;
        console.log(data);
        this.setState({ reviewArray: data });
      })
      .catch((err) => {
        console.log(err);
        alert("서버와의 연결이 원할하지 않습니다.\n메인으로 돌아갑니다.");
        history.push("/");
        return null;
      });
  }

  //<span>{location.state.title}</span>;
  render() {
    const { location } = this.props;
    if (location.state) {
      const { id, year, title, summary, poster, genres } = location.state;
      const { reviewArray } = this.state;
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
                      <td className="reviewer_id">{review.userId}</td>
                      <td>
                        <Link
                          to={{
                            pathname: `/detail_review/${review.docId}`,
                            state: {
                              doc_id: review.docId,
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
