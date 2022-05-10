import React from "react";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const EditBtn: React.FC<Props> = (props) => {
  return (
    <button onClick={props.onClick} >
      Edit
    </button>
  );
}

export default EditBtn;