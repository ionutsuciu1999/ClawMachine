import React, { useState, useEffect, useRef } from "react";

const ClawMachine = (props) => {
    let [money,setMoney] = useState(2);
    let [left,setLeft] = useState(15);
    let [top,setTop] = useState(6);
    let [leftCube,setLeftCube] = useState(left);
    let [topCube,setTopCube] = useState(top);
    let [displayCube,setDisplayCube] = useState(0);
    let [open,setOpen] = useState(0);
    let [blinking,setBlinking] = useState(0);
    let [randomColor,setRandomColor] = useState(45);

    //used to stop movement of arm when releasing the right or left arrow
    let moving = 0;
    //used to block other movments while the "GO" button finishes
    let canMove = 1;

    ////get updated left val state inside setTimeout
    const leftRef = useRef(left);
    leftRef.current = left;
    const topRef = useRef(top);
    topRef.current = top;
    const moneyRef = useRef(money);
    moneyRef.current = money;

    ////stop moving the claw if i release the mouse / drag the button
    const stopMove = () =>{
        if(canMove==1){
            moving = 0;
        }
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
                const result = await moveLoop(direction,amount,target).then((value)=>{if(value=="out of bounds"){i = distance }});
            }else{
                i = distance;
            }
        }
        
        return new Promise((resolve) => {
            resolve("ok");
        });
    }

    ////event handler, tells the loop what direction/amount the claw should move based on the button that was pressed
    const moveEventHandler = async(e) =>{
        moving = 1;
        if(e.target.id=="clawRight" && canMove==1){move("horizontal",0.30,200)}
        if(e.target.id=="clawLeft" && canMove==1){move("horizontal",-0.30,200)}

        if(e.target.id=="clawGo" && canMove==1){
            updateMoney(-1);
                if(moneyRef.current>0){
                setRandomColor(Math.floor(Math.random() * 359));
                canMove = 0;
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
                canMove = 1;
            }
        }
    }
   
    ////decreases/increases money, if it reaches 0, blink for 2 seconds
    const updateMoney = (amount) => {
        if((moneyRef.current>0 && moneyRef.current<10) || (moneyRef.current<=0 && amount>0) || (moneyRef.current>=10 && amount<0)){
            setMoney((money)=>money+amount);
        }else if(moneyRef.current<=0){
            setBlinking(1);
            setTimeout(() => {
                setBlinking(0);
            }, 2000);
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
        document.getElementById("clawMoney").addEventListener("click",()=>updateMoney(1));

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
                <div id="clawCubeContainer" style={{left:`${leftCube}%`,top:`${topCube}%`,filter:`hue-rotate(${randomColor}deg)`}}><img id="clawCube" src="../cube.png" style={{display:`${displayCube?"block":"none"}`}}/></div>
                
                <img id="clawLeftPressed" src="../leftPressed.png"/>
                <img id="clawLeft" src="../left.png"/>
                <img id="clawRightPressed" src="../rightPressed.png"/>
                <img id="clawRight" src="../right.png"/>
                <img id="clawGoPressed" src="../goPressed.png"/>
                <img id="clawGo" src="../go.png"/>
                <img id="clawMoneyPressed" src="../moneyPressed.png" className={blinking==1?"blinking":""}/>
                <img id="clawMoney" src="../money.png" className={blinking==1?"blinking":""}/>
                <span id="money">{money}</span>

                <img id="clawFront" src="../front.png"/>
                
                <img id="clawClaw" src={open ? "../clawopen.png" : "../clawclosed.png"} style={{left:`${left}%`,top:`${top}%`}} />

                <img id="clawBack" src="../back.png"/>
            </div>
        </div>
    )

}

export default ClawMachine;