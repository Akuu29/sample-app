import React from "react";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      done: false,
    };
  }

  handleChange(event) {
    let key = event.target.name;
    let val = event.target.value;
    this.setState({[key]: val});
  }

  handleSubmit(event) {
    // fetch
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
            <input type="text" name="description" value={this.props.description} onChange={this.handleChange.bind(this)} />
          </label>
        </div>
        <input type="submit" value="Send" />
      </form>
    );
  }
}