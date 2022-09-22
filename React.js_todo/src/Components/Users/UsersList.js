import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./UsersList.module.css";

const UsersList = (props) => {
  let num = 1;
  let content = <h2>No TODOS</h2>;
  if (props.todos.length > 0) {
    content = props.todos.map((todo) => (
      <li key={todo.id}>
        <span className={classes.todoNum}>{num++}</span>{" "}
        <span className={classes.todoSpan}>{todo.todo}</span>
        <Button
          id={todo.id}
          className={classes.delButton}
          onClick={props.deleteHandler}
        >
          Delete
        </Button>
      </li>
    ));
  }
  return (
    <Card className={classes.users}>
      <ul> {content}</ul>
    </Card>
  );
};

export default UsersList;
