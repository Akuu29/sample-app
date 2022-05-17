import React, {useState} from "react";
import {css} from "@emotion/react";
import DoneBtn from "./Todo/DoneBtn";
import EditBtn from "./Todo/EditBtn";
import Edit from "./Todo/Edit";
import DeleteBtn from "./Todo/DeleteBtn";

const todoBox = css({
  padding: 40
});

const flex = css({
  display: "flex",
})

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoCompleted),
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo)
    }

    const delete_result = await fetch("/todos", params);
    // エラーハンドラ
  }

  return (
    <div css={todoBox}>
      <p>Title: {todo.title}</p>
      <p>Description: {todo.description}</p>
      {todo.done && <p>Status: Complete</p>}
      {!todo.done &&
        <div>
          <p>Status: Incomplete</p>
          <div>
            <DoneBtn onClick={() => handleDoneBtn(todo)} />
            <EditBtn onClick={() => handleRenderEditForm("show")} />
            <Edit isShow={isShow}
              callback={() => handleRenderEditForm("hide")}
              todo={todo} />
          </div>
        </div>}
      <DeleteBtn onClick={() => handleDeleteBtn(todo)} />
    </div>
  );
}

export default Todo;