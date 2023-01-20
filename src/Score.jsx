export default function Score(props) {
  return (
    <div>
      <p>
        <b>Final Score:</b>
      </p>
      <p>
        Game Time : <b> {props.gameTime} seconds</b>. Number of Rolls :{" "}
        <b>{props.rollCount} rolls</b> .
      </p>
    </div>
  );
}
