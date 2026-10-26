import React from "react";
import Wedding_Days from "./Wedding_Days";
import ThiepKar from "./ThiepKar";
import "./Second_Page.css";

const Content = ({ lang = "kh" }) => {
  return (
    <>
      <Wedding_Days lang={lang} />
      <ThiepKar lang={lang} />
    </>
  );
};

export default Content;
