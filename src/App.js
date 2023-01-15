import { useEffect, useState } from "react";
import styles from "../src/styles.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dieState, setDieState] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dieState.every((die) => die.isHeld);
    const firstValue = dieState[0].value;
    const allSameValue = dieState.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!!");
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
  }

  function holdDice(id) {
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

      <button
        className="roll-dice"
        onClick={/* tenzies ? newGame : */ rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
