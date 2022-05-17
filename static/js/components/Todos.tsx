import React, {useEffect, useState} from "react";
import Todo from "./Todos/Todo";
import {css} from "@emotion/react";

const todosStyle = css({
  textAlign: "center",
});

interface CreatedTodo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

type GetTodos = () => void;

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Array<CreatedTodo>>([]);

  useEffect(() => {
    const get_todos: GetTodos = async () => {
      const params = {
        method: "GET",
      }

      const response = await fetch("/todos", params);
      // エラーハンドラ

      const data: Array<CreatedTodo> = await response.json();

      setTodos(data);
    };

    get_todos();
  }, [])

  return (
    <div css={todosStyle}>
      {todos.map(todo => 
        <Todo todo={todo} />
      )}
    </div>
  );
}

export default Todos;