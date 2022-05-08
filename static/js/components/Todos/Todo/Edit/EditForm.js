import React, {useState} from "react";

const EditForm = (props) => {
  const [todo, setTodo] = useState({
    id: props.todo.id,
    title: props.todo.title,
    description: props.todo.description,
    done: props.todo.done,
  });

  const handleChangeEdit = (event) => {
    const key = event.target.name;
    const val = event.target.value;
    setTodo({...todo, [key]: val});
  }

  const handleSubmitEdit = async () => {
    const todo = this.state;
    const params = {
      method: "PUT",
      body: new URLSearchParams(todo),
    };
    const edit_result = await fetch("/todos", params);
  }

  return (
    <form onSubmit={handleSubmitEdit}>
      <div>
        <label>
          Title:
          <input type="text" name="title" value={todo.title}
            onChange={handleChangeEdit} />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input type="text" name="description" value={todo.description}
            onChange={handleChangeEdit} />
        </label>
      </div>
      <input type="submit" value="Send" />
    </form>
  );
}

export default EditForm;