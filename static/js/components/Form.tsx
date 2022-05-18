import React, {useState} from "react";
import {css} from "@emotion/react";

const formContent = css({
  marginLeft: "auto",
  marginRight: "auto",
  width: 500,
  paddingBottom: 10,
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

const formBtn = css({
  textAlign: "center",
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

interface NewTodo {
  title: string;
  description: string;
  done: boolean;
}

type HandleChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

type HandleSubmit = () => void;

const Form: React.FC = () => {
  const [todo, setTodo] = useState<NewTodo>({
    title: "",
    description: "",
    done: false,
  });

  const handleChange: React.ChangeEventHandler = (event: HandleChangeEvent) => {
    const key = event.target.name;
    const val = event.target.value;
    setTodo({...todo, [key]: val});
  }

  const handleSubmit: HandleSubmit = async () => {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo)
    };

    const create_result = await fetch("/todos", params);
    // エラーハンドラ
  }

  return (
    <form onSubmit={handleSubmit}>
      <div css={formContent}>
        <label css={font}>
          Title:
          <input css={inputArea}
            type="text" 
            name="title"
            value={todo.title}
            onChange={handleChange} />
        </label>
      </div>
      <div css={formContent}>
        <label css={font}>
          Description:
          <textarea css={textArea}
            name="description"
            value={todo.description}
            onChange={handleChange} />
        </label>
      </div>
      <div css={formBtn}>
        <input css={[sendBtn, font]} type="submit" value="Send" />
      </div>
    </form>
  );
}

export default Form;