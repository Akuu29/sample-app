import React from "react";
import EditForm from "./Edit/EditForm";
import CloseBtn from "./Edit/CloseBtn";

const Edit = (props) => {
  let isShow = props.isShow;
  if(isShow) {
    return (
      <div>
        <EditForm todo={props.todo} />
        <CloseBtn onClick={props.callback} /> 
      </div>
    );
  }else {
    return null;
  }
}

export default Edit;