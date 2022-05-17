import React, {useState} from "react";
import {css} from "@emotion/react";

const form = css({
  textAlign: "center",
})

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
    <form css={form} onSubmit={handleSubmit}>
      <div>
        <label>
          Title:
          <input type="text" name="title" value={todo.title}
            onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea name="description" value={todo.description}
            onChange={handleChange} />
        </label>
      </div>
      <input type="submit" value="Send" />
    </form>
  );
}

export default Form;