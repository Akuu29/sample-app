import React, {Component} from "react";

function Delete(props) {
  return (
    <button onClick={props.onClick}>
      Delete
    </button>
  );
}

function Done(props) {
  return (
    <button onClick={props.onClick}>
      Done
    </button>
  );
}

function Edit() {
  return (
    <button>
      Edit
    </button>
  )
}

export default class Todo extends Component {
  getAllTodos() {
    const todos = [
      {
        id: 1,
        title: "4/30朝",
        description: "おはようございます。",
        done: true,
      },
      {
        id: 2,
        title: "4/30昼",
        description: "こんにちは",
        done: true,
      },
      {
        id: 3,
        title: "4/30夜",
        description: "こんばんは",
        done: false,
      }
    ];

    return todos;
  }
  
  render() {
    const todos = this.getAllTodos();
    return (
      <div>
        {todos.map(todo => 
          <div>
            <p>Title: {todo.title}</p>
            <p>Description: {todo.description}</p>
            {todo.done && <p>Status: finished</p>}
            {!todo.done && <p>Status: unfinished</p>}
            {!todo.done && <Done />}
            {!todo.done && <Edit />}
            <Delete />
          </div>
        )}
      </div>
    );
  }
}