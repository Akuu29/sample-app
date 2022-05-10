import React from "react";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const DoneBtn: React.FC<Props> = (props) => {
  return (
    <button onClick={props.onClick} >
      Done
    </button>
  );
}

export default DoneBtn;