import React from "react";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const DeleteBtn: React.FC<Props> = (props) => {
  return (
    <button onClick={props.onClick}>
      Delete
    </button>
  );
}

export default DeleteBtn;