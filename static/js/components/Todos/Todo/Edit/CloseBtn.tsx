import React, { MouseEventHandler } from "react";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>
}

const CloseBtn: React.FC<Props> = (props) => {
  return (
    <button onClick={props.onClick} >
      CloseBtn
    </button>
  );
}

export default CloseBtn;