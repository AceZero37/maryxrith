import React from "react";
import { Link } from "react-router-dom";

const Content = ({ text, lang }) => (
  <div className="first-page-content text-center">
    <h1 className="first-page-title mb-2">{text.initials}</h1>
    <h2 className={`first-page-names mb-3 ${lang}`}>{text.names}</h2>
    <h3 className={`first-page-subtitle mb-4 ${lang}`}>{text.join}</h3>
    <Link to="/second" className={`btn btn-lg first-page-btn ${lang}`}>
      {text.button}
    </Link>
  </div>
);

export default Content;
