import React, {useState} from "react";
import DoneBtn from "./Todo/DoneBtn";
import EditBtn from "./Todo/EditBtn";
import EditForm from "./Todo/Edit";
import DeleteBtn from "./Todo/DeleteBtn";

const Todo = ({todo}) => {
  const [isShow, setIsShow] = useState(false);

  const handleDoneBtn = async () => {
    let todoCompleted = JSON.parse(JSON.stringify(todo));
    todoCompleted.done = true;

    const params = {
      method: "PATCH",
      body: new URLSearchParams(todoCompleted),
    };

    const done_result = await fetch("/todos", params);
    // stateの更新
    // エラーハンドラ
  }

  const handleRenderEditForm = (action) => {
    let bool = action == "hide" ? false : true;
    setIsShow(bool);
  }

  return (
    <div>
      <p>Title: {todo.title}</p>
      <p>Description: {todo.description}</p>
      {todo.done && <p>Status: Complete</p>}
      {!todo.done &&
        <div>
          <p>Status: Incomplete</p>
          <DoneBtn onClick={() => handleDoneBtn(todo)} />
          <EditBtn onClick={() => handleRenderEditForm("show")} />
          <EditForm isShow={isShow}
            callback={() => handleRenderEditForm("hide")}
            todo={todo} />
        </div>}
      <DeleteBtn onClick={() => this.handleDeleteBtn(todo)} />
    </div>
  );
}

export default Todo;