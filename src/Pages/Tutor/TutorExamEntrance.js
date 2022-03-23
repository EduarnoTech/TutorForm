import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./TutorExam.css";
import Loader1 from "../../components/LinearLoder";
import { decode as atob, encode as btoa } from "base-64";

const TutorExamEntrance = (props) => {
  var num = 1;
  const history = useHistory();
  //   const [base64,setBase64]=useState([]);
  //   const [answer,setAnswer]=useState({});
  //   const [answerObject,setAnswerObject]=useState([]);
  //   const [inputId,setInputId]=useState();
  //   const [keyArray,setKeyArray]=useState()
  const [subList, setSubList] = useState([]);
  const [testSubject, setTestSubject] = useState();
  const [loaderVisible, setLoaderVisible] = useState(false);
  
  //   const [base,setInputId]=useState();

  const changeHandler = (e) => {
    let val = e.target.value;

    setTestSubject(val);
    setSubList([val]);
    props.SelectedSub(val);
    // get_questions()
  };

 

  const get_questions = async () => {
    console.log({ subjectList: props.subjectList });
    const getQues = await Axios.post(
      "http://localhost:8800/tutor/get_questions",
      { subjectList: subList }
    );

    if (getQues?.data?.questionArr?.length !== 0) {
      console.log({ getQues: getQues.data.questionArr });
      props.setTimeOfTest(getQues.data.timeOfTest)
      let keys = getQues.data.keyArr;
      //   setKeyArray(getQues.data.keyArr)
      console.log({ keys });

      let getQuesAr = getQues.data.questionArr;
      let base64String = [];
      getQuesAr.map((el) => {
        base64String.push(
          // btoa(String.fromCharCode(...new Uint8Array(el.data)))
          // String.fromCharCode.apply(null, new Uint8Array(el.data))
          // btoa(unescape(encodeURIComponent(new TextDecoder('utf-8').decode(new Uint8Array(el.data)))))
          btoa(new Uint8Array(el.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''))
        );
        // const base64String = new Buffer.from(getQues.data.questionArr.data).toString("ascii")
      });
      console.log({ base64String });

      //   setBase64(base64String)
      props.CurrentBase64_func(base64String);
      props.key_func(keys);

      if (base64String.length !== 0) {
          setLoaderVisible(false)
        history.replace("/tutorExam");
      } else {
        setLoaderVisible(false)
        alert("Some Error occured.Please try again!");
      }
    } else {
      setLoaderVisible(false)
      alert("Some Error occured.Please try again!");
      console.log({ getQues: "not Found" });
    }
  };


  const nextHandler = (e) => {
    e.preventDefault();
    setTimeout(()=>{
      setLoaderVisible(false)
      // alert("Something went wrong.Please try again!!")
    },90000)
   
    if (subList?.length !== 0) {
      setLoaderVisible(true)
      get_questions();
    } else {
      alert("Please select a subject!");
    }
  };
  

  return (
    <div>
        {loaderVisible  && <Loader1/>}
      <div
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
          <li class="form-line" data-type="control_text" id="id_13">
            <div id="cid_13" class="form-input-wide">
              <div id="text_13" class="form-html" data-component="text">
                <strong>Rules and Regulations</strong>
                The given time
                for this quiz is 45 minutes. After that, the form will be closed
                for you. Students who will not submit their answers in time will
                receive 0. You can only submit your answers once. If you wish to
                pause the the quiz, please use the Save and Continue Later
                button. Each question has its own grading points. After you
                submit your answers, we will evaluate your answers and let you
                know your grades later. If you have any technical problem during
                the quiz, please take a screenshot or screen recording and send
                us.
              </div>
            </div>
          </li>
          <li class="form-line" data-type="control_fullname" id="id_3">
            <label class="form-label form-label-top" id="label_3" for="first_3">
              {" "}
              Select Your Subject{" "}
            </label>
            <div id="cid_3" class="form-input-wide">
              <div data-wrapper-react="true">
                <span
                  class="form-sub-label-container"
                  style={{ verticalAlign: "top" }}
                  data-input-type="first"
                >
                  <select
                    type="text"
                    id="first_3"
                    name="q3_studentName[first]"
                    class="form-textbox"
                    data-defaultvalue=""
                    autocomplete="section-input_3 given-name"
                    size="10"
                    value={testSubject}
                    onChange={changeHandler}
                    data-component="first"
                    aria-labelledby="label_3 sublabel_3_first"
                    style={{ height: "70px" }}
                  >
                    {props.subList.map((el) => (
                      <option>{el}</option>
                    ))}
                  </select>
                </span>
              </div>
            </div>
          </li>

          <li class="form-line" data-type="control_button" id="id_2">
            <div id="cid_2" class="form-input-wide">
              <div
                style={{ textAlign: "center", dataAlign: "center" }}
                class="form-buttons-wrapper form-buttons-center   jsTest-button-wrapperField"
              >
                {/* <Link to="/tutorExam"> */}
                <button
                  id="input_2"
                  //   type="submit"
                  class="form-submit-button submit-button jf-form-buttons jsTest-submitField"
                  onClick={nextHandler}
                  data-component="button"
                  data-content=""
                >
                  Start Test
                </button>
                {/* </Link> */}
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
  );
};

export default TutorExamEntrance;
