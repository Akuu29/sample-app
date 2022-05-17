import React, {useState} from "react";

interface CreatedTodo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

type HandleChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

type HandleSubmitEdit = () => void;

const EditForm: React.FC<{targetTodo: CreatedTodo}> = ({targetTodo}) => {
  const [todo, setTodo] = useState({
    id: targetTodo.id,
    title: targetTodo.title,
    description: targetTodo.description,
    done: targetTodo.done,
  });

  const handleChangeEdit: React.ChangeEventHandler = (event: HandleChangeEvent) => {
    const key = event.target.name;
    const val = event.target.value;
    setTodo({...todo, [key]: val});
  }

  const handleSubmitEdit: HandleSubmitEdit = async () => {
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo)
    };

    const edit_result = await fetch("/todos", params);
    // エラーハンドラ
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
          <textarea name="description" value={todo.description}
            onChange={handleChangeEdit} />
        </label>
      </div>
      <input type="submit" value="Send" />
    </form>
  );
}

export default EditForm;