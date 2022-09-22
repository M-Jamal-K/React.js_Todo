import Card from "./Card";
import classes from "./Loading.module.css";

const Loading = (props) => {
  return (
    <Card className={classes.loading}>
      <h1 className={classes.cntr}>Loading...</h1>
    </Card>
  );
};

export default Loading;
