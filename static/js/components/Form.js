import React, {Component} from "react";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      done: false,
    };
  }

  handleChange(event) {
    const key = event.target.name;
    const val = event.target.value;
    this.setState({[key]: val});
  }

  async handleSubmit() {
    const todo = this.state;
    const params = {
      method: "POST",
      body: new URLSearchParams(todo),
    };
    const submit_result = await fetch("/todos", params);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <label>
            Title:
            <input type="text" name="title" value={this.props.title} onChange={this.handleChange.bind(this)} />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea type="text" name="description" value={this.props.description} onChange={this.handleChange.bind(this)} />
          </label>
        </div>
        <input type="submit" value="Send" />
      </form>
    );
  }
}