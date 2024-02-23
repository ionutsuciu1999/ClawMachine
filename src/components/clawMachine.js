import React, { useState, useEffect, useRef } from "react";

const ClawMachine = (props) => {
    let [money,setMoney] = useState(0);
    let [left,setLeft] = useState(12);
    let [top,setTop] = useState(10);
    let [open,setOpen] = useState(0);
    let moving = 0;

    //get updated left val state inside setTimeout
    const leftRef = useRef(left);
    leftRef.current = left;
    const topRef = useRef(top);
    topRef.current = top;

    const stopMove = () =>{
        console.log("Stop");
        moving = 0;
    }

    const moveLoop = (direction,amount) =>{

        //make a for loop & put set timeout in a promise

        return new Promise((resolve) => {
            setTimeout(() => {
                if(direction=="horizontal" && ((leftRef.current+amount) < 70) && ((leftRef.current+amount) > 10)){
                    setLeft((left)=>left+amount);
                }else if(direction=="vertical"){
                    setTop((top)=>top+amount);
                }
                resolve("ok");
            }, 10);
        });
    }

    const moveee = async (direction,amount,distance) =>{
        for(var i = 0; i<distance; i++){
            
            if(moving == 1){
                const result = await moveLoop(direction,amount).then((value)=>{console.log("INF")});
            } else {
                console.log("fin");
                //not getting returned because its recursive
            }
        }
    }

    function move(e){
        console.log(e.target.id);
        moving = 1;
        if(e.target.id=="clawRight"){moveee("horizontal",0.5,999)}
        if(e.target.id=="clawLeft"){moveee("horizontal",-0.5,999)}
        if(e.target.id=="clawGo"){
            console.log("gerpize");
            setOpen(1);
            moving = 1;
            console.log('calling');
            moveee("horizontal",-0.5,22);
        }
    }
   

    useEffect(() => {
        document.getElementById("clawRight").addEventListener("mousedown",move);
        document.getElementById("clawLeft").addEventListener("mousedown",move);
        document.getElementById("clawRight").addEventListener("dragend",stopMove);
        document.getElementById("clawRight").addEventListener("mouseup",stopMove);
        document.getElementById("clawLeft").addEventListener("dragend",stopMove);
        document.getElementById("clawLeft").addEventListener("mouseup",stopMove);
        document.getElementById("clawGo").addEventListener("click",move);

        return () => {
            document.getElementById("clawRight").removeEventListener("mousedown",move);
            document.getElementById("clawLeft").removeEventListener("mousedown",move);
            document.removeEventListener("dragend",stopMove);
            document.removeEventListener("mouseup",stopMove);
            document.getElementById("clawGo").removeEventListener("click",move);
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