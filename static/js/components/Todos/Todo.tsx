import React, {useState} from "react";
import {css} from "@emotion/react";
import DoneBtn from "./Todo/DoneBtn";
import EditBtn from "./Todo/EditBtn";
import Edit from "./Todo/Edit";
import DeleteBtn from "./Todo/DeleteBtn";

const todoArea = css({
  padding: 40
});

const font = css({
  fontWeight: "bold",
});

const todoContent = css({
  marginLeft: "auto",
  marginRight: "auto",
  width: 500,
  paddingBottom: 10,
});

const btnArea = css({
  textAlign: "center",
});

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
    <div css={todoArea}>
      <div css={todoContent}>
        <label css={font}>Title:</label>
        <div>{todo.title}</div>
      </div>
      <div css={todoContent}>
        <label css={font}>Description:</label>
        <div>{todo.description}</div>
      </div>
      <div>
        {todo.done && 
          <div css={todoContent}>
            <label css={font}>Status:</label>
            <div>Complete</div>
          </div>}
        {!todo.done &&
          <div>
            <div css={todoContent}>
              <label css={font}>Status:</label>
              <div>Incomplete</div>
            </div>
            <div css={[btnArea, todoContent]}>
              <DoneBtn onClick={() => handleDoneBtn(todo)} />
            </div>
            <div css={[btnArea, todoContent]}>
              <EditBtn onClick={() => handleRenderEditForm("show")} />
              <Edit isShow={isShow}
              callback={() => handleRenderEditForm("hide")}
              todo={todo} />
            </div>
          </div>}
        <div css={btnArea}>
          <DeleteBtn onClick={() => handleDeleteBtn(todo)} />
        </div>
      </div>
    </div>
  );
}

export default Todo;