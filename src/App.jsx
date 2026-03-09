import { useRef } from 'react';
import { useState } from 'react';

import Intro from './page1.jsx';
import GamePlay from './page2.jsx';
import gsap from 'gsap';
import styled from 'styled-components';


function App() {
  const [isGameStarted, setIsGameStarted] = useState(false)
 
  const overlay = useRef(null);

  const toggleGame = () => {    //fn for toggling and page transition animation.
   

    const cells = overlay.current.querySelectorAll(".pixel-cell");

    // Pixels fill in --> swap page --> pixels leave
    
      gsap.to(cells, {
        opacity: 1,
        duration: 0.05,
        stagger:{each: 0.008, from: "random"},
        onComplete: () => {
          setIsGameStarted(true);  // toggling value..
          gsap.to(cells, {
            opacity: 0,
            duration: 0.05,
            stagger:{each: 0.008, from: "random"},
            delay: 0.1,
          });
          
        }
      })
    
       
    

  };

  //Build 20*12 pixel grid
  const cells =  Array.from({length: 240});

  return (
    <>
    {/* Pixel overlay - sits on top of everything */}
    <Pixel ref={overlay}> 
      {cells.map((_, i) => (
        <div key={i} className='pixel-cell' style={{opacity:"0", backgroundColor:"#9710806a"}}/>
      ))}
    </Pixel>
    {isGameStarted ? <GamePlay/> : <Intro toggle={toggleGame}  // passing reference of fn to intro component in variable..  jb play button pr click hoga to state bdl jayegi aur screen pr 2nd page open ho jayega..
    />}
    </>
  )
}

export default App

const Pixel = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  pointer-events: none;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(12, 1fr);

`