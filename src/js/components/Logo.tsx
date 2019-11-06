import React from "react";

const logoStyles = {
  backgroundImage: `url(${process.env.PUBLIC_URL + "/revolut_icon.png"})`
};

export const Logo = () => {
  return (
    <div className="logo-wrapper">
      <div style={logoStyles} className="logo" />
    </div>
  );
};
