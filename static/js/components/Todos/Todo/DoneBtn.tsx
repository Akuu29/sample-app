import React from "react";
import {css} from "@emotion/react";

const font = css({
  fontWeight: "bold",
});

const btn = css({
  color: "#000",
  backgroundColor: "#FFFFFF",
  borderBottom: "5px solid #C0C0C0",
  width: 100,
  height: 30,
  "&:hover": css({
    marginTop: "3px",
    color: "#000",
    background: "# fff20a",
    borderBottom: "2px solid #C0C0C0",
  }),
});

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const DoneBtn: React.FC<Props> = (props) => {
  return (
    <button css={[btn, font]}onClick={props.onClick} >
      Done
    </button>
  );
}

export default DoneBtn;