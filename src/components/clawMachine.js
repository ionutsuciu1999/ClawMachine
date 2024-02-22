import React, { useState, useEffect } from "react";

const ClawMachine = (props) => {
    let [money,setMoney] = useState(0);
    let [left,setLeft] = useState(10);
    let [top,setTop] = useState(10);
    let [open,setOpen] = useState(0);
    let moving = 0;

    const stopMove = () =>{
        console.log("Stop");
        moving = 0;
    }

    const moveLoop = (direction) =>{
        setTimeout(() => {
            if(direction=="clawRight"){
                setLeft((left)=>left+0.5);
            }else if(direction=="clawLeft"){
                setLeft((left)=>left-0.5);
            }
            
            if(moving == 1){
                moveLoop(direction);
            }
        }, 10);
    }

    const move = (e) =>{
        console.log(e.target.id);
        moving = 1;
        moveLoop(e.target.id);
    }

    useEffect(() => {
        document.getElementById("clawRight").addEventListener("mousedown",move);
        document.getElementById("clawLeft").addEventListener("mousedown",move);
        document.addEventListener("dragend",stopMove);
        document.addEventListener("mouseup",stopMove);

        return () => {
            document.getElementById("clawRight").removeEventListener("mousedown",move);
            document.getElementById("clawLeft").removeEventListener("mousedown",move);
            document.removeEventListener("dragend",stopMove);
            document.removeEventListener("mouseup",stopMove);
        }
    },[]);

    return(
        <div id="clawMachineContainer">
            <div id="clawMachine">
                <img id="clawLeftPressed" src="../leftPressed.png"/>
                <img id="clawLeft" src="../left.png"/>
                <img id="clawRightPressed" src="../rightPressed.png"/>
                <img id="clawRight" src="../right.png"/>
                <img id="clawGoPressed" src="../goPressed.png"/>
                <img id="clawGo" src="../go.png"/>
                <img id="clawMoneyPressed" src="../moneyPressed.png"/>
                <img id="clawMoney" src="../money.png"/>
                <span id="money">{money}</span>

                <img id="clawFront" src="../front.png"/>
                
                <img id="clawClaw" src={open ? "../clawopen.png" : "../clawclosed.png"} style={{left:`${left}%`,top:`${top}%`}} />

                <img id="clawBack" src="../back.png"/>
            </div>
        </div>
    )

}

export default ClawMachine;