import { useState } from "react";
import useFetch from "./Components/CustomHook/useFetch";
import Loading from "./Components/UI/Loading";
import AddUsers from "./Components/Users/AddUsers";
import UsersList from "./Components/Users/UsersList";
function App() {
  const [DataChanging, setDataChanging] = useState(true);
  const handleRender = () => {
    setDataChanging(!DataChanging);
  };
  const {
    data: todosList,
    isPending,
    err
  } = useFetch("http://localhost:8000/UserTodos", DataChanging);

  const deleteUserInfo = (e) => {
    console.log(`${e.target.id}`);
    fetch(`http://localhost:8000/UserTodos/${e.target.id}`, {
      method: "DELETE"
    }).then(() => {
      console.log(`Item deleted with id ${e.target.id}`);
      handleRender();
    });
  };
  return (
    <div className="App">
      <AddUsers addbtnRender={handleRender} />
      {err && (
        <h4 style={{ marginLeft: "7rem", color: "whitesmoke" }}>{err}</h4>
      )}
      {isPending && <Loading />}
      {todosList && (
        <UsersList todos={todosList} deleteHandler={deleteUserInfo} />
      )}
    </div>
  );
}

export default App;
