import React, {Component} from "react";
import DoneBtn from "./Todo/DoneBtn";
import EditBtn from "./Todo/EditBtn";
import EditForm from "./Todo/Edit";
import DeleteBtn from "./Todo/DeleteBtn";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  async handleDoneBtn(todo) {
    let todoCompleted = JSON.parse(JSON.stringify(todo));
    todoCompleted.done = true;

    const params = {
      method: "PATCH",
      body: new URLSearchParams(todoCompleted),
    };

    const done_result = await fetch("/todos", params);
    // stateの更新
    // エラーハンドラ
  }

  handleRenderEditForm(action) {
    let bool = action == "hide" ? false : true;
    this.setState({isShow: bool});
  }

  async handleDeleteBtn(todo) {
    const params = {
      method: "DELETE",
      body: new URLSearchParams(todo),
    };

    const delete_result = await fetch("/todos", params);
    // stateの更新
    // エラーハンドラ
  }

  render() {
    let todo = this.props.todo;
    return (
      <div>
        <p>Title: {todo.title}</p>
        <p>Description: {todo.description}</p>
        {todo.done && <p>Status: Complete</p>}
        {!todo.done &&
          <div>
            <p>Status: Incomplete</p>
            <DoneBtn onClick={() => this.handleDone(todo)} />
            <EditBtn onClick={() => this.handleRenderEditForm("")} />
            <EditForm isShow={this.state.isShow}
              callback={() => this.handleRenderEditForm("hide")}
              todo={todo} />
          </div>}
        <DeleteBtn onClick={() => this.handleDeleteBtn(todo)} />
      </div>
    );
  }
}