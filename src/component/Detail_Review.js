import axios from "axios";
import React, { useState } from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { dbService } from "../databaseConfig";
import "../sass/Detail_Review.scss";

const Detail_Review = () => {
  const state = useLocation();
  const {
    state: { review, doc_id, movie_id },
  } = state;
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [title, setTitle] = useState(review.title);
  const [content, setContent] = useState(review.content);
  const [auth, setAuth] = useState(false);
  const history = useHistory();
  console.log(review);

  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === "id") {
      setId(value);
    } else if (name === "pw") {
      setPw(value);
    } else if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    }
  };

  const onAuthClick = (event) => {
    if (auth) {
      alert("이미 인증되었습니다.");
      console.log(auth);
    } else {
      if (review.userId === id) {
        if (review.password === pw) {
          setAuth(true);
          alert("인증에 성공하였습니다.");
          console.log(auth);
        } else {
          alert("비밀번호가 일치하지 않습니다.");
        }
      } else {
        alert("아이디가 일치하지 않습니다.");
      }
    }
  };

  const onDeleteClick = () => {
    if (auth) {
      const ok = window.confirm("게시글을 삭제하시겠습니까?");
      if (ok) {
        console.log(doc_id);
        axios({
          baseURL: "http://localhost:8089",
          url: "/api/review",
          method: "delete",
          withCredentials: true,
          data: {
            docId: doc_id,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              alert("삭제되었습니다.");
              history.push("/");
            }
          })
          .catch((err) => {
            console.log(err);
            alert("서버와의 연결이 원할하지 않습니다.");
          });
      }
    } else {
      alert("ID/PW확인을 먼저 진행해주세요!");
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (auth) {
      const ok = window.confirm("수정하시겠습니까?");
      if (ok) {
        axios({
          url: "/api/review",
          method: "put",
          data: {
            docId: doc_id,
            title: title,
            content: content,
            movieId: movie_id,
          },
          baseURL: "http://localhost:8089",
          withCredentials: true,
        })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              alert("수정되었습니다.");
              history.push("/");
            }
          })
          .catch((err) => {
            console.log(err);
            alert("서버와의 연결이 원할하지 않습니다.");
          });
      }
    } else {
      alert("ID/PW확인을 먼저 진행해주세요!");
    }
  };

  return (
    <div className="detailReview_container">
      <form className="update_form" onSubmit={onSubmit}>
        <input
          name="title"
          type="text"
          onChange={onChange}
          value={title}
          required
        />
        <textarea
          className="content"
          name="content"
          type=""
          onChange={onChange}
          value={content}
          required
        />
        <input
          name="id"
          type="text"
          onChange={onChange}
          value={id}
          placeholder="id"
          required
        />
        <input
          name="pw"
          type="password"
          onChange={onChange}
          value={pw}
          placeholder="pw"
          required
        />
        <input
          className="auth_button"
          type="button"
          onClick={onAuthClick}
          value="Check ID/PW"
        />
        <input
          className="delete_button"
          type="button"
          onClick={onDeleteClick}
          value="Delete"
        />
        <input className="update_button" type="submit" value="Update" />
      </form>
    </div>
  );
};

export default Detail_Review;
