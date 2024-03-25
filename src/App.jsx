import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./Components/Navbar";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodolist] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todoList");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodolist(todos);
    }
  }, []);

  const saveToLocal = () => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };
  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  const handleAdd = () => {
    let uid = uuidv4();
    setTodolist([...todoList, { id: uid, todo, isCompleted: false }]);
    setTodo("");
    localStorage.setItem(
      "todoList",
      JSON.stringify([...todoList, { id: uid, todo, isCompleted: false }])
    );
  };

  const handleEdit = (e, id) => {
    let task = todoList.filter((i) => {
      return i.id === id;
    });
    setTodo(task[0].todo);

    let newTodoList = todoList.filter((item) => {
      return item.id !== id;
    });
    setTodolist(newTodoList);
    saveToLocal();
  };
  const handleDelete = (e, id) => {
    let newTodoList = todoList.filter((item) => {
      return item.id !== id;
    });
    setTodolist(newTodoList);
    saveToLocal();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handdleCheckBox = (e) => {
    let id = e.target.name;
    let index = todoList.findIndex((item) => {
      return id === item.id;
    });

    let newTodoList = [...todoList];
    newTodoList[index].isCompleted = !newTodoList[index].isCompleted;
    setTodolist(newTodoList);
    saveToLocal();
  };

  return (
    <>
      <Navbar />

      <div className="container bg-blue-100 w-full md:w-2/4 mx-auto p-10 text-sky-700 min-h-[80vh] my-5 rounded-xl">
        <h1 className="text-2xl font-bold flex justify-center p-2">
          Add New Tasks
        </h1>
        <div className="flex flex-col items-center m-3 gap-3">
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            className="w-2/4 h-9 rounded-xl p-4"
            placeholder="Insert Task"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length < 3}
            className="text-lg bg-sky-400 disabled:bg-sky-950 text-blue-100 hover:bg-sky-500 w-2/4 py-1 rounded-2xl">
            Add
          </button>
        </div>
        <div className="mx-3">
          <input
            type="checkbox"
            onChange={toggleFinished}
            checked={showFinished}
            id=""
          />{" "}
          Show Finished
        </div>

        <div>
          <h1 className="text-2xl font-bold flex justify-center p-2 my-2">
            Your Tasks
          </h1>
        </div>

        <div className="todos">
          {todoList.length === 0 && (
            <div className="flex justify-center text-xl">No Tasks Yet</div>
          )}
          {todoList.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="flex justify-between p-3 text-md w-full">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      onChange={handdleCheckBox}
                      checked={item.isCompleted}
                      name={item.id}
                      id=""
                    />
                    <div
                      className={
                        item.isCompleted ? "text-lg line-through" : "text-lg"
                      }>
                      {item.todo}
                    </div>
                  </div>

                  <div className="btns flex">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      disabled={todo.length != 0}
                      className="text-md bg-sky-400 text-blue-100 disabled:bg-sky-950 hover:bg-sky-500 px-4 py-1 mx-2 rounded-full">
                      <span className="material-symbols-outlined text-xl flex justify-center items-center">
                        edit
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="text-md bg-sky-400 text-blue-100 hover:bg-sky-500 px-4 py-1 rounded-full">
                      <span className="material-symbols-outlined text-xl flex justify-center items-center">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
