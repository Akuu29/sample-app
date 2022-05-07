import React, {Component} from "react";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.todo.id,
      title: props.todo.title,
      description: props.todo.description,
      done: props.todo.done,
    };
  }

  handleChangeEdit(event) {
    const key = event.target.name;
    const val = event.target.value;
    this.setState({[key]: val});
  }

  async handleSubmitEdit() {
    const todo = this.state;
    const params = {
      method: "PUT",
      body: new URLSearchParams(todo),
    };
    const edit_result = await fetch("/todos", params);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmitEdit.bind(this)}>
        <div>
          <label>
            Title:
            <input type="text" name="title" value={this.state.title}
              onChange={this.handleChangeEdit.bind(this)} />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input type="text" name="description" value={this.state.description}
              onChange={this.handleChangeEdit.bind(this)} />
          </label>
        </div>
        <input type="submit" value="Send" />
      </form>
    );
  }
}