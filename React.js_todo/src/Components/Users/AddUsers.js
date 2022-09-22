import { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUsers.module.css";
import Button from "../UI/Button";
import ErrorModel from "../UI/ErrorModel";

const AddUsers = (props) => {
  const todoInputRef = useRef();
  const [error, setError] = useState();
  const [isPending, setIsPending] = useState(false);

  const addUserHandler = (e) => {
    e.preventDefault();
    const todo = todoInputRef.current.value;
    if (todo.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid input (NON-EMPTY VALUES)"
      });
      return;
    }

    const newUserTodo = {
      todo
    };
    setIsPending(true);

    const option = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newUserTodo)
    };
    fetch("http://localhost:8000/UserTodos", option)
      .then(() => {
        console.log("added");
        props.addbtnRender();
        setIsPending(false);
      })
      .catch((err) => {
        setIsPending(false);
        setTimeout(() => {
          alert(err.message);
        }, 0);
      });

    todoInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModel
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Enter Todo</label>
          <input type="text" id="username" ref={todoInputRef} />
          {!isPending && (
            <Button className={classes.addtodoButton} type="submit">
              Add Todo
            </Button>
          )}
          {isPending && <Button disabled="disabled">Adding Todo...</Button>}
        </form>
      </Card>
    </>
  );
};

export default AddUsers;
