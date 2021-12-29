import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./registrationForm.css";
import axios from "axios";
import { dropdownDataUrl, storeDataUrl } from "../serviceUrls/ServiceUrl";

const RegistrationForm = (props) => {
  const [branches, setBranches] = useState();
  const [subjects, setSubjects] = useState();
  const [skill, setSkill] = useState([]);
  const [otherSkill, setOtherSkill] = useState("");
  const [bestSub, setBestSub] = useState([]);
  const [checkPanName,setCheckPanName]=useState(true);
  const [checkPanNumber,setCheckPanNumber]=useState(true);
  const [checkPanFile,setCheckPanFile]=useState(true);
  const [validPanNo,setValidPanNo]=useState(true)
  
  const history = useHistory();
  // const [data, setData] = useState({
  //   panName:"",
  //   panNumber:""
  // });
  // const {

  //   panName,
  //   panNumber
  // } = data;
  console.log(props.data);
  const handleChange = (e) => {
    setCheckPanName(true);
    setCheckPanNumber(true);
    setValidPanNo(true)
    props.setData({
      ...props.data,
      [e.target.name]: e.target.value,
    });
  };

  const handleFiles = (e) => {
    setCheckPanFile(true)
    let mfiles = e.target.files;

    let formdata1 = [];

    for (let i = 0; i < mfiles.length; i++) {
      formdata1.push(mfiles[i]);
      props.setData({
        ...props.data,
        panFile: formdata1,
      });
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    history.replace("/registration-form");
  };

  const handleNext = (e) => {
    e.preventDefault();
    // if (
    //   props.panName.length > 0 &&
    //   props.panNumber.length > 0 &&
    //   props.panFile.length > 0
    // ) {
      if( props.panName.length === 0){
        setCheckPanName(false);
      }
      else if(props.panNumber.length===0){
        setCheckPanNumber(false);
      }
      else if(props.panFile.length===0){
        setCheckPanFile(false)
      }
     else{ 
       let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

      if (regex.test(props.panNumber)) {
        history.replace("/accountDetails");
      } else {
        // alert("Please Enter a Valid Pan Number");
        setValidPanNo(false)
      }
    }
    // } else {
    //   alert("please fill all the required feilds*");
    // }
  };

  return (
    <div className="main_container" style={{ height: "1000px" }}>
      <div className="main">
        <div className="container">
          <form className="appointment-form" id="appointment-form">
            <h2>TutorPoint India Registration Form</h2>

            <br />
            <p>*Required</p>
            <br />
            <br />
            <div className="form-group-1">
              <input
                type="text"
                name="panName"
                id="panName"
                value={props.panName}
                onChange={handleChange}
                placeholder="Full Name (As per your PAN Card) *"
                required
              />
              {!checkPanName && <p style={{color:"red" ,marginTop:"-30px",marginBottom:"20px"}}>Please enter name same as in Pan card</p>}

              <input
                type="text"
                name="panNumber"
                id="nampanNumbere"
                value={props.panNumber}
                onChange={handleChange}
                placeholder="PAN Card Number*"
                required
                multiple
              />
               {!checkPanNumber && <p style={{color:"red" ,marginTop:"-30px",marginBottom:"20px"}}>Please enter Pan card number</p>}
               {!validPanNo && <p style={{color:"red" ,marginTop:"-30px",marginBottom:"20px"}}>Please enter a valid pan number</p>}

              <input
                type="file"
                name="panFile"
                id="panFile"
                // value={props.panFile}
                onChange={(e) => handleFiles(e)}
                placeholder="PAN Card Image(PNG/JPG)*"
                multiple
                required
              />

            {!checkPanFile && <p style={{color:"red" ,marginTop:"-30px"}}>Please add file</p>}  
            </div>
            {/* <div className='form-check'>
              <label for='agree-term' className='label-agree-term'>
                I agree that I have read the{' '}
                <a
                  href='https://tutorpoint.in/p_policy.php'
                  target='_blank'
                  rel='noreferrer'
                  className='term-service'
                >
                  Privacy and Policy
                </a>
              </label>
            </div> */}
            <div className="form-submit" style={{display:"flex"}}>
            <div className="col-sm " style={{width:"50%"}}><h4 style={{color:"gray"}}>Step 2/3</h4></div>
              <div style={{width:"50%" }}>
              <input
                type="submit"
                name="previous"
                id="previous"
                className="previous"
                value="Previous"
                onClick={handlePrevious}
              />
              </div >
             
              <input
                type="submit"
                name="Next"
                id="Next"
                className="submit"
                value="Next"
                onClick={handleNext}
              />
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
