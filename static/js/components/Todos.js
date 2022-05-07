import React, {Component} from "react";
import Edit from "./todos/Edit";

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

function CloseBtn(props) {
  return (
    <button onClick={props.onClick}>
      Close
    </button>
  )
}

function EditForm(props) {
  let isShow = props.isShow;
  if(isShow) {
    return (
      <div>
        <Edit todo={props.todo} />
        <CloseBtn onClick={props.callback}/>
      </div>
    );
  }else {
    return null;
  }
}

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isShow: {},
    };
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

  handleRenderEdit(id) {
    let isShow = this.state.isShow;
    isShow[id] = true;
    this.setState({
      isShow: isShow
    });
  }

  async handleDelete(todo) {
    const params = {
      method: "DELETE",
      body: new URLSearchParams(todo),
    };

    await fetch("/todos", params);
  }

  handleCloseBtn(id) {
    let isShow = this.state.isShow;
    isShow[id] = false;
    this.setState({
      isShow: isShow
    });
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
                <DoneBtn onClick={() => this.handleDone(todo)} />
                <EditBtn onClick={() => this.handleRenderEdit(todo.id)} />
                <EditForm isShow={this.state.isShow[todo.id]}
                  callback={() => this.handleCloseBtn(todo.id)}
                  todo={todo} />
              </div>}
            <DeleteBtn onClick={() => this.handleDelete(todo)} />
          </div>
        )}
      </div>
    );
  }
}