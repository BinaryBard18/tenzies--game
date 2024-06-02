import React from "react"
import "../sidemenu.css"
import {motion} from "framer-motion"

export default function Sidemenu(props){

    return(
        <motion.div 
            className="sidemenu--div"
            initial={{x:400,opacity:0}}
            animate={{x:0,opacity:1}}
            transition={{type:'spring',stiffness:'100'}}
        >
            <div className="title--underline">
                <h2 className="score--title">Scoreboard</h2>
                <div className="underline"></div>
            </div>
            <div className="highScore">
                <p 
                    className="score" 
                >
                    HighScore :       
                </p>
                    <motion.div 
                        className="highScore--on"
                        initial={{y:'-20px',opacity:0}}
                        animate={{y:'0',opacity:1}}
                        transition={{stiffness:150,type:'spring',delay:1}}
                    >
                        <p>Best Moves : {props.bestMoves}</p>
                        <p>Best Time : {props.bestTime}</p>
                    </motion.div>

                <motion.div 
                    className="underline1"
                    initial={{y:'-20px',opacity:0}}
                    animate={{y:'0',opacity:1}}
                    transition={{stiffness:150,type:'spring'}}
                ></motion.div>
            </div>
            <div className="currentScore">
                <p className="title--score">Current Score : </p>
                <motion.div 
                    className="currentScore--on"
                    initial={{y:'-20px',opacity:0}}
                    animate={{y:'0',opacity:1}}
                    transition={{stiffness:150,type:'spring',delay:1.5}}
                >
                    <p>Moves : {props.currentMoves}</p>
                    <p>Time : {props.elapsedTime}</p>
                </motion.div>
                <motion.div 
                    className="underline2"
                    initial={{y:'-20px',opacity:0}}
                    animate={{y:'0',opacity:1}}
                    transition={{stiffness:150,type:'spring'}}
                ></motion.div>
            </div>

            <motion.div 
                className="copyright--section"
                initial={{y:30,opacity:0}}
                animate={{y:0,opacity:1}}
                transition={{type:'spring',stiffness:150,delay:1.6}}
            >
                <i class='bx bx-copyright' id="copyright" ></i>
                <p>All Copyrights Reserved</p>
            </motion.div>
            
        </motion.div>
    )
}