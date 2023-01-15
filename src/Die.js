export default function Die(props) {
  const styles = {
    backgroundColor: props.colorTheme ? "#59E391" : "white",
  };
  return (
    <div className="die" style={styles} onClick={props.handleClick}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
