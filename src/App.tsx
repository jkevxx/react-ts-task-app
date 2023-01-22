import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
type FormInput = React.FormEvent<HTMLInputElement>;

interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const taskInput = useRef<HTMLInputElement>(null);

  const handleInput = (e: FormInput) => {
    setNewTask(e.currentTarget.value);
  };

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    // e.currentTarget.reset();
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const removeTask = (index: number): void => {
    // const newTasks: ITask[] = [...tasks];
    // newTasks.splice(index, 1);
    // setTasks(newTasks);

    const newArray = tasks.filter((task, item) => item !== index);
    // console.log(newArray);
    setTasks(newArray);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={handleInput}
                  value={newTask || ""}
                  className="form-control"
                  ref={taskInput}
                  autoFocus
                />
                <button
                  type="submit"
                  className="btn btn-success btn-block mt-2"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
          {tasks.map((task: ITask, index: number) => (
            <div className="card card-body mt-2" key={index}>
              <h3 style={{ textDecoration: task.done ? "line-through" : "" }}>
                {task.name}
              </h3>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleDoneTask(index)}
                >
                  {task.done ? "✅" : "❌"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(index)}
                >
                  🗑️
                </button>
              </div>
              {/* <p>{task.done + ""}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
