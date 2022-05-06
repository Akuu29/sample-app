import React, {Component} from "react";

function DoneBtn(props) {
  return (
    <button onClick={props.onClick}>
      Done
    </button>
  );
}

function DeleteBtn(props) {
  return (
    <button onClick={props.onClick}>
      Delete
    </button>
  );
}

function EditBtn(props) {
  return (
    <button onClick={props.onClick}>
      Edit
    </button>
  );
}

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {todos: []};
  }
  
  async componentDidMount() {
    const params = {
      method: "GET",
    }

    const response = await fetch("/todos", params);

    const data = await response.json();
    
    this.setState({todos: data});
  }

  async handleDone(todo) {
    let todoCompleted = JSON.parse(JSON.stringify(todo));
    todoCompleted.done = true;
    
    const params = {
      method: "PATCH",
      body: new URLSearchParams(todoCompleted),
    };

    await fetch("/todos", params);
  }

  async handleDelete(todo) {
    const params = {
      method: "DELETE",
      body: new URLSearchParams(todo),
    };

    await fetch("/todos", params);
  }

  render() {
    let todos = this.state.todos;
    return (
      <div>
        {todos.map(todo => 
          <div key={todo.id}>
            <p>Title: {todo.title}</p>
            <p>Description: {todo.description}</p>
            {todo.done && <p>Status: finished</p>}
            {!todo.done &&
              <div>
                <p>Status: unfinished</p>
                <DoneBtn onClick={() => this.handleDone(todo)}/>
                <EditBtn onClick={() => this.handleEdit(todo)}/>
              </div>}
            <DeleteBtn onClick={() => this.handleDelete(todo)} />
          </div>
        )}
      </div>
    );
  }
}