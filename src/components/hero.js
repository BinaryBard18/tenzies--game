import React, { useEffect, useState } from "react"
import Confetti from "react-confetti"
import "../Hero.css"
import {motion} from "framer-motion"
import Head from "./Head"
import Die from "./Die"
import {nanoid} from "nanoid"
import Sidemenu from "./sidemenu"

export default function Hero(){


    function holdDice(id){
        if(tenzies) return;//Will not let the dice state to be changed
        setDiceArray(oldDice => oldDice.map(die=>{
            return die.id==id ?
                {...die,isHeld:!die.isHeld}:
                die
        }))
    }
    

    const [start,setStart] = useState(false);
    const [tenzies,setTenzies] = useState(false);
    const [diceArray,setDiceArray] = useState(allNewDice);

    const getBestMovesFromLocalStorage = JSON.parse(localStorage.getItem("highestScoreMove"));

    const bestTimeFromLocalStorage  = JSON.parse(localStorage.getItem("bestTimeInLocal"))

    const [bestTime,setBestTime] = useState(bestTimeFromLocalStorage ? bestTimeFromLocalStorage : "----------");
    const [bestMoves,setBestMoves] = useState(getBestMovesFromLocalStorage ? getBestMovesFromLocalStorage : "----------");
    const [currentTime,setCurrentTime] = useState("----------");
    const [currentMoves,setCurrentMoves] = useState("----------");

    const [elapsedTime, setElapsedTime] = useState("----------");
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if (start) {
            const id = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);
            setIntervalId(id);
        } else if (intervalId) {
            clearInterval(intervalId);
        }
    
        return () => clearInterval(intervalId);
    }, [start]);

    

    useEffect(()=>{
        const isHeldCheck = diceArray.every(die=>die.isHeld);
        const firstValue = diceArray[0].value;
        const valueCheck = diceArray.every(die=>die.value===firstValue);
        if(isHeldCheck&&valueCheck){
            console.log("Tenzies,You Won");
            setTenzies(true);
        }
    },[diceArray]);


    // useEffect(()=>{
    //     if((currentMoves<bestMoves) || bestMoves=="----------"){
    //         setBestMoves(currentMoves);
    //         localStorage.setItem("highestScoreMove",JSON.stringify(currentMoves));
    //     }
    // },[tenzies])


    useEffect(() => {
        const isHeldCheck = diceArray.every(die => die.isHeld);
        const firstValue = diceArray[0].value;
        const valueCheck = diceArray.every(die => die.value === firstValue);
        if (isHeldCheck && valueCheck) {
            setTenzies(true);
            clearInterval(intervalId);
            // if (elapsedTime < bestTime) {
            //     setBestTime(elapsedTime);
            //     localStorage.setItem("bestTime", JSON.stringify(elapsedTime));
            // }
        }
    }, [diceArray, elapsedTime, bestTime, intervalId]);
    

    function allNewDice(){
        const newDice=[];
        for(let i=0;i<10;i++){
            newDice.push(generateNewDie());
        }
        return newDice;
    }


    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    const diceElements = diceArray.map((die)=><Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)} start={start}/>)


    function StartGame(id){
        setStart(true);
        setCurrentMoves(0);
        setElapsedTime(0);
        setDiceArray(oldDice => oldDice.map(die=>{
            return die.id==id ?
                {...die,value: Math.ceil(Math.random() * 6)}:
                die
        }))
    }

    function RollDice(){
        if(!tenzies){
            setDiceArray(oldDice => oldDice.map(die=>{
                return die.isHeld?
                    die:
                    generateNewDie()
            }))
            setCurrentMoves(prev=>prev+1);
        }else{
            setTenzies(false);
            setCurrentMoves(0);
            setElapsedTime(0);

            const id = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);
            setIntervalId(id);
            
            setDiceArray(allNewDice);
            // console.log(elapsedTime);
            if((bestTime>elapsedTime && bestMoves>currentMoves) || (bestTime=="----------" && bestMoves=="----------")){
                if(bestTime>elapsedTime || bestTime=="----------"){
                    setBestTime(elapsedTime);
                    localStorage.setItem("bestTimeInLocal",JSON.stringify(elapsedTime));
                }
                if((currentMoves<bestMoves) || bestMoves=="----------"){
                    setBestMoves(currentMoves);
                    localStorage.setItem("highestScoreMove",JSON.stringify(currentMoves));
                }
            } 
        }
        
    }
    return(
        <div className="main--div">
            {tenzies && <Confetti/>}
            <motion.div 
                className="child--div"
                initial={{x:-400,opacity:0}}
                animate={{x:0,opacity:1}}
                transition={{type:'spring',stiffness:'100'}}
            >
                <Head/>
                <div className="parent--dice--div">
                    <div className="dice--div">
                        {diceElements}
                    </div> 
                </div>
                
                <div className="roll--div">
                    {
                        !start ?
                            (<button className="roll--dice" onClick={()=>StartGame()}>Start Game</button>)
                            :
                            (<button className="roll--dice" onClick={()=>RollDice()}>{tenzies?"New Game":"Roll"}</button>)
                    }
                </div>
            </motion.div>
            <Sidemenu bestTime={bestTime} currentTime={currentTime} bestMoves={bestMoves} currentMoves={currentMoves} elapsedTime={elapsedTime} />
        </div>
    )
}