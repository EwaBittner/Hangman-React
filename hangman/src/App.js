import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from './components/Notification';
import Popup from './components/Popup'
import { showNotification as show } from './helpers/helpers';

import './App.css';

const words = ["rumor","happen","match","sail","sick","floor","summit","shadow","census","chorus","launch","abbey","eject","resist","guilt","repeat","drama","easy",
  "morsel","swipe","equip","reader","pray","grave","cord","cheek","figure","rebel","native","rack","fade","basket","reform","hall","area","root","breeze","shift",
  "cane","cash","hour","galaxy","breed","straw","offset","speech","appear","porter","mosque","flush","sheet","whip","finger","suite","glare","base","catch",
  "critic","circle","block","talk","salad","bronze","occupy","morale","policy","weak","narrow","essay","direct","aware","worth","choose","outer","stamp",
  "agile","weave","case","lift","shell","liver","safari","linear","star","makeup","snack","snow","cope","fault","alive","ideal","foot","reduce","solid","inch",
  "arise","master","tile","watch","pillow","waist","spit","spirit","host","dinner","dine","gown","slip","give","still","item","cancer","guitar","silk",
  "fence", "space","danger","tract","racism","month","stream","sample","knot","outfit","decide","fair","runner","pain","brown","skate","dome","minor","text",
  "wander","heel","lemon","find","braid","gold","design","seal","title","abuse","bake","king","mile","wine","voice","steep","take","club","hold","center",
  "filter","shower","blue","bread","enemy","lean","dress","gravel","know","jacket","navy","tone","exact","arch","stake","last","slap","spell","stitch","jest",
  "tiptoe","grain","deck","fire","tired","fight","common"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handlKeydown = event => {
      const { key, keyCode } = event;

        if (playable && keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase();
    
          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              setCorrectLetters(currentLetters => [...currentLetters, letter]);
            } else {
              show(setShowNotification);
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              setWrongLetters(wrongLetters => [...wrongLetters, letter]);
            } else {
              show(setShowNotification);
            }
          }
      }
    }
    window.addEventListener('keydown', handlKeydown);

    return () => window.removeEventListener('keydown', handlKeydown)
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    //Empty arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }


  return (
    <>
      <Header />
      <div className='game-container'>
        <Figure wrongLetters={wrongLetters}/>
        <WrongLetters wrongLetters={wrongLetters}/>
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
