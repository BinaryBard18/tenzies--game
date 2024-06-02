import React from "react"
import "../Head.css"
import diceImage from "../dice--tenzies--logo.png"

export default function Head(){
    return(
        <div className="head">
            <div className="title--logo">
                <h1>Tenzies</h1>
                <img src={diceImage} alt="DiceImage" className="diceLogo"/>
            </div>
            
            <p className="description">
                Roll until all dice are the same. 
                Click each die to freeze it at its 
                current value between rolls.
            </p>
        </div>
    )
}