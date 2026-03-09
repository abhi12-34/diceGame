import { useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { useRef , useEffect} from "react";

const Nav = () => {
    const arr = [1, 2, 3, 4, 5, 6];

    const [selectNumber, setSelectNumber] = useState();
    const [currentDice, setCurrentDice] = useState(1);
    const [score, setScore] = useState(0);
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);

    // for animation ref
    const errorStagger = useRef(null);
    const diceAnimation = useRef(null);
    const resultAnimation = useRef(null);
    const rulesAnimation = useRef(null);

    function rulesHandler(){

        setShow((prev) => !prev); //rules dikhane aur bnd krne k liye..

        setTimeout(() => {
            gsap.from(rulesAnimation.current, { 
                opacity:0,
                y: -20,
                duration: 0.6, 
                stagger: 0.2,
            });
        }, 10) //10ms baad dikhega..
    }

    


    function generateNumber (min, max){
        return Math.floor(Math.random()*(max-min + 1)) + min;
    }

    const roleDice = () => {

        if(!selectNumber){  // when the value of state is falsy..

            setError("You haven't selected any number"); // number na select krne pr ye error ayega..

            // Error animation
            gsap.from(errorStagger.current, { 
                opacity:0,
                y: -20,
                duration: 0.7, 
                stagger: 0.2,
            })
            
            return  // aage code execute hi nhi hoga..

        }
        else{
            setError("");
        }

        const randomNumber = generateNumber(1,6);  // number generate between 1 to 6..
        setCurrentDice((prev) => randomNumber); // dice ko wo number provide kr rhe..


        //Dice roll Animation
        gsap.to(diceAnimation.current,{
            rotation: 360,
            scale: 1.15,
            duration: 0.5,
            ease: "back.out(1.7)",
            onComplete:() => {
                gsap.to(diceAnimation.current, { 
                    rotation: 0,
                    scale: 1,
                    duration: 0.2,
                });
            }
        });
        
        

        if (selectNumber === randomNumber){

            setScore((prev) => prev + randomNumber); // match hone pr add hoga..

            // Win Animation
            gsap.from(resultAnimation.current, { 
                opacity:0,
                rotation: -10,
                duration: 0.6, 
                scale: 0,
                ease: "elastic.out(0.5)",
            })
            gsap.to(resultAnimation.current, { 
                color:"blue",
            })
        }
        else{
            setScore((prev) => prev - 2) // dismatch hone pr minus 2 hoga..

            // Loss Animation
            gsap.to(resultAnimation.current, { 
                color:"red",
            })
        }

        setSelectNumber() //dice pr click krne k baad number diselect ho jayega kyuki state empty ho ja rhi..
        
    }

    const resetHandler = () => {
        setScore(0);

        // Score color should be black like initially..
        gsap.to(resultAnimation.current, { 
            color:"black",
        })
    }



    
    
    console.log(selectNumber)
  
    return (
        <div>
            <div style={{padding:"20px 20px",margin:"10px 10px",width:"95vw",display:"flex",justifyContent:"space-between"}}>
                <div className='score'>
                    <h1 ref={resultAnimation} style={{fontSize:"50px"}}>{score}</h1    >
                    <h4>Total Score</h4>
                </div>
                <div style={{display :"flex", flexDirection: "column"}}>
                    <p ref={errorStagger} style={{color:"red", minHeight:"30px"}}>{error}</p>
                    <div className="numbers" style={{width:"20vw",height:"50px", margin:"7px",display:"flex",columnGap:"10px" }}>
                        {arr.map((value,i) => (
                            <Box 
                                key={i}  // key is should be to define while mapping otherwise there will be error in console..
                                isSelected = {value === selectNumber} // its custom prop
                                onClick= { () => {
                                    setSelectNumber(value);  // storing value in selectNumber onclick
                                }}> {value} 
                            </Box>
                        ))}
                    </div>
                    <h3 style={{display:"flex",justifyContent:"flex-end"}}>Select Numbers</h3>   
                </div>
            </div>
            <Game>
                <img ref={diceAnimation} onClick={roleDice} src={`/src/assets/dice_${currentDice}.png`} alt="dice" />
                <h3>Click on Dice to roll</h3>
                <button onClick={resetHandler} className="reset">Reset Score</button>
                <button onClick = { rulesHandler} className="rules">Show Rules</button>
                <div  style={{minHeight:"85px"}}>
                    {show && <Rules ref={rulesAnimation}>
                        <h2>How to play dice game</h2>
                        <p>1. Select any number </p>
                        <p>2. Click on Dice image </p>
                        <p>3. After clicking, if selected number is equal to dice number you wil get same point as dice, if you get wrong guess then 2 point will be deducted </p>
                        <p>4. Red score shows you lost and Blue score shows you won</p>
                    </Rules>}
                </div>
                
            </Game>
            
        </div>
                


    )
}

export default Nav

const Box = styled.h3`
width:3vw ;
height: 3vw;
border:1px solid ;
display:flex ;
justify-content: center ;
align-items: center ;
cursor:pointer;
user-select: none;
transition: al 0.2s ease-in-out;
background-color: ${props => (props.isSelected ? 'black' : 'white')}; // the way to access prop of react in styled-components, not possible in css..
color: ${props => (props.isSelected ? 'white' : 'black')};
`
const Game = styled.div`

display: flex;
flex-direction: column;
justify-self: center;
justify-content: center;
align-items: center;
row-gap: 10px;
background-color: #1b850b88;
width: 96vw;
min-height: 45vh;

img{
    margin-top: 15px;
    height: 155px;
    width: 155px;
    background-size: contain;
    cursor: pointer;
}

button{
    
    outline: none;
    width: 155px;
    border: 1px solid;
    border-radius: 5px;
    cursor: pointer;
}

.reset:hover{
    background-color: #ff4d4d;
    color: white;
}

.rules{
   
    background-color: black;
    color: white;
    border: 1px black;
}

.rules:hover{
    background-color: #2c3e50;
    color: black;
}
`
const Rules = styled.div`
background-color: #ff00aa50;
min-height: 150px;
width: 971px;
display: flex;
justify-content: center;
flex-direction: column;
border-radius: 10px;
padding: 12px;
margin-bottom: 15px;
h2{
    margin: 10px;
    color: blue;
}
`