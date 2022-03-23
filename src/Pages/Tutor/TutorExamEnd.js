
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./TutorExam.css";


const TutorExamEnd = (props) => {
 
  const [isPage, setIsPage] = useState(true);
 
useEffect(()=>{

    if(!props.subject ){
        console.log({subjectCheck:props.subject})
        setIsPage(false)
    }
},[])
  

  return (
    <div>
      
     {isPage && <div
        role="main"
        class="form-all"
        style={{ marginLeft: "27%", marginTop: "70px", width: "50%" }}
      >
        <ul class="form-section page-section">
          <li id="cid_1" class="form-input-wide" data-type="control_head">
            <div class="form-header-group  header-default">
              <div class="header-text httac htvam">
                <h2
                  id="header_1"
                  class="form-header"
                  data-component="header"
                  style={{ textAlign: "center" }}
                >
                  Tutor Registration Test
                </h2>
              </div>
            </div>
          </li>
          <li >
         <div id="cid_13" class="form-input-wide">
           <div id="text_13" class="form-html" data-component="text" >
           <div style={{textAlign:"center" ,justifyContent: "center" }}>
             <strong style={{color:"darkorange"}}>You have successfully submitted</strong>
             <div style={{marginTop:"10%" ,marginBottom:"5%" ,backgroundColor:"#f2ffff"}}>
             <div style={{display:"flex", justifyContent:"center" }}><span style={{flex: "50%"}}> Exam Id : </span><p style={{flex: "50%"}}>{props.examId}</p></div>
             <div style={{display:"flex", justifyContent:"center" }}><span style={{flex: "50%"}}> Subject : </span><p style={{flex: "50%"}}>{props.subject}</p></div>
             <div style={{display:"flex", justifyContent:"center" }}><span style={{flex: "50%"}}> Marks : </span><p style={{flex: "50%"}}>{+props.result*4}/100</p></div>
             <div style={{display:"flex", justifyContent:"center" }}><span style={{flex: "50%"}}> Status : </span> <p style={{color: props.resultStatus==="fail" ? "red": "green",flex: "50%"}}>{props.resultStatus}</p></div>
             </div>

     
             {props.resultStatus==="fail" && <span style={{color:"red"}}>Sorry,You are not able to qualify this test. Good luck for next time!!</span>}
             {props.resultStatus==="pass" && <span style={{color:"green"}}>Congrats!! You have qualified this test</span>} 
            </div>
           </div>
         </div>
       </li>
         
         
          <li style={{ display: "none" }}>
            Should be Empty:
            <input type="text" name="website" value="" />
          </li>
        </ul>
      </div>}

      {!isPage && <div style={{textAlign:"center" ,marginTop:"10%"}}>
      <h1 style={{color:"black"}}>404</h1><h1 style={{color:"black"}}>Not Found</h1><br/><h3 style={{color:"black"}}>Invalid Grant!!</h3>
    </div>}
    </div>
  );
};

export default TutorExamEnd;
