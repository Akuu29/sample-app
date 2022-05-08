import React, {useEffect, useState} from "react";
import Todo from "./Todos/Todo";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const get_todos = async () => {
      // const params = {
      //   method: "GET",
      // }

      // const response = await fetch("/todos", params);

      // const data = await response.json();

      const data = [
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
    <div>
      {todos.map(todo => 
        <Todo key={todo.id} todo={todo} />
      )}
    </div>
  );
}

export default Todos;