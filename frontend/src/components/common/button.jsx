import React from "react";
import "./buttonStyles.css";
const ButtonChoice = (props) => {
  return (
    <button className="btn  m-2" onClick={() => props.onSubmit(props.value)}>
      {" "}
      {props.label}
    </button>
  );
};

export default ButtonChoice;
