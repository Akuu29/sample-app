import React from "react";
import EditForm from "./Edit/EditForm";
import CloseBtn from "./Edit/CloseBtn";

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
      <div>
        <EditForm targetTodo={props.todo} />
        <CloseBtn onClick={props.callback} /> 
      </div>
    );
  }else {
    return null;
  }
}

export default Edit;