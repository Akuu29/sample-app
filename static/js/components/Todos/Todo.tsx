import React, {useState} from "react";
import DoneBtn from "./Todo/DoneBtn";
import EditBtn from "./Todo/EditBtn";
import Edit from "./Todo/Edit";
import DeleteBtn from "./Todo/DeleteBtn";

interface CreatedTodo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

type HandleDoneBtn = (todo: CreatedTodo) => void;

type HandleRenderEditForm = (action: string) => void;

type HandleDeleteBtn = (todo: CreatedTodo) => void;

const Todo: React.FC<{todo: CreatedTodo}> = ({todo}) => {
  const [isShow, setIsShow] = useState(false);

  const handleDoneBtn: HandleDoneBtn = async (todo) => {
    let todoCompleted = JSON.parse(JSON.stringify(todo));
    todoCompleted.done = true;

    const params = {
      method: "PATCH",
      body: new URLSearchParams(todoCompleted),
    };

    const done_result = await fetch("/todos", params);
    // エラーハンドラ
  }

  const handleRenderEditForm: HandleRenderEditForm = (action) => {
    let bool = action == "hide" ? false : true;
    setIsShow(bool);
  }

  const handleDeleteBtn: HandleDeleteBtn = async (todo) => {
    const params = {
      method: "DELETE",
      // body: new URLSearchParams(todo),
      body: JSON.stringify(todo)
    }

    const delete_result = await fetch("/todos", params);
    // エラーハンドラ
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
          <Edit isShow={isShow}
            callback={() => handleRenderEditForm("hide")}
            todo={todo} />
        </div>}
      <DeleteBtn onClick={() => handleDeleteBtn(todo)} />
    </div>
  );
}

export default Todo;