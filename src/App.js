import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Letters from './Letters'
import Mot from './GuessWord'

const AUTHORIZED_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const VECT_AUTH_LETTERS = AUTHORIZED_LETTERS.split("")

const VECT_WORDS = ["DINOSAURE", "VOITURE", "TIGRE", "SERPENT", "ANIME", "HEROS", "BATIMENT"]
// const GUESSED_WORD = "DINOSAURE"
// const VECT_GUESSED_WORD = GUESSED_WORD.split("")

const DEFAULT_STATE = { countFoundLetters: 0, goodPressedLetters: [], badPressedLetters: [] }

class App extends Component {

  state = {
    vectWord: this.pickWord(),
    countFoundLetters: 0,
    countTries: 0,
    goodPressedLetters: [],
    badPressedLetters: [],
  }

  pickWord() {
    const rdInt = Math.trunc(Math.random() * VECT_WORDS.length)
    const rdWord = VECT_WORDS[rdInt]
    return rdWord.split("")
  }

  checkLetter = (index, letter) => {
    const { countFoundLetters, vectWord, goodPressedLetters, badPressedLetters, countTries } = this.state
    console.log(this.state)
    const newGoodLetters = goodPressedLetters
    const newBadLetters = badPressedLetters
    var count = countFoundLetters
    var nbTries = countTries+1
    var letterDiv = document.getElementById("key" + letter)
    console.log("Length: " + vectWord.length)
    letterDiv.style.background = 'lightgrey'
    if (vectWord.includes(letter)) {
      console.log("Good")
      var foundDivs = document.getElementsByClassName("guess" + letter)
      count = countFoundLetters + foundDivs.length
      newGoodLetters.push(letter)
      this.setState({ countFoundLetters: count, goodPressedLetters: newGoodLetters, countTries: nbTries })
    } else {
      console.log("Bad")
      newBadLetters.push(letter)
      this.setState({ badPressedLetters: newBadLetters, countTries: nbTries })
    }
    console.log("Count of letters found: " + count)
    this.checkWin()
  }

  checkLetter2 = (index, letter) => {
    console.log(index + letter)
  }

  getFeedback(letter) {
    const { goodPressedLetters, badPressedLetters } = this.state
    if (goodPressedLetters.includes(letter)) {
      return 'found'
    } else {
      return 'not'
    }
  }

  resetGame = () => {
    const newGoodLetters = []
    const newBadLetters = []
    var lettersDiv = document.getElementsByClassName("letters")
    for (var i = 0; i < lettersDiv.length; i++) {
      lettersDiv[i].style.background = 'white'
    }
    this.setState({ goodPressedLetters: newGoodLetters, badPressedLetters: newBadLetters, countTries: 0 })
  }

  newGame = () => {
    const newGoodLetters = []
    const newBadLetters = []
    var lettersDiv = document.getElementsByClassName("letters")
    for (var i = 0; i < lettersDiv.length; i++) {
      lettersDiv[i].style.background = 'white'
    }
    this.toDefaultState()
    console.log(this.state)
    // this.setState({vectWord: this.pickWord()})
  }

  checkWin = () => {
    const { countFoundLetters, vectWord } = this.state
    var myDivKeyboard = document.getElementById("keyboard")
    var myDivWin = document.getElementById("youWin")
    if (countFoundLetters + 1 === vectWord.length) {
      myDivKeyboard.className = "keyboardHidden"
      myDivWin.className = "youWinVisible"
    }
  }

  toDefaultState() {
    var myDivKeyboard = document.getElementById("keyboard")
    var myDivWin = document.getElementById("youWin")
    myDivKeyboard.className = "keyboard"
    myDivWin.className = "youWinHidden"
    this.setState({ vectWord: this.pickWord(), goodPressedLetters: [], badPressedLetters: [], countFoundLetters: 0, countTries: 0 })
  }

  render() {
    const { vectWord, countFoundLetters, countTries } = this.state
    return (
      <div className="pendu">
        <div className="countTry">{`Nombre de Tentatives : ${countTries}`}</div>
        <div className="guess">
          {vectWord.map((letter, index) =>
            <Mot sLetter={letter} key={index} index={index} status={this.getFeedback(letter)} />
          )}
        </div>
        <div className="keyboard" id="keyboard">
          {VECT_AUTH_LETTERS.map((letter, index) => (
            <Letters sLetter={letter} key={index} checkLetters={(letter) => this.checkLetter(index, letter)} />
          ))}
        </div>
        <div className="youWinHidden" id="youWin" onClick={this.newGame}>You win!!!<br />Click here to play again</div>
        <div className="newGame" id="newGame" onClick={this.newGame}>New Game</div>
        <div className="reset" onClick={this.resetGame}>Reset</div>
      </div>
    );
  }
}

export default App;
