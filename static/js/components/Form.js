import React, {useState} from "react";

const Form = () => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    done: false,
  });

  const handleChange = (event) => {
    const key = event.target.name;
    const val = event.target.value;
    setTodo({...todo, [key]: val});
  }

  const handleSubmit = async () => {
    const params = {
      method: "POST",
      body: new URLSearchParams(todo),
    };

    const create_result = await fetch("/todos", params);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Title:
          <input type="text" name="title" value={todo.title} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea type="text" name="description" value={todo.description} onChange={handleChange} />
        </label>
      </div>
      <input type="submit" value="Send" />
    </form>
  );
}

export default Form;