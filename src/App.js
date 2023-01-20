import { useEffect, useState } from "react";
import styles from "../src/styles.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Score from "./Score";
import Timer from "./Timer";

function App() {
  const [dieState, setDieState] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

  const [rollCount, setRollCount] = useState(0);

  const [timer, setTimer] = useState(0);

  const [timeStarter, setTimeStarter] = useState(false);

  useEffect(() => {
    if (!tenzies && timeStarter) {
      setTimeout(() => setTimer((timer) => timer + 1), 1000);
    } else {
      setTimer(timer);
      setTimeStarter(false);
    }
  }, [tenzies, timer, timeStarter]);

  useEffect(() => {
    const allHeld = dieState.every((die) => die.isHeld);
    const firstValue = dieState[0].value;
    const allSameValue = dieState.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dieState]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      //const die = Math.ceil(Math.random() * 6);   //Change it for refactoring otherwise ==> code smell. value: Math
      diceArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return diceArray;
  }

  function rollDice() {
    if (!tenzies) {
      setDieState((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDieState(allNewDice());
    }

    if (tenzies) {
      setRollCount(0);
      setTimer(0);
    } else {
      setRollCount((rollCount) => rollCount + 1);
    }
  }

  function holdDice(id) {
    setTimeStarter(true);
    setDieState((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  //  You don't have to write a new function, and check the tenzies in the button. You can change the rollDice function.
  /* function newGame() {
    setTenzies(false);
    setDieState(allNewDice());
   }*/

  return (
    <main>
      {tenzies && <Confetti className="confetti" />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <p className="instructions light-bold">
        {" "}
        The game starts when you pick the first dice.
      </p>
      <h2>Number of Rolls: {rollCount}</h2>
      <div className="dice-container">
        {dieState.map((die) => {
          return (
            <Die
              value={die.value}
              key={die.id}
              colorTheme={die.isHeld}
              handleClick={() => holdDice(die.id)}
            />
          );
        })}
      </div>

      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <Timer timer={timer} />
      <div>{tenzies && <Score rollCount={rollCount} gameTime={timer} />}</div>
    </main>
  );
}

export default App;
