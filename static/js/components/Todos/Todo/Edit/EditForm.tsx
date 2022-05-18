import React, {useState} from "react";
import {css} from "@emotion/react";

const formContent = css({
  marginLeft: "auto",
  marginRight: "auto",
  width: 500,
  paddingBottom: 10,
  textAlign: "left",
});

const font = css({
  fontWeight: "bold",
});

const inputArea = css({
  width: "100%",
});

const textArea = css({
  width: "100%",
  height: 100,
});

const sendBtn = css({
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

interface CreatedTodo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

type HandleChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

type HandleSubmitEdit = () => void;

const EditForm: React.FC<{targetTodo: CreatedTodo}> = ({targetTodo}) => {
  const [todo, setTodo] = useState({
    id: targetTodo.id,
    title: targetTodo.title,
    description: targetTodo.description,
    done: targetTodo.done,
  });

  const handleChangeEdit: React.ChangeEventHandler = (event: HandleChangeEvent) => {
    const key = event.target.name;
    const val = event.target.value;
    setTodo({...todo, [key]: val});
  }

  const handleSubmitEdit: HandleSubmitEdit = async () => {
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo)
    };

    const edit_result = await fetch("/todos", params);
    // エラーハンドラ
  }

  // todo!フォームの共通化する
  return (
    <form onSubmit={handleSubmitEdit}>
      <div css={formContent}>
        <label css={font}>
          Title:
          <input css={inputArea}
            type="text" 
            name="title"
            value={todo.title}
            onChange={handleChangeEdit} />
        </label>
      </div>
      <div css={formContent}>
        <label css={font}>
          Description:
          <textarea name="description"
            value={todo.description}
            css={textArea}
            onChange={handleChangeEdit} />
        </label>
      </div>
      <div>
        <input css={[sendBtn, font]} type="submit" value="Send" />
      </div>
    </form>
  );
}

export default EditForm;