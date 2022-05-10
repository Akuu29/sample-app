import React from "react";
import Todos from "./Todos";
import Form from "./Form";

const Layout: React.FC = () => {
  return (
    <div>
      <Form />
      <Todos />
    </div>
  );
}

export default Layout;