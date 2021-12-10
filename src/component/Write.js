import React from "react";
import "../sass/Write.scss";

const Write = () => {
  const onSubmit = () => {
    console.log("Submit");
  };

  return (
    <div className="write_container">
      <form className="write_form" onSubmit={onSubmit}>
        <input type="text" placeholder="id" />
        <input type="text" placeholder="pw" />
        <input type="text" placeholder="title" />
        <input className="write_content" type="text" placeholder="content" />
        <input className="write_submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Write;
