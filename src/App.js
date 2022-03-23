import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
/*------ Pages-----*/

import TutorExam from "./Pages/Tutor/TutorExam";
import TutorExamEntrance from "./Pages/Tutor/TutorExamEntrance";
import TutorExamEnd from "./Pages/Tutor/TutorExamEnd";
import { Puff } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const App = () => {
  const [subList, setSubList] = useState([]);
  const [selectedSub, setSelectedSub] = useState([]);
  const [currentBase64, setCurrentBase64] = useState([]);
  const [keyArSend, setKeyArSend] = useState([]);
  const [subject, setSubject] = useState();
  const [resultStatus, setResultStatus] = useState();
  const [result, setResult] = useState();
  const [examId, setExamId] = useState();
  const [tutorId, setTutorId] = useState("EDUT808");
  const [timeOfTest, setTimeOfTest] = useState();
  const [loading, setLoading] = useState(true);
  var subjectList = [
    "Soil Mechanics",
    "Mass Transfer",
    "Business Math",
    "Physical chemistry",
  ];

  // let tutorId="EDUT808"

  useEffect(() => {
    const findForm2 = async () => {
      const find_examId = await axios.post(
        "http://localhost:8800/tutor/find_examId",
        { tutorId: tutorId }
      );

      console.log({ debug_tutorId: find_examId });
      if (setSubList && find_examId?.data?.success === true) {
        let exmId = find_examId?.data?.examId?.split("_")[1];
        let newId = +exmId + 1;
        // console.log({newId})
        let newId2 = tutorId + "_" + newId;
        // console.log({newId2})
        setExamId(newId2);
        setSubList(find_examId?.data?.subjectList);
        setLoading(false);
      } else {
        console.log("entering here in new tut id");
        let exmId = tutorId + "_1";
        setExamId(exmId);
        // console.log({tutId})
      }
    };
    findForm2();
  }, []);

  const SelectedSub = (e) => {
    setSelectedSub([e]);
  };

  const CurrentBase64_func = (val) => {
    console.log({ valbase64: val });
    setCurrentBase64(val);
  };

  const key_func = (value) => {
    setKeyArSend(value);
  };
  const setResult_func = (value) => {
    setResult(value);
  };

  const setResultStatus_func = (value) => {
    setResultStatus(value);
  };

  const setSubject_func = (value) => {
    setSubject(value);
    console.log({ subject });
  };

  // useEffect(()=>{

  //   setSubList(subjectList)
  //  },[])
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/">
            {loading && (
              <div style={{ marginLeft: "45%", marginTop: "20%" }}>
                <Puff
                  heigth="100"
                  width="100"
                  color="#01b1b1"
                  ariaLabel="loading"
                />
              </div>
            )}
            {!loading && (
              <TutorExamEntrance
                subList={subList}
                SelectedSub={SelectedSub}
                CurrentBase64_func={CurrentBase64_func}
                key_func={key_func}
                setTimeOfTest={setTimeOfTest}
              />
            )}
          </Route>
          <Route path="/tutorExam">
            <TutorExam
              subjectList={selectedSub}
              currentBase64={currentBase64}
              keyArSend={keyArSend}
              setResult_func={setResult_func}
              setResultStatus_func={setResultStatus_func}
              timeOfTest={timeOfTest}
              setSubject_func={setSubject_func}
              examId={examId}
              tutorId={tutorId}
            />
          </Route>
          <Route path="/tutorExam_Submitted">
            <TutorExamEnd
              subject={selectedSub}
              result={result}
              resultStatus={resultStatus}
              examId={examId}
            />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
