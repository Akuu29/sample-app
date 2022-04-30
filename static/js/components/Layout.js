import React, {Component} from "react";
import Todos from "./Todos";
import Form from "./Form";

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Form />
        <Todos />
      </div>
    );
  }
}