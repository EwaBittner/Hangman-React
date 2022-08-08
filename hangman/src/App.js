import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import { showNotification as show, checkWIn } from './components/Notification';

import './App.css';

const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  useEffect(() => {
    const handlKeydown = event => {
      const { key, keyCode } = event;

        if (playable && keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase();
    
          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              setCorrectLetters(currentLetters => [...currentLetters, letter]);
            } else {
              // showNotification();
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              setCorrectLetters(wrongLetters => [...wrongLetters, letter]);
            } else {
              // showNotification();
            }
          }
      }
    }
    window.addEventListener('keydown', handlKeydown);

    return () => window.removeEventListener('keydown', handlKeydown)
  }, [correctLetters, wrongLetters, playable]);


  return (
    <>
      <Header />
      <div className='game-container'>
        <Figure />
        <WrongLetters wrongLetters={wrongLetters}/>
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
