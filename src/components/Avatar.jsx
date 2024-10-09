import React from "react";

function Avatar(props) {
  const { imgSrc, ...restProps } = props;
  return <img src={imgSrc} alt="avatar" {...restProps} />;
}

export default Avatar;
