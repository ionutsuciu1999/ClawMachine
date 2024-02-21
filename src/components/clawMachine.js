import React, { useState } from "react";

const ClawMachine = (props) => {
    let [money,setMoney] = useState(0);

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
                
                <img id="clawClaw" src="../clawclosed.png"/>
                <img id="clawBack" src="../back.png"/>
            </div>
        </div>
    )

}

export default ClawMachine;