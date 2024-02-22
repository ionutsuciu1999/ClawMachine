import React, { useState, useEffect, useRef } from "react";

const ClawMachine = (props) => {
    let [money,setMoney] = useState(0);
    let [left,setLeft] = useState(10);
    let [top,setTop] = useState(10);
    let [open,setOpen] = useState(0);
    let moving = 0;

    //get updated left val state inside setTimeout
    const leftRef = useRef(left);
    leftRef.current = left;

    const stopMove = () =>{
        console.log("Stop");
        moving = 0;
    }

    const moveLoop = (direction,amount) =>{
        setTimeout(() => {
            console.log(leftRef.current);
            console.log(direction);
            if(direction=="right" && leftRef.current < 70){
                setLeft((left)=>left+amount);
            }else if(direction=="left" && leftRef.current > 11){
                setLeft((left)=>left-amount);
            }else if(direction=="down"){
                setTop((top)=>top+amount);
            }
            
            if(moving == 1){
                moveLoop(direction,amount);
            }
        }, 10);
    }

    const move = (e) =>{
        console.log(e.target.id);
        moving = 1;
        if(e.target.id=="clawRight"){moveLoop("right",0.5)}
        if(e.target.id=="clawLeft"){moveLoop("left",0.5)}
        if(e.target.id=="clawGo"){getPrize()}
    }

    const getPrize = () =>{
        console.log("gerpize");
        setOpen(1);
        moveLoop("down",20);
    }
    const moveDown = () =>{

    }

    useEffect(() => {
        document.getElementById("clawRight").addEventListener("mousedown",move);
        document.getElementById("clawLeft").addEventListener("mousedown",move);
        document.getElementById("clawRight").addEventListener("dragend",stopMove);
        document.getElementById("clawRight").addEventListener("mouseup",stopMove);
        document.getElementById("clawLeft").addEventListener("dragend",stopMove);
        document.getElementById("clawLeft").addEventListener("mouseup",stopMove);
        document.getElementById("clawGo").addEventListener("click",getPrize);

        return () => {
            document.getElementById("clawRight").removeEventListener("mousedown",move);
            document.getElementById("clawLeft").removeEventListener("mousedown",move);
            document.removeEventListener("dragend",stopMove);
            document.removeEventListener("mouseup",stopMove);
            document.getElementById("clawGo").removeEventListener("click",getPrize);
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