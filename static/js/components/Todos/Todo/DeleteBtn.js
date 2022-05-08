import React from "react";

const DeleteBtn = (props) => {
  return (
    <button onClick={props.onClick}>
      Delete
    </button>
  );
}

export default DeleteBtn;