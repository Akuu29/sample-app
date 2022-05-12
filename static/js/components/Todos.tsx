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
      // const params = {
      //   method: "GET",
      // }

      // const response = await fetch("/todos", params);

      // const data = await response.json();

      const data: Array<CreatedTodo> = [
        {
          id: 1,
          title: "5/8朝",
          description: "おはようございます。",
          done: true,
        },
        {
          id: 2,
          title: "5/8昼",
          description: "こんにちは",
          done: true,
        },
        {
          id:3,
          title: "5/8夜",
          description: "こんばんは",
          done: false,
        },
        {
          id: 4,
          title: "5/8筋トレ",
          description: "今から筋トレします",
          done: false,
        }
      ];

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