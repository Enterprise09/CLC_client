import axios from "axios";
import React, { useState } from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { dbService } from "../databaseConfig";
import "../sass/Write.scss";

const Write = (props) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();
  const state = useLocation();

  const onSubmit = (event) => {
    event.preventDefault();
    dbService
      .collection("Review")
      .add({
        movie_id: state.state.id,
        id,
        pw,
        title,
        content,
      })
      .then((res) => {
        alert("글을 저장하였습니다.");
        history.push("/");
      })
      .catch((err) => {
        alert("오류가 발생하였습니다." + err);
      });

    // axios({
    //   url: "/api/write_review",
    //   method: "post",
    //   baseURL: "http://localhost:8089",
    //   withCredentials: true,
    // })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const onChange = (event) => {
    const {
      target: { name, value },
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

  return (
    <div className="write_container">
      <form className="write_form" onSubmit={onSubmit}>
        <input
          name="id"
          onChange={onChange}
          type="text"
          placeholder="id"
          value={id}
        />
        <input
          name="pw"
          onChange={onChange}
          type="password"
          placeholder="pw"
          value={pw}
        />
        <input
          name="title"
          onChange={onChange}
          type="text"
          placeholder="title"
          value={title}
        />
        <textarea
          name="content"
          onChange={onChange}
          className="write_content"
          type="text"
          placeholder="content"
          value={content}
        />
        <input className="write_submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Write;
