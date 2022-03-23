import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./TutorExam.css";
import Loader1 from "../../components/LinearLoder";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const TutorExam = (props) => {
  var num = 1;
  // let subjectList=['Soil Mechanics','Mass Transfer','Business Math','Physical chemistry']
  const [base64, setBase64] = useState([]);
  const [answer, setAnswer] = useState({});
  const [answerObject, setAnswerObject] = useState([]);
  const [inputId, setInputId] = useState();
  const [showTimer, setShowTimer] = useState(false);
  // const [examDone,setExamDone]=useState(false);

  const [timeEnds, setTimeEnds] = useState(false);
  const [isPage, setIsPage] = useState(true);
  const [result, setResult] = useState();
  const [loaderVisible, setLoaderVisible] = useState(false);

  // timer
  const { initialMinute = props.timeOfTest, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  // const [keyArray,setKeyArray]=useState()
  const history = useHistory();

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          setTimeEnds(true);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const changeHandler = (e) => {
    let val = e.target.value;
    let name=e.target.name;
    let key=e.target.key;
    // const regMatch = /^[a-dA-D]*$/.test(val);

    // if (val.length <= 1 && regMatch) {
      // val = val.toUpperCase();
      let Id = e.target.id;
      console.log({targetName:name})
      console.log({ID_test:key})
      let inputObj = {};
      // setInputId(name);
      inputObj[name] = val;
      // setAnswer({ ...answer, ...inputObj });
      setAnswer({...answer, ...inputObj});
      // setAnswerObject()
     
    // }
  };
  console.log({answer})

  const get_questions = async () => {
    console.log({ subjectList: props.subjectList });
    //   const getQues=await Axios.post("http://localhost:8800/tutor/get_questions",{subjectList:props.subjectList});

    //   if (getQues?.data?.questionArr?.length!==0){
    //     console.log({getQues:getQues.data.questionArr})
    //     let keys=getQues.data.keyArr
    //     setKeyArray(getQues.data.keyArr)
    //     console.log({keys})

    //     let getQuesAr=getQues.data.questionArr;
    //     let base64String=[];
    //     getQuesAr.map((el)=>{

    //      base64String.push(btoa(String.fromCharCode(...new Uint8Array(el.data))));
    //     // const base64String = new Buffer.from(getQues.data.questionArr.data).toString("ascii")

    //   })
    // console.log({base64String});
    setBase64(props.currentBase64);
    // }
    // else{
    //   console.log({getQues:"not Found"})
    // }
  };

  const submitHandler = async () => {
    let answerObj = [];
    setLoaderVisible(true);
    props.keyArSend.map((el3, index) => {
      let oneObject = { Key: "", Answer: "", Subject: "" };
      oneObject.Key = el3[0];
      oneObject.Subject = el3[1];
      oneObject.Answer = answer[index+1];
      answerObj.push(oneObject);
    });
    console.log({ answerObj });
    const getSheet = await Axios.post("http://localhost:8800/tutor/get_sheet", {
      answerObj,
      subjectList: props.subjectList,
      tutorId: props.tutorId,
      examId: props.examId,
    });

    if (getSheet.data.success === true) {
      // alert("Congrats!!!You passed the test")
      // setMinutes(0)
      // setSeconds(0)
      history.replace("/tutorExam_Submitted");
      setShowTimer(false);
      setLoaderVisible(false);
      props.setResult_func(getSheet.data.result);
      props.setResultStatus_func(getSheet.data.status);
      props.setSubject_func(getSheet.data.subject);
      // setExamDone(true)
      console.log({ marks: getSheet.data.result });
    }
    // else if(getSheet.data.success===true && getSheet.data.status==="fail"){
    //   // alert("You failed the test!!Try ")
    //   setMinutes(0)
    //   setSeconds(0)
    //   console.log({marks:getSheet.data.result})
    // }
    else {
      setMinutes(0);
      setSeconds(0);
      // setExamDone(false)
      setLoaderVisible(false);
      alert("something went wrong!!");
    }
  };

  useEffect(() => {
    // setCount("1")
    if (props.currentBase64.length !== 0) {
      setIsPage(true);
      get_questions();
    }else{
      setIsPage(false)
    }
  }, []);


  

  useEffect(() => {
    // setCount("1")
    if (minutes === 0 && seconds === 0) {
      submitHandler();
    }
  }, [timeEnds]);
  // console.log({answer:answer})

  return (
    <>
      {loaderVisible && <Loader1 />}

      {isPage && (
        <div>
          {
            <div id="countdown">
              {minutes === 0 && seconds === 0 ? (
                <div>
                  <div className="minutes">
                    {" "}
                    <div className="c-number">00</div> MINUTES
                  </div>
                  <div className="seconds">
                    {" "}
                    <div className="c-number">00 </div>SECONDS
                  </div>
                </div>
              ) : (
                <div>
                  <div className="minutes">
                    {" "}
                    <div className="c-number">{minutes}</div> MINUTES
                  </div>
                  <div className="seconds">
                    {" "}
                    <div className="c-number">
                      {seconds < 10 ? `0${seconds}` : seconds}{" "}
                    </div>
                    SECONDS
                  </div>
                </div>
              )}
            </div>
          }

          <div
            role="main"
            class="form-all"
            style={{
              marginLeft: "27%",
              marginTop: "30px",
              width: "50%",
              height: "52rem",
              overflowY: "scroll",
            }}
          >
            <ul class="form-section page-section">
              {/* <li id="cid_1" class="form-input-wide" data-type="control_head"><div  id="countdown">
        { (minutes === 0 && seconds === 0)
            ? null
            : <div >
              
              <div className="minutes"> <div className="c-number">{minutes}</div> MINUTES</div> 
           <div className="seconds"> <div className="c-number">{seconds < 10 ?  `0${seconds}` : seconds} </div>SECONDS</div> 
           
           </div>
        }
        </div></li> */}
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

              {base64.map((el1) => (
                <div>
                  <li class="form-line" data-type="control_divider" id="id_34">
                    <div id="cid_34" class="form-input-wide">
                      <div
                        class="divider"
                        aria-label="Divider"
                        data-component="divider"
                        style={{
                          borderBottomWidth: "1px",
                          borderBottomStyle: "solid",
                          borderColor: "#e6e6e6",
                          height: "1px",
                          marginLeft: "0px",
                          marginRight: "0px",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      ></div>
                    </div>
                  </li>
                  <li class="form-line" data-type="control_textarea" id="id_6">
                    <label
                      class="form-label form-label-top form-label-auto"
                      id="label_6"
                      for="input_6"
                    >
                      {" "}
                      Question {num}
                      {/* {setCount(count+1)} {" "} */}
                    </label>
                    <div id="cid_6" class="form-input-wide">
                      <img
                        src={`data:image/jpeg;base64,${el1}`}
                        alt=""
                        style={{ width: "-webkit-fill-available" }}
                      />
                      {/* <input
                key={num}
                id={`${num}`}
                name="q4_studentId"
                data-type="input-number"
                class=" form-number-input form-textbox"
                data-defaultvalue=""
                style={{ width: "140px" }}
                size="15"
                onChange={(e)=>changeHandler(e)}
                
                value={answer[`${num++}`]}
                placeholder="Option A,B,C or D"
                
                aria-labelledby="label_4"
                step="any"
              /> */}
                      <FormControl>
                        {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                        {/* <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                name="radio-buttons-group"
              >
                <FormControlLabel value="A" control={<Radio />} label="A" />
                <FormControlLabel value="B" control={<Radio />} label="B" />
                <FormControlLabel value="C" control={<Radio />} label="C" />
                <FormControlLabel value="D" control={<Radio />} label="D" />
              </RadioGroup> */}

                        <RadioGroup
                          row
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name={num}
                          onChange={changeHandler}
                          // key={num}
                          // id={`${num}`}
                          value={answer[`${num++}`]}
                          style={{
                            marginLeft: "10px",
                            marginTop: "25px",
                            marginBottom: "-25px",
                          }}
                        >
                          <FormControlLabel
                            value="A"
                            control={<Radio />}
                            label="A"
                          />
                          <FormControlLabel
                            value="B"
                            control={<Radio />}
                            label="B"
                          />
                          <FormControlLabel
                            value="C"
                            control={<Radio />}
                            label="C"
                          />
                          <FormControlLabel
                            value="D"
                            control={<Radio />}
                            label="D"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </li>
                </div>
              ))}

              <div>
                {/* <li class="form-line" data-type="control_divider" id="id_18">
            <div id="cid_18" class="form-input-wide">
              <div
                class="divider"
                aria-label="Divider"
                data-component="divider"
                style={{
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderColor: "#e6e6e6",
                  height: "1px",
                  marginLeft: "0px",
                  marginRight: "0px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              ></div>
            </div>
          </li>
          <li class="form-line" data-type="control_radio" id="id_8">
            <label
              class="form-label form-label-top form-label-auto"
              id="label_8"
              for="input_8"
            >
              {" "}
              2. A True/False sentence. (5 points){" "}
            </label>
            <div id="cid_8" class="form-input-wide">
              <div
                class="form-multiple-column"
                data-columncount="2"
                role="group"
                aria-labelledby="label_8"
                data-component="radio"
              >
                <span class="form-radio-item">
                  <span class="dragger-item"></span>
                  <input
                    type="radio"
                    aria-describedby="label_8"
                    class="form-radio"
                    id="input_8_0"
                    name="q8_2A8"
                    value="True"
                    data-calcvalue="5"
                  />
                  <label id="label_input_8_0" for="input_8_0">
                    {" "}
                    True{" "}
                  </label>
                </span>
                <span class="form-radio-item">
                  <span class="dragger-item"></span>
                  <input
                    type="radio"
                    aria-describedby="label_8"
                    class="form-radio"
                    id="input_8_1"
                    name="q8_2A8"
                    value="False"
                    data-calcvalue="0"
                  />
                  <label id="label_input_8_1" for="input_8_1">
                    {" "}
                    False{" "}
                  </label>
                </span>
              </div>
            </div>
          </li>
          <li class="form-line" data-type="control_divider" id="id_40">
            <div id="cid_40" class="form-input-wide">
              <div
                class="divider"
                aria-label="Divider"
                data-component="divider"
                style={{
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderColor: "#e6e6e6",
                  height: "1px",
                  marginLeft: "0px",
                  marginRight: "0px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              ></div>
            </div>
          </li>
          <li
            class="form-line calculatedOperand"
            data-type="control_radio"
            id="id_37"
          >
            <label
              class="form-label form-label-top form-label-auto"
              id="label_37"
              for="input_37"
            >
              {" "}
              3. Yes/No Question? (5 points){" "}
            </label>
            <div id="cid_37" class="form-input-wide">
              <div
                class="form-multiple-column"
                data-columncount="2"
                role="group"
                aria-labelledby="label_37"
                data-component="radio"
              >
                <span class="form-radio-item">
                  <span class="dragger-item"></span>
                  <input
                    type="radio"
                    aria-describedby="label_37"
                    class="form-radio"
                    id="input_37_0"
                    name="q37_3Yesno"
                    value="Yes"
                    data-calcvalue="5"
                  />
                  <label id="label_input_37_0" for="input_37_0">
                    {" "}
                    Yes{" "}
                  </label>
                </span>
                <span class="form-radio-item">
                  <span class="dragger-item"></span>
                  <input
                    type="radio"
                    aria-describedby="label_37"
                    class="form-radio"
                    id="input_37_1"
                    name="q37_3Yesno"
                    value="No"
                    data-calcvalue="5"
                  />
                  <label id="label_input_37_1" for="input_37_1">
                    {" "}
                    No{" "}
                  </label>
                </span>
              </div>
            </div>
          </li>
          <li
            class="form-line form-field-hidden calculatedOperand"
            style={{ display: "none !important" }}
            data-type="control_textarea"
            id="id_38"
          >
            <label
              class="form-label form-label-top form-label-auto"
              id="label_38"
              for="input_38"
            >
              {" "}
              3.1. Why Yes? Please briefly explain the reason.{" "}
            </label>
            <div id="cid_38" class="form-input-wide">
              <textarea
                id="input_38"
                class="form-textarea"
                name="q38_31Why"
                cols="68"
                rows="3"
                data-component="textarea"
                aria-labelledby="label_38"
              ></textarea>
            </div>
          </li>
          <li
            class="form-line form-field-hidden"
            style={{ display: "none !important" }}
            data-type="control_textarea"
            id="id_39"
          >
            <label
              class="form-label form-label-top form-label-auto"
              id="label_39"
              for="input_39"
            >
              {" "}
              3.1. Why No? Please briefly explain the reason.{" "}
            </label>
            <div id="cid_39" class="form-input-wide">
              <textarea
                id="input_39"
                class="form-textarea"
                name="q39_31Why39"
                cols="68"
                rows="3"
                data-component="textarea"
                aria-labelledby="label_39"
              ></textarea>
            </div>
          </li>
          <li class="form-line" data-type="control_divider" id="id_20">
            <div id="cid_20" class="form-input-wide">
              <div
                class="divider"
                aria-label="Divider"
                data-component="divider"
                style={{
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderColor: "#e6e6e6",
                  height: "1px",
                  marginLeft: "0px",
                  marginRight: "0px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              ></div>
            </div>
          </li>
          <li class="form-line" data-type="control_image" id="id_14">
            <div id="cid_14" class="form-input-wide">
              <div style={{ textAlign: "center" }}>
                <img
                  alt=""
                  class="form-image"
                  style={{ border: "0" }}
                  src="https://www.jotform.com/uploads/LaurelWood/form_files/Screen%20Shot%202020-04-02%20at%2016.04.18.5e85e2ec9241e3.88268558.png"
                  height="100px"
                  width="128px"
                  data-component="image"
                />
              </div>
            </div>
          </li>
          <li class="form-line" data-type="control_radio" id="id_12">
            <label
              class="form-label form-label-top form-label-auto"
              id="label_12"
              for="input_12"
            >
              {" "}
              4. Looking at the image above, question? (5 points){" "}
            </label>
            <div id="cid_12" class="form-input-wide">
              <div
                class="form-single-column"
                role="group"
                aria-labelledby="label_12"
                data-component="radio"
              >
                <span class="form-radio-item" style={{ clear: "left" }}>
                  <span class="dragger-item"></span>
                  <input
                    type="radio"
                    aria-describedby="label_12"
                    class="form-radio"
                    id="input_12_0"
                    name="q12_4Looking"
                    value="Wrong Answer"
                    data-calcvalue="0"
                  />
                  <label id="label_input_12_0" for="input_12_0">
                    {" "}
                    Wrong Answer{" "}
                  </label>
                </span>
                <span class="form-radio-item" style={{ clear: "left" }}>
                  <span class="dragger-item"></span>
                  <input
                    type="radio"
                    aria-describedby="label_12"
                    class="form-radio"
                    id="input_12_1"
                    name="q12_4Looking"
                    value="Wrong Answer"
                    data-calcvalue="0"
                  />
                  <label id="label_input_12_1" for="input_12_1">
                    {" "}
                    Wrong Answer{" "}
                  </label>
                </span>
                <span class="form-radio-item" style={{ clear: "left" }}>
                  <span class="dragger-item"></span>
                  <input
                    type="radio"
                    aria-describedby="label_12"
                    class="form-radio"
                    id="input_12_2"
                    name="q12_4Looking"
                    value="Wrong Answer"
                    data-calcvalue="0"
                  />
                  <label id="label_input_12_2" for="input_12_2">
                    {" "}
                    Wrong Answer{" "}
                  </label>
                </span>
                <span class="form-radio-item" style={{ clear: "left" }}>
                  <span class="dragger-item"></span>
                  <input
                    type="radio"
                    aria-describedby="label_12"
                    class="form-radio"
                    id="input_12_3"
                    name="q12_4Looking"
                    value="Correct Answer"
                    data-calcvalue="5"
                  />
                  <label id="label_input_12_3" for="input_12_3">
                    {" "}
                    Correct Answer{" "}
                  </label>
                </span>
                <span class="form-radio-item" style={{ clear: "left" }}>
                  <span class="dragger-item"></span>
                  <input
                    type="radio"
                    aria-describedby="label_12"
                    class="form-radio"
                    id="input_12_4"
                    name="q12_4Looking"
                    value="Wrong Answer"
                    data-calcvalue="0"
                  />
                  <label id="label_input_12_4" for="input_12_4">
                    {" "}
                    Wrong Answer{" "}
                  </label>
                </span>
              </div>
            </div>
          </li>
          <li class="form-line" data-type="control_divider" id="id_21">
            <div id="cid_21" class="form-input-wide">
              <div
                class="divider"
                aria-label="Divider"
                data-component="divider"
                style={{
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderColor: "#e6e6e6",
                  height: "1px",
                  marginLeft: "0px",
                  marginRight: "0px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              ></div>
            </div>
          </li>
          <li class="form-line" data-type="control_fileupload" id="id_15">
            <label
              class="form-label form-label-top form-label-auto"
              id="label_15"
              for="input_15"
            >
              {" "}
              5. Question?. Explain by drawing on an empty sheet, take a photo
              of it after you finish, and upload the photo of the sheet here.
              (10 points){" "}
            </label>
            <div id="cid_15" class="form-input-wide">
              <div data-wrapper-react="true" class="validate[multipleUpload]">
                <div class="qq-uploader">
                  <div class="qq-upload-drop-area" style={{ display: "none" }}>
                    <span>Drop files here to upload</span>
                  </div>
                  <div
                    class="qq-upload-button "
                    aria-hidden="true"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      direction: "ltr",
                    }}
                  >
                    Browse Files
                  </div>
                  <div
                    class="inputContainer"
                    role="button"
                    aria-label="Browse Files"
                    tabindex="0"
                  >
                    <input
                      multiple="multiple"
                      class="fileupload-input"
                      id="input_15"
                      type="file"
                      name="file"
                      aria-labelledby="label_15"
                      aria-hidden="true"
                      tabindex="-1"
                    />
                  </div>
                  <label
                    class="form-sub-label"
                    for="5Question"
                    id="label_5Question"
                  >
                    {" "}
                    **You can upload 2 files at max.{" "}
                  </label>
                  <span
                    style={{ display: "none" }}
                    class="multipleFileUploadLabels cancelText"
                  >
                    Cancel
                  </span>
                  <span
                    style={{ display: "none" }}
                    class="multipleFileUploadLabels ofText"
                  >
                    of
                  </span>
                  <ul class="qq-upload-list" aria-label="Uploaded files"></ul>
                </div>
              </div>
            </div>
          </li>
          <li class="form-line" data-type="control_divider" id="id_24">
            <div id="cid_24" class="form-input-wide">
              <div
                class="divider"
                aria-label="Divider"
                data-component="divider"
                style={{
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderColor: "#e6e6e6",
                  height: "1px",
                  marginLeft: "0px",
                  marginRight: "0px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              ></div>
            </div>
          </li>
          <li class="form-line" data-type="control_widget" id="id_22">
            <label
              class="form-label form-label-top form-label-auto"
              id="label_22"
              for="input_22"
            >
              {" "}
              6. "Which of the followings" question? (10 points){" "}
            </label>
            <div id="cid_22" class="form-input-wide">
              <div
                data-widget-name="Visual Multi Select"
                style={{ width: "100%", textAlign: "Left", overflowX: "auto" }}
                data-component="widget-field"
              >
                <iframe
                  data-client-id="5298b265886815755900001e"
                  title="Visual Multi Select"
                  frameborder="0"
                  scrolling="no"
                  allowtransparency="true"
                  allow="geolocation; microphone; camera; autoplay; encrypted-media; fullscreen"
                  data-type="iframe"
                  class="custom-field-frame custom-field-frame-rendered frame-xd-ready frame-ready"
                  id="customFieldFrame_22"
                  src="//widgets.jotform.io/multiSelect/?qid=22&amp;ref=https%3A%2F%2Fform.jotform.com&amp;injectCSS=false"
                  style={{
                    maxWidth: "380px",
                    border: "none",
                    width: "100%",
                    height: "243px",
                  }}
                  data-width="380"
                  data-height="240"
                ></iframe>
                <div class="widget-inputs-wrapper">
                  <input
                    type="hidden"
                    id="input_22"
                    class="form-hidden form-widget  "
                    name="q22_6which22"
                    value=""
                  />
                  <input
                    type="hidden"
                    id="widget_settings_22"
                    class="form-hidden form-widget-settings"
                    value="%5B%7B%22name%22%3A%22lists%22%2C%22value%22%3A%22Wrong%20Answer%201%5CnCorrect%20Answer%201%5CnWrong%20Answer%202%5CnWrong%20Answer%203%5CnCorrect%20Answer%202%5CnCorrect%20Answer%203%5CnWrong%20Answer%204%5CnCorrect%20Answer%204%5CnWrong%20Answer%205%22%7D%2C%7B%22name%22%3A%22theme%22%2C%22value%22%3A%22Default%22%7D%2C%7B%22name%22%3A%22selectedItems%22%2C%22value%22%3A%22Selected%22%7D%2C%7B%22name%22%3A%22selectableItems%22%2C%22value%22%3A%22Options%22%7D%2C%7B%22name%22%3A%22keepOrder%22%2C%22value%22%3A%22false%22%7D%2C%7B%22name%22%3A%22customCSS%22%2C%22value%22%3A%22.Default%20.custom-header%20%7B%5Cn%20border%3A%200px%20solid%20%23000000%3B%5Cnbackground%3A%23f9d696%3B%5Cnfont-weight%3A%20bold%3B%5Cnfont-size%3A%20120%25%3B%5Cncolor%3A%20%234DA3A3%3B%5Cntext%3A%20%234b635e%3B%5Cn%7D%22%7D%5D"
                    data-version="2"
                  />
                </div> */}

                {/* <script type="text/javascript"> */}
                {/* {
            setTimeout(function()
{
  var _cFieldFrame = document.getElementById("customFieldFrame_22");
  if (_cFieldFrame)
  {
    _cFieldFrame.onload = function()
    {
      if (typeof widgetFrameLoaded !== 'undefined')
      {
        widgetFrameLoaded(22, {
          "formID": 220041352052437
        })
      }
    };
    _cFieldFrame.src = "//widgets.jotform.io/multiSelect/?qid=22&ref=" + encodeURIComponent(window.location.protocol + "//" + window.location.host) + '' + '' + '&injectCSS=' + encodeURIComponent(window.location.search.indexOf("ndt=1") > -1);
    _cFieldFrame.addClassName("custom-field-frame-rendered");
  }
}, 0)} */}
                {/* // </script> */}
                {/* </div>
            </div>
          </li>
          <li class="form-line" data-type="control_divider" id="id_19">
            <div id="cid_19" class="form-input-wide">
              <div
                class="divider"
                aria-label="Divider"
                data-component="divider"
                style={{
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderColor: "#e6e6e6",
                  height: "1px",
                  marginLeft: "0px",
                  marginRight: "0px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              ></div>
            </div>
          </li>
          <li class="form-line" data-type="control_widget" id="id_16">
            <label
              class="form-label form-label-top form-label-auto"
              id="label_16"
              for="input_16"
            >
              {" "}
            </label>
            <div id="cid_16" class="form-input-wide">
              <div
                data-widget-name="Narrative Fields"
                style={{ width: "100%", textAlign: "Left", overflowX: "auto" }}
                data-component="widget-field"
              >
                <iframe
                  data-client-id="5294d72eb1dd20af46000006"
                  title="Narrative Fields"
                  frameborder="0"
                  scrolling="no"
                  allowtransparency="true"
                  allow="geolocation; microphone; camera; autoplay; encrypted-media; fullscreen"
                  data-type="iframe"
                  class="custom-field-frame custom-field-frame-rendered frame-xd-ready frame-ready"
                  id="customFieldFrame_16"
                  src="//app-widgets.jotform.io/narrativeField/?qid=16&amp;ref=https%3A%2F%2Fform.jotform.com&amp;injectCSS=false"
                  style={{
                    maxWidth: "520px",
                    border: "none",
                    width: "100%",
                    height: "52px",
                  }}
                  data-width="520"
                  data-height="120"
                ></iframe>
                <div class="widget-inputs-wrapper">
                  <input
                    type="hidden"
                    id="input_16"
                    class="form-hidden form-widget  "
                    name="q16_input16"
                    value=""
                  />
                  <input
                    type="hidden"
                    id="widget_settings_16"
                    class="form-hidden form-widget-settings"
                    value="%5B%7B%22name%22%3A%22template%22%2C%22value%22%3A%227.%20Fill%20in%20the%20%7BText%20Box%20A%3A6%3A%20blanks%7D%20with%20the%20appropriate%20%7BText%20Box%20B%3A5%3Awords%7D.%20(6%20points)%22%7D%2C%7B%22name%22%3A%22requireAll%22%2C%22value%22%3A%22No%22%7D%2C%7B%22name%22%3A%22submitNarration%22%2C%22value%22%3A%22No%22%7D%2C%7B%22name%22%3A%22customCSS%22%2C%22value%22%3A%22%23content%20%7B%5Cn%20%20font-size%20%3A%2018px%3B%5Cn%20%20%20%20font-weight%20%3A%20500%3B%5Cn%20%20%20%20font-stretch%20%3A%20normal%3B%5Cn%20%20%20%20font-style%20%3A%20normal%3B%5Cn%20%20%20%20line-height%20%3A%201.45%3B%5Cn%20%20%20%20letter-spacing%20%3A%20normal%3B%5Cn%20%20%20%20color%20%3A%20%234b635e%3B%5Cn%7D%22%7D%5D"
                    data-version="2"
                  />
                </div> */}

                {/* <script type="text/javascript"> */}
                {/* {
            setTimeout(function()
{
  var _cFieldFrame = document.getElementById("customFieldFrame_16");
  if (_cFieldFrame)
  {
    _cFieldFrame.onload = function()
    {
      if (typeof widgetFrameLoaded !== 'undefined')
      {
        widgetFrameLoaded(16, {
          "formID": 220041352052437
        })
      }
    };
    _cFieldFrame.src = "//app-widgets.jotform.io/narrativeField/?qid=16&ref=" + encodeURIComponent(window.location.protocol + "//" + window.location.host) + '' + '' + '&injectCSS=' + encodeURIComponent(window.location.search.indexOf("ndt=1") > -1);
    _cFieldFrame.addClassName("custom-field-frame-rendered");
  }
}, 0)
} */}
                {/* </script> */}
                {/* </div>
            </div>
          </li> */}
                {/* <li class="form-line" data-type="control_divider" id="id_25">
            <div id="cid_25" class="form-input-wide">
              <div
                class="divider"
                aria-label="Divider"
                data-component="divider"
                style={{
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderColor: "#e6e6e6",
                  height: "1px",
                  marginLeft: "0px",
                  marginRight: "0px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              ></div>
            </div>
          </li>
          <li class="form-line" data-type="control_widget" id="id_23">
            <label
              class="form-label form-label-top form-label-auto"
              id="label_23"
              for="input_23"
            >
              {" "}
              8. According to the question, draw on the image below. (5 points){" "}
            </label>
            <div id="cid_23" class="form-input-wide">
              <div
                data-widget-name="Draw on Image"
                style={{ width: "100%", textAlign: "Left", overflowX: "auto" }}
                data-component="widget-field"
              >
                <iframe
                  data-client-id="535a49d40a05fdff5200002b"
                  title="Draw on Image"
                  frameborder="0"
                  scrolling="no"
                  allowtransparency="true"
                  allow="geolocation; microphone; camera; autoplay; encrypted-media; fullscreen"
                  data-type="iframe"
                  class="custom-field-frame custom-field-frame-rendered frame-xd-ready frame-ready"
                  id="customFieldFrame_23"
                  src="//data-widgets.jotform.io/drawOnImage/?qid=23&amp;ref=https%3A%2F%2Fform.jotform.com&amp;injectCSS=false"
                  style={{
                    maxWidth: "520px",
                    border: "none",
                    width: "100%",
                    height: "378px",
                  }}
                  data-width="520"
                  data-height="340"
                ></iframe>
                <div class="widget-inputs-wrapper">
                  <input
                    type="hidden"
                    id="input_23"
                    class="form-hidden form-widget  "
                    name="q23_8According"
                    value=""
                  />
                  <input
                    type="hidden"
                    id="widget_settings_23"
                    class="form-hidden form-widget-settings"
                    value="%5B%7B%22name%22%3A%22background%22%2C%22value%22%3A%22https%3A%2F%2Fcms.jotform.com%2Fuploads%2Fimage_upload%2Fimage_upload%2Fglobal%2F104648_Screen%2520Shot%25202020-04-02%2520at%252016.26.41.png%22%7D%2C%7B%22name%22%3A%22changeImg%22%2C%22value%22%3A%22No%22%7D%5D"
                    data-version="2"
                  />
                </div> */}
                {/* <script type="text/javascript"> */}
                {/* {
            setTimeout(function()
{
  var _cFieldFrame = document.getElementById("customFieldFrame_23");
  if (_cFieldFrame)
  {
    _cFieldFrame.onload = function()
    {
      if (typeof widgetFrameLoaded !== 'undefined')
      {
        widgetFrameLoaded(23, {
          "formID": 220041352052437
        })
      }
    };
    _cFieldFrame.src = "//data-widgets.jotform.io/drawOnImage/?qid=23&ref=" + encodeURIComponent(window.location.protocol + "//" + window.location.host) + '' + '' + '&injectCSS=' + encodeURIComponent(window.location.search.indexOf("ndt=1") > -1);
    _cFieldFrame.addClassName("custom-field-frame-rendered");
  }
}, 0)
} */}
                {/* </script> */}
                {/* </div>
            </div>
          </li>
          <li class="form-line" data-type="control_divider" id="id_27">
            <div id="cid_27" class="form-input-wide">
              <div
                class="divider"
                aria-label="Divider"
                data-component="divider"
                style={{
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderColor: "#e6e6e6",
                  height: "1px",
                  marginLeft: "0px",
                  marginRight: "0px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              ></div>
            </div>
          </li>
          <li class="form-line" data-type="control_widget" id="id_26">
            <label
              class="form-label form-label-top"
              id="label_26"
              for="input_26"
            >
              {" "}
              9. A question that requires listing? (6 points){" "}
            </label>
            <div id="cid_26" class="form-input-wide">
              <div
                data-widget-name="Field Multiplier"
                style={{ width: "100%", textAlign: "Left", overflowX: "auto" }}
                data-component="widget-field"
              >
                <iframe
                  data-client-id="529058b0ca06414051000011"
                  title="Field Multiplier"
                  frameborder="0"
                  scrolling="no"
                  allowtransparency="true"
                  allow="geolocation; microphone; camera; autoplay; encrypted-media; fullscreen"
                  data-type="iframe"
                  class="custom-field-frame custom-field-frame-rendered frame-xd-ready frame-ready"
                  id="customFieldFrame_26"
                  src="//widgets.jotform.io/fieldMultiplier/?qid=26&amp;ref=https%3A%2F%2Fform.jotform.com&amp;injectCSS=false"
                  style={{
                    maxWidth: "300px",
                    border: "none",
                    width: "100%",
                    height: "50px",
                  }}
                  data-width="300"
                  data-height="30"
                ></iframe>
                <div class="widget-inputs-wrapper">
                  <input
                    type="hidden"
                    id="input_26"
                    class="form-hidden form-widget  "
                    name="q26_9A"
                    value=""
                  />
                  <input
                    type="hidden"
                    id="widget_settings_26"
                    class="form-hidden form-widget-settings"
                    value="%5B%5D"
                    data-version="2"
                  />
                </div> */}
                {/* <script type="text/javascript"> */}

                {/* {
            setTimeout(function()
{
  var _cFieldFrame = document.getElementById("customFieldFrame_26");
  if (_cFieldFrame)
  {
    _cFieldFrame.onload = function()
    {
      if (typeof widgetFrameLoaded !== 'undefined')
      {
        widgetFrameLoaded(26, {
          "formID": 220041352052437
        })
      }
    };
    _cFieldFrame.src = "//widgets.jotform.io/fieldMultiplier/?qid=26&ref=" + encodeURIComponent(window.location.protocol + "//" + window.location.host) + '' + '' + '&injectCSS=' + encodeURIComponent(window.location.search.indexOf("ndt=1") > -1);
    _cFieldFrame.addClassName("custom-field-frame-rendered");
  }
}, 0)
} */}
                {/* </script> */}
                {/* </div>
            </div>
          </li>
          <li class="form-line" data-type="control_divider" id="id_30">
            <div id="cid_30" class="form-input-wide">
              <div
                class="divider"
                aria-label="Divider"
                data-component="divider"
                style={{
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderColor: "#e6e6e6",
                  height: "1px",
                  marginLeft: "0px",
                  marginRight: "0px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              ></div>
            </div>
          </li>
          <li class="form-line" data-type="control_widget" id="id_31">
            <label
              class="form-label form-label-top form-label-auto"
              id="label_31"
              for="input_31"
            >
              {" "}
              10. Please choose the correct image for each question. (12 points){" "}
            </label>
            <div id="cid_31" class="form-input-wide">
              <div
                data-widget-name="Image Choices"
                style={{ width: "100%", textAlign: "Left", overflowX: "auto" }}
                data-component="widget-field"
              >
                <iframe
                  data-client-id="53be84d5fcba934b3d000008"
                  title="Image Choices"
                  frameborder="0"
                  scrolling="no"
                  allowtransparency="true"
                  allow="geolocation; microphone; camera; autoplay; encrypted-media; fullscreen"
                  data-type="iframe"
                  class="custom-field-frame custom-field-frame-rendered frame-xd-ready frame-ready"
                  id="customFieldFrame_31"
                  src="//widgets.jotform.io/imageChoices/?qid=31&amp;ref=https%3A%2F%2Fform.jotform.com&amp;injectCSS=false"
                  style={{
                    maxWidth: "420px",
                    border: "none",
                    width: "100%",
                    height: "203px",
                  }}
                  data-width="420"
                  data-height="230"
                ></iframe>
                <div class="widget-inputs-wrapper">
                  <input
                    type="hidden"
                    id="input_31"
                    class="form-hidden form-widget  "
                    name="q31_10Please"
                    value=""
                  />
                  <input
                    type="hidden"
                    id="widget_settings_31"
                    class="form-hidden form-widget-settings"
                    value="%5B%7B%22name%22%3A%22config%22%2C%22value%22%3A%22First%20question%5CnOption%20%231%20%3A%20https%3A%2F%2Fcms.jotform.com%2Fuploads%2Fimage_upload%2Fimage_upload%2Fglobal%2F104673_Screen_Shot_2020-04-02_at_14.06.13.png%5CnOption%20%232%20%3A%20https%3A%2F%2Fcms.jotform.com%2Fuploads%2Fimage_upload%2Fimage_upload%2Fglobal%2F104673_Screen_Shot_2020-04-02_at_14.06.13.png%5CnOption%20%233%20%3A%20https%3A%2F%2Fcms.jotform.com%2Fuploads%2Fimage_upload%2Fimage_upload%2Fglobal%2F104673_Screen_Shot_2020-04-02_at_14.06.13.png%5Cn%5CnSecond%20question%5CnOption%20%234%20%3A%20https%3A%2F%2Fcms.jotform.com%2Fuploads%2Fimage_upload%2Fimage_upload%2Fglobal%2F104673_Screen_Shot_2020-04-02_at_14.06.13.png%5CnOption%20%235%20%3A%20https%3A%2F%2Fcms.jotform.com%2Fuploads%2Fimage_upload%2Fimage_upload%2Fglobal%2F104673_Screen_Shot_2020-04-02_at_14.06.13.png%5CnOption%20%236%20%3A%20https%3A%2F%2Fcms.jotform.com%2Fuploads%2Fimage_upload%2Fimage_upload%2Fglobal%2F104673_Screen_Shot_2020-04-02_at_14.06.13.png%5Cn%5CnThird%20question%5CnOption%20%237%20%3A%20https%3A%2F%2Fcms.jotform.com%2Fuploads%2Fimage_upload%2Fimage_upload%2Fglobal%2F104673_Screen_Shot_2020-04-02_at_14.06.13.png%5CnOption%20%238%20%3A%20https%3A%2F%2Fcms.jotform.com%2Fuploads%2Fimage_upload%2Fimage_upload%2Fglobal%2F104673_Screen_Shot_2020-04-02_at_14.06.13.png%22%7D%2C%7B%22name%22%3A%22selectedOptions%22%2C%22value%22%3A%22Selected%20options%22%7D%5D"
                    data-version="2"
                  />
                </div> */}
                {/* <script type="text/javascript"> */}
                {/* {
            setTimeout(function()
{
  var _cFieldFrame = document.getElementById("customFieldFrame_31");
  if (_cFieldFrame)
  {
    _cFieldFrame.onload = function()
    {
      if (typeof widgetFrameLoaded !== 'undefined')
      {
        widgetFrameLoaded(31, {
          "formID": 220041352052437
        })
      }
    };
    _cFieldFrame.src = "//widgets.jotform.io/imageChoices/?qid=31&ref=" + encodeURIComponent(window.location.protocol + "//" + window.location.host) + '' + '' + '&injectCSS=' + encodeURIComponent(window.location.search.indexOf("ndt=1") > -1);
    _cFieldFrame.addClassName("custom-field-frame-rendered");
  }
}, 0)
} */}
                {/* </script> */}
                {/* </div>
            </div>
          </li> */}
                {/* <li class="form-line" data-type="control_divider" id="id_33">
        <div id="cid_33" class="form-input-wide">
          <div class="divider" aria-label="Divider" data-component="divider" style="border-bottom-width:1px;border-bottom-style:solid;border-color:#e6e6e6;height:1px;margin-left:0px;margin-right:0px;margin-top:5px;margin-bottom:5px">
          </div>
        </div>
      </li>
      <li class="form-line" data-type="control_widget" id="id_32">
        <label class="form-label form-label-top form-label-auto" id="label_32" for="input_32"> 11. Please select the best image according to the question. (6 points) </label>
        <div id="cid_32" class="form-input-wide">
          <div data-widget-name="Image Checkboxes" style="width:100%;text-align:Left;overflow-x:auto" data-component="widget-field">
            <iframe data-client-id="5295b6b6cdfcb5695d000004" title="Image Checkboxes" frameborder="0" scrolling="no" allowtransparency="true" allow="geolocation; microphone; camera; autoplay; encrypted-media; fullscreen" data-type="iframe" class="custom-field-frame custom-field-frame-rendered frame-xd-ready frame-ready" id="customFieldFrame_32" src="//app-widgets.jotform.io/imageCheckbox/?qid=32&amp;ref=https%3A%2F%2Fform.jotform.com&amp;injectCSS=false" style="max-width: 300px; border: none; width: 100%; height: 312px;" data-width="300" data-height="140">
            </iframe>
            <div class="widget-inputs-wrapper">
              <input type="hidden" id="input_32" class="form-hidden form-widget  " name="q32_11Please" value="">
              <input type="hidden" id="widget_settings_32" class="form-hidden form-widget-settings" value="%5B%7B%22name%22%3A%22urls%22%2C%22value%22%3A%22https%3A%2F%2Fcms.jotform.com%2Fuploads%2Fimage_upload%2Fimage_upload%2Fglobal%2F104673_Screen_Shot_2020-04-02_at_14.06.13.png%5Cnhttps%3A%2F%2Fcms.jotform.com%2Fuploads%2Fimage_upload%2Fimage_upload%2Fglobal%2F104673_Screen_Shot_2020-04-02_at_14.06.13.png%5Cnhttps%3A%2F%2Fcms.jotform.com%2Fuploads%2Fimage_upload%2Fimage_upload%2Fglobal%2F104673_Screen_Shot_2020-04-02_at_14.06.13.png%5Cnhttps%3A%2F%2Fcms.jotform.com%2Fuploads%2Fimage_upload%2Fimage_upload%2Fglobal%2F104673_Screen_Shot_2020-04-02_at_14.06.13.png%22%7D%2C%7B%22name%22%3A%22texts%22%2C%22value%22%3A%22Option%201%2C%20Option%202%2C%20Option%203%2C%20Option%204%22%7D%2C%7B%22name%22%3A%22theme%22%2C%22value%22%3A%22Black%22%7D%5D" data-version="2">
            </div>
            <script type="text/javascript">
            setTimeout(function()
{
  var _cFieldFrame = document.getElementById("customFieldFrame_32");
  if (_cFieldFrame)
  {
    _cFieldFrame.onload = function()
    {
      if (typeof widgetFrameLoaded !== 'undefined')
      {
        widgetFrameLoaded(32, {
          "formID": 220041352052437
        })
      }
    };
    _cFieldFrame.src = "//app-widgets.jotform.io/imageCheckbox/?qid=32&ref=" + encodeURIComponent(window.location.protocol + "//" + window.location.host) + '' + '' + '&injectCSS=' + encodeURIComponent(window.location.search.indexOf("ndt=1") > -1);
    _cFieldFrame.addClassName("custom-field-frame-rendered");
  }
}, 0);
            </script>
          </div>
        </div>
      </li>
      <li class="form-line" data-type="control_matrix" id="id_36">
        <label class="form-label form-label-top form-label-auto" id="label_36" for="input_36"> 12. Question? (20 points) </label>
        <div id="cid_36" class="form-input-wide">
          <table summary="" aria-labelledby="label_36" cellpadding="4" cellspacing="0" class="form-matrix-table" data-component="matrix" data-dynamic="true">
            <tbody><tr class="form-matrix-tr form-matrix-header-tr">
              <th class="form-matrix-th" style="border:none">
                &nbsp;
              </th>
              <th scope="col" class="form-matrix-headers form-matrix-column-headers form-matrix-column_0">
                <label id="label_36_col_0"> Option 1 </label>
              </th>
              <th scope="col" class="form-matrix-headers form-matrix-column-headers form-matrix-column_1">
                <label id="label_36_col_1"> Option 2 </label>
              </th>
            </tr>
            <tr class="form-matrix-tr form-matrix-value-tr" aria-labelledby="label_36 label_36_row_0">
              <th scope="row" class="form-matrix-headers form-matrix-row-headers">
                <label id="label_36_row_0"> Statement 1 </label>
              </th>
              <td class="form-matrix-values">
                <input type="radio" id="input_36_0_0" class="form-radio" name="q36_12Question36[0][0]" data-calcvalue="5" value="Option 1" aria-labelledby="label_36_col_0 label_36_row_0">
                <label for="input_36_0_0" class="matrix-choice-label matrix-radio-label">  </label>
              </td>
              <td class="form-matrix-values">
                <input type="radio" id="input_36_0_1" class="form-radio" name="q36_12Question36[0][1]" data-calcvalue="5" value="Option 2" aria-labelledby="label_36_col_1 label_36_row_0">
                <label for="input_36_0_1" class="matrix-choice-label matrix-radio-label">  </label>
              </td>
            </tr>
            <tr class="form-matrix-tr form-matrix-value-tr" aria-labelledby="label_36 label_36_row_1">
              <th scope="row" class="form-matrix-headers form-matrix-row-headers">
                <label id="label_36_row_1"> Statement 2 </label>
              </th>
              <td class="form-matrix-values">
                <input type="radio" id="input_36_1_0" class="form-radio" name="q36_12Question36[1][0]" data-calcvalue="5" value="Option 1" aria-labelledby="label_36_col_0 label_36_row_1">
                <label for="input_36_1_0" class="matrix-choice-label matrix-radio-label">  </label>
              </td>
              <td class="form-matrix-values">
                <input type="radio" id="input_36_1_1" class="form-radio" name="q36_12Question36[1][1]" data-calcvalue="0" value="Option 2" aria-labelledby="label_36_col_1 label_36_row_1">
                <label for="input_36_1_1" class="matrix-choice-label matrix-radio-label">  </label>
              </td>
            </tr>
            <tr class="form-matrix-tr form-matrix-value-tr" aria-labelledby="label_36 label_36_row_2">
              <th scope="row" class="form-matrix-headers form-matrix-row-headers">
                <label id="label_36_row_2"> Statement 3 </label>
              </th>
              <td class="form-matrix-values">
                <input type="radio" id="input_36_2_0" class="form-radio" name="q36_12Question36[2][0]" data-calcvalue="0" value="Option 1" aria-labelledby="label_36_col_0 label_36_row_2">
                <label for="input_36_2_0" class="matrix-choice-label matrix-radio-label">  </label>
              </td>
              <td class="form-matrix-values">
                <input type="radio" id="input_36_2_1" class="form-radio" name="q36_12Question36[2][1]" data-calcvalue="5" value="Option 2" aria-labelledby="label_36_col_1 label_36_row_2">
                <label for="input_36_2_1" class="matrix-choice-label matrix-radio-label">  </label>
              </td>
            </tr>
            <tr class="form-matrix-tr form-matrix-value-tr" aria-labelledby="label_36 label_36_row_3">
              <th scope="row" class="form-matrix-headers form-matrix-row-headers">
                <label id="label_36_row_3"> Statement 4 </label>
              </th>
              <td class="form-matrix-values">
                <input type="radio" id="input_36_3_0" class="form-radio" name="q36_12Question36[3][0]" data-calcvalue="0" value="Option 1" aria-labelledby="label_36_col_0 label_36_row_3">
                <label for="input_36_3_0" class="matrix-choice-label matrix-radio-label">  </label>
              </td>
              <td class="form-matrix-values">
                <input type="radio" id="input_36_3_1" class="form-radio" name="q36_12Question36[3][1]" data-calcvalue="0" value="Option 2" aria-labelledby="label_36_col_1 label_36_row_3">
                <label for="input_36_3_1" class="matrix-choice-label matrix-radio-label">  </label>
              </td>
            </tr>
          </tbody></table>
        </div>
      </li>
      <li class="form-line" data-type="control_widget" id="id_35">
        <div id="cid_35" class="">
          <div style="width:100%;text-align:Left" data-component="widget-directEmbed">
            <div class="direct-embed-widgets global-countdown-widget " data-type="direct-embed" style="width:1px;min-height:1px">
              var gctHours = '0'; var gctMinutes = '45'; var gctSeconds = '0'; var gctAction = 'Block form'; var gctMessage = ''; var gcQid = '35';
            </div>
          </div>
        </div>
      </li>
      <li class="form-line always-hidden" data-type="control_calculation" id="id_41">
        <label class="form-label form-label-top form-label-auto" id="label_41" for="input_41"> Grade without Question 12 </label>
        <div id="cid_41" class="form-input-wide always-hidden">
          <input type="text" data-component="calculation" data-defaultvalue="0" class="form-textbox" data-type="input-textbox" id="input_41" name="q41_gradeWithout41" value="0" size="20">
        </div>
      </li>
      <li class="form-line always-hidden" data-type="control_calculation" id="id_42">
        <label class="form-label form-label-top form-label-auto" id="label_42" for="input_42"> Grade with Question 12 </label>
        <div id="cid_42" class="form-input-wide always-hidden">
          <input type="text" data-component="calculation" data-defaultvalue="0" class="form-textbox" data-type="input-textbox" id="input_42" name="q42_gradeWith" value="0" size="20">
        </div>
      </li>*/}
              </div>
              <li class="form-line" data-type="control_button" id="id_2">
                <div id="cid_2" class="form-input-wide">
                  <div
                    style={{ textAlign: "center", dataAlign: "center" }}
                    class="form-buttons-wrapper form-buttons-center   jsTest-button-wrapperField"
                  >
                    <button
                      id="input_2"
                      type="submit"
                      class="form-submit-button submit-button jf-form-buttons jsTest-submitField"
                      onClick={submitHandler}
                      data-component="button"
                      data-content=""
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </li>
              <li style={{ display: "none" }}>
                Should be Empty:
                <input type="text" name="website" value="" />
              </li>
            </ul>
          </div>
        </div>
      )}

      {!isPage && (
        <div style={{ textAlign: "center", marginTop: "10%" }}>
          <h1 style={{ color: "black" }}>404</h1>
          <h1 style={{ color: "black" }}>Not Found</h1>
          <br />
          <h3 style={{ color: "black" }}>Invalid Grant!!</h3>
        </div>
      )}

      {/* {examDone && <div
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
             <div style={{display:"flex", justifyContent:"center" }}><span style={{flex: "50%"}}> Exam Id : </span><p style={{flex: "50%"}}>EDUT808</p></div>
             <div style={{display:"flex", justifyContent:"center" }}><span style={{flex: "50%"}}> Subject : </span><p style={{flex: "50%"}}>{subject}</p></div>
             <div style={{display:"flex", justifyContent:"center" }}><span style={{flex: "50%"}}> Marks : </span><p style={{flex: "50%"}}>{result}/15</p></div>
             <div style={{display:"flex", justifyContent:"center" }}><span style={{flex: "50%"}}> Status : </span> <p style={{color: resultStatus==="fail" ? "red": "green",flex: "50%"}}>{resultStatus}</p></div>
             </div>

     
             {resultStatus==="fail" && <span style={{color:"red"}}>Sorry,You are not able to qualify this test. Good luck for next time!!</span>}
             {resultStatus==="pass" && <span style={{color:"green"}}>Congrats!! You have qualified this test</span>} 
            </div>
           </div>
         </div>
       </li>
      
      
       <li style={{ display: "none" }}>
         Should be Empty:
         <input type="text" name="website" value="" />
       </li>
     </ul>
   </div>} */}
    </>
  );
};

export default TutorExam;
