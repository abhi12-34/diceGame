import React from 'react'
import './page1.css'
import introImg from "./assets/intro.png" //importing img in variable introImg


function Intro({ toggle }) { // accepting fn as props 

  return (
    <div className='dice'>
      <div className='intro'>
          <img src={introImg} alt="intro" />
          <div className='dice_game'>
            <h1>DICE GAME</h1>
            <button onClick={toggle} >Play</button>
          </div>
      </div>
    </div>
  )
}

export default Intro