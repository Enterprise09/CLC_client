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
    axios({
      url: "/api/review",
      method: "post",
      data: {
        movieId: state.state.id,
        id: id,
        pw: pw,
        title: title,
        content: content,
      },
      baseURL: "http://localhost:8089",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          alert("저장되었습니다.");
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("서버와의 연결이 원할하지 않습니다.");
      });
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
          required
        />
        <input
          name="pw"
          onChange={onChange}
          type="password"
          placeholder="pw"
          value={pw}
          required
        />
        <input
          name="title"
          onChange={onChange}
          type="text"
          placeholder="title"
          value={title}
          required
        />
        <textarea
          name="content"
          onChange={onChange}
          className="write_content"
          type="text"
          placeholder="content"
          value={content}
          required
        />
        <input className="write_submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Write;
