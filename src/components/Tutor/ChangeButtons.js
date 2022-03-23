import React,{useState} from 'react';
import Button from "@mui/material/Button";


const ChangeButtons = (props) => {
//     const [isclick1,setIsClick1]=useState(false)
//     const ClickHandler1=()=>{
//         props.clickHandler(false)
//             setIsClick1(false)
//     }
//     const ClickHandler2=()=>{
//         props.clickHandler(true)
//         setIsClick1(true)
// }
    return (
        <div>
            <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                      <a className= {props.isClick ? "nav-link  text-capitalize a-tag" : "nav-link  text-capitalize active"} href="#/">
                      
                       <Button style={{color:"blueviolet",fontWeight:"bold"}} onClick={()=>props.setIsClick(false)}>Assignment</Button>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class={!props.isClick ? "nav-link  text-capitalize a-tag" : "nav-link  text-capitalize active"}
                        href="#/?type=session"
                      >
                        
                       <Button style={{color:"blueviolet",fontWeight:"bold"}} onClick={ ()=>props.setIsClick(true)}> Live Session</Button>
                      </a>
                    </li>
                  </ul>
        </div>
    );
};

export default ChangeButtons;