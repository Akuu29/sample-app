import React from "react";
import {css} from "@emotion/react";
import EditForm from "./Edit/EditForm";
import CloseBtn from "./Edit/CloseBtn";

const editArea = css({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const editContent = css({
  zIndex: 2,
  height: "40%",
  width: "50%",
  padding: "1em",
  background: "#fff",
});

const editContentBtn = css({
  paddingTop: 20,
})

interface CreatedTodo {
  id: number;
  title: string;
  description: string,
  done: boolean;
}

type Props = {
  isShow: boolean;
  todo: CreatedTodo;
  callback: React.MouseEventHandler<HTMLButtonElement>;
}

const Edit: React.FC<Props> = (props) => {
  let isShow = props.isShow;
  if(isShow) {
    return (
      <div css={editArea}>
        <div css={editContent}>
          <div>
            <EditForm targetTodo={props.todo} />
          </div>
          <div css={editContentBtn}>
            <CloseBtn onClick={props.callback} /> 
          </div>
        </div>
      </div>
    );
  }else {
    return null;
  }
}

export default Edit;