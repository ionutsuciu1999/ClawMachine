import React, { useState, useEffect, useRef } from "react";

const ClawMachine = (props) => {
    let [money,setMoney] = useState(0);
    let [left,setLeft] = useState(15);
    let [top,setTop] = useState(6);
    let [leftCube,setLeftCube] = useState(left);
    let [topCube,setTopCube] = useState(top);
    let [displayCube,setDisplayCube] = useState(0);
    let [open,setOpen] = useState(0);
    let moving = 0;

    ////get updated left val state inside setTimeout
    const leftRef = useRef(left);
    leftRef.current = left;
    const topRef = useRef(top);
    topRef.current = top;

    ////stop moving the claw if i release the mouse / drag the button
    const stopMove = () =>{
        console.log("Stop");
        moving = 0;
    }

    ////move the claw 
    const moveLoop = (direction,amount,target) =>{

        return new Promise((resolve) => {
            setTimeout(() => {
                
                    if(direction=="horizontal"){
                        if(((leftRef.current+amount) < 70) && ((leftRef.current+amount) > 13)){
                            //if the targer is "cube", only move the cube not the claw, else move both
                            if(target=="cube"){
                                setLeftCube((left)=>left+amount);
                            }else{
                                setLeft((left)=>left+amount);
                                setLeftCube((left)=>left+amount);
                            }
                        } else {
                            //exit if i reach the left or right end
                            resolve("out of bounds");
                        }
                    }else if(direction=="vertical"){
                        //if the targer is "cube", only move the cube not the claw, else move both
                        if(target=="cube"){
                            setTopCube((top)=>top+amount);
                        }else{
                            setTop((top)=>top+amount);
                            setTopCube((top)=>top+amount);
                        }
                    }
                    resolve("ok");
            }, 20);
        });
    }

    ////loop allows the user to keep the right and left button pressed,
    ////it stops after a certain distance is reached, or the button event "mouseUp" sets moving = 0
    const move = async (direction,amount,distance,target) =>{
        for(var i = 0; i<distance; i++){

            //move until the left or right button is released, or until i reach the left or right end and it returns "out of bounds"
            if(moving == 1){
                const result = await moveLoop(direction,amount,target).then((value)=>{if(value=="out of bounds"){i = distance } console.log(value)});
            }else{
                i = distance;
                console.log("nomove");
            }
        }
        
        return new Promise((resolve) => {
            resolve("ok");
        });
    }

    ////event handler, tells the loop what direction/amount the claw should move based on the button that was pressed
    const moveEventHandler = async(e) =>{
        console.log(e.target.id);
        moving = 1;
        if(e.target.id=="clawRight"){move("horizontal",0.30,200)}
        if(e.target.id=="clawLeft"){move("horizontal",-0.30,200)}

        if(e.target.id=="clawGo"){
            setOpen(1);
            await move("vertical",0.25,50);

            //sync cube pos with claw in case the cube is dropped and is in a different place
            setLeftCube(leftRef.current);
            setTopCube(topRef.current);
            setOpen(0);

            //chance out of 10 of getting a prize
            Math.floor(Math.random() * 10) < 4 ? setDisplayCube(1) : setDisplayCube(0);

            await move("vertical",-0.25,50);
            await move("horizontal",-0.30,200);
            setOpen(1);
            await move("vertical",0.40,50,"cube");
            setOpen(0);
        }
    }
   
    const updateMoney = (e) => {
        console.log("upd");
        console.log(e);
        if(e.target.id=="clawMoney"){
            setMoney((money)=>money<10?money+1:money);
        }else{
            setMoney((money)=>money>0?money-1:money);
        }
    }

    ////on first render add all event handlers
    useEffect(() => {
        document.getElementById("clawRight").addEventListener("mousedown",moveEventHandler);
        document.getElementById("clawLeft").addEventListener("mousedown",moveEventHandler);
        document.getElementById("clawRight").addEventListener("dragend",stopMove);
        document.getElementById("clawRight").addEventListener("mouseup",stopMove);
        document.getElementById("clawLeft").addEventListener("dragend",stopMove);
        document.getElementById("clawLeft").addEventListener("mouseup",stopMove);
        document.getElementById("clawGo").addEventListener("click",moveEventHandler);
        document.getElementById("clawMoney").addEventListener("click",updateMoney);

        return () => {
            document.getElementById("clawRight").removeEventListener("mousedown",moveEventHandler);
            document.getElementById("clawLeft").removeEventListener("mousedown",moveEventHandler);
            document.removeEventListener("dragend",stopMove);
            document.removeEventListener("mouseup",stopMove);
            document.getElementById("clawGo").removeEventListener("click",moveEventHandler);
        }
    },[]);

    return(
        <div id="clawMachineContainer">
            <div id="clawMachine">
                <div id="clawCubeContainer" style={{left:`${leftCube}%`,top:`${topCube}%`}}><img id="clawCube" src="../cube.png" style={{display:`${displayCube?"block":"none"}`}}/></div>
                
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