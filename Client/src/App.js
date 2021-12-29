import { useState,useEffect } from "react";
import "./App.css";
import { useHistory,BrowserRouter, Switch, Route ,Link } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import SuccessAlert from "./components/SuccessAlert";
import Pan from "./components/Pan";
import Accounts from "./components/Accounts";
import axios from "axios";
import StepperDemo from "./components/Stepper";

function App() {
  const history=useHistory()
  const[isSubmit,setIsSubmit]=useState(false)
  const[success,setSuccess]=useState(false)
  const[tutorId,setTutorId]=useState("")
  const [insCountryVal, setInsCountryVal] = useState("India +(91)");
  const [isInputError, setIsInputError] = useState(true);
  const [data, setData] = useState({
    email: "",
    username: "",
    branch: [],
    highest_degree: "",
    other_degree: "",
    university: "",
    skills: [],
    other_skill: [],
    best_subjects: [],
    software_skills: [],
    whatsapp_no: "",
    phone_no: "",
    panName: "",
    panNumber: "",
    accName: "",
    accNumber: "",
    ifsc: "",
    UPI: "",
    highestDegreeFile:[],
    panFile:[],
  });
  const {
    email,
    username,
    branch,
    highest_degree,
    other_degree,
    university,
    skills,
    other_skill,
    best_subjects,
    software_skills,
    whatsapp_no,
    phone_no,
    highestDegreeFile,
    panName,
    panNumber,
    panFile,
    accName,
    accNumber,
    ifsc,
    UPI,
  } = data;


  useEffect(()=>{
    const findForm2=async()=>{
    const find_tutorId = await axios.get(
      "http://localhost:8800/tutor/find_tutorId"
    );
    
    // console.log({lllll:find_tutorId.data.tutorForm_object})
    // console.log("hiiiii",find_tutorId)
      // if(find_tutorId?.data?.tutorForm_object?.length!=0){
      //   let tutoId=find_tutorId?.data?.tutorForm_object;
      //   let tutId=tutoId[(tutoId.length)-1]?.tutor_id;
      //   // console.log({tutId})
      console.log({debug_tutorId:find_tutorId})
        if(find_tutorId?.data?.tutoId && find_tutorId?.data?.success===true){
        let tutId=find_tutorId?.data?.tutoId?.replace("EDUT","")
        let newId=+tutId+1;
        // console.log({newId})
        let newId2="EDUT"+newId
        // console.log({newId2})
        setTutorId(newId2)
        
      }
      else{
        console.log("entering here in new tut id")
        let tutId="EDUT100001"
        setTutorId(tutId)
        // console.log({tutId})
    }
  }
  findForm2()
 
  },[])

  let formdata=new FormData()

  const tutor_reg = async () => {
    console.log({tutorId:tutorId})
    formdata.append('tutorId',tutorId);
    formdata.append('email',email);
    formdata.append('username',username)
    formdata.append('branch',branch)
    formdata.append('highest_degree',highest_degree)
    formdata.append('other_degree',other_degree)
    formdata.append('university',university)
    formdata.append('skills',skills)
    formdata.append('other_skill',other_skill)
    formdata.append('best_subjects',best_subjects)
    formdata.append('software_skills',software_skills)
    formdata.append('whatsapp_no',whatsapp_no)
    formdata.append('phone_no',phone_no)
    formdata.append('CountryAndCode',insCountryVal)
    // formdata.append('highestDegreeFile',highestDegreeFile)
    formdata.append('panName',panName)
    formdata.append('panNumber',panNumber)
  
    formdata.append('accName',accName)
    formdata.append('accNumber',accNumber)
    formdata.append('ifsc',ifsc)
    formdata.append('UPI',UPI)

    for(let j=0;j<panFile.length;j++){
      formdata.append('highestDegreeFile',highestDegreeFile[j])
    }


    for(let i=0;i<panFile.length;i++){
      formdata.append('panFile',panFile[i])
    }


    const tutorSave = await axios.post(
      "http://localhost:8800/tutor/detailed_tutor_save",formdata
      
    );
      if(tutorSave.data.success==true){
        console.log({formdata:"sent"})
        setSuccess(true)    
      }
      else if(tutorSave.data.success==false && tutorSave.data.status=="notMatched"){
        alert('Invalid Bank Account Credentials')
        setData({
          ...data,
          accName:"",
          accNumber:"",
          ifsc:""
        })

        setSuccess(false)
        setIsInputError(false)
        
      }
      else if(tutorSave.data.success==false && tutorSave.data.status=="Session_Failed"){
        alert('Session failed.Please try again!!')
        setSuccess(false)
        
      }

      else if(tutorSave.data.success==false && tutorSave.data.status=="Session_Pending"){
        alert('Session Pending.Please try again!!')
        setSuccess(false)
      }
      else{
        console.log({formdata:"not sent"})
        setSuccess(false)
      }
  };
  
  // const setIsSubmitHandler=(ev)=>{
  //   setIsSubmit(ev)
  //   if(isSubmit===true){
  //     tutor_reg()}
  // }

  


  useEffect(()=>{
    if(isSubmit===true){
    tutor_reg()
      setIsSubmit(false)
  }

  },[isSubmit])
 


  return (
    <BrowserRouter>
      <div className="App">
      {/* <StepperDemo /> */}

        <Switch>
          <Route exact path="/registration-form">
            <RegistrationForm
              email={email}
              username={username}
              branch={branch}
              highest_degree={highest_degree}
              other_degree={other_degree}
              university={university}
              skills={skills}
              other_skill={other_skill}
              best_subjects={best_subjects}
              software_skills={software_skills}
              whatsapp_no={whatsapp_no}
              phone_no={phone_no}
              highestDegreeFile={highestDegreeFile}
              setInsCountryVal={setInsCountryVal}
              data={data}
              setData={setData}
            />
          </Route>
          <Route exact path="/PAN_Card_Check">
            <Pan panName={panName} panNumber={panNumber} panFile={panFile} data={data}
              setData={setData} />
          </Route>
           <Route exact path="/accountDetails">
            <Accounts
              accName={accName}
              accNumber={accNumber}
              ifsc={ifsc}
              UPI={UPI}
              data={data}
              setData={setData}
              setIsSubmit={setIsSubmit}
              setIsInputError={setIsInputError}
              isInputError={isInputError}
              success={success}
            />
          </Route>
          <Route exact path="/tutorForm_success">
            <SuccessAlert />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
