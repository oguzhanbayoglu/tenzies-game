import React from "react";
import "./styles.css";
import ReactDOM from "react-dom";
import Confetti from "react-confetti";

function Die(props) {
  return (
    <div
      onClick={props.holdDice}
      className="die"
      style={{ backgroundColor: props.isHeld ? "#59E391" : "" }}
    >
      <h2>{props.value}</h2>
    </div>
  );
}

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("won");
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: Math.ceil(Math.random() * 100000),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <>
      {tenzies && <Confetti />}
      <div className="container">
        <header>
          <h1 className="header">Tenzies</h1>
          <p>
            Roll and roll until all dice are the same. Click each die to freeze
            it at its current value between rolls.
          </p>
        </header>
        <div className="dice">{diceElements}</div>
        <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
