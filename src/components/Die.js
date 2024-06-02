import React from "react"
import "../Die.css"

export default function Die(props){

    const styles = {
        backgroundColor : props.isHeld?"#59E391" : "white"
    }

    return(
        <div className="die" style={styles} onClick={props.start ? props.holdDice : null}>
            <h2>{props.start?props.value:"?"}</h2>
        </div>
    )
}