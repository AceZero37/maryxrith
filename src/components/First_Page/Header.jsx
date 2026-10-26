import React from "react";
import FlagSelect from "../Common/FlagSelect";

const Header = () => (
  <header
    className="w-100 d-flex justify-content-end p-3 p-md-4 position-absolute top-0 end-0"
    style={{ zIndex: 10 }}
  >
    <FlagSelect />
  </header>
);

export default Header;
