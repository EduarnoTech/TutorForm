import React ,{ useState,useEffect } from "react";
import "./TutorRegform.css";
import { useHistory,BrowserRouter, Switch, Route ,Link } from "react-router-dom";
import RegistrationForm from "../../components/Tutor/Tutor_Regform/RegistrationForm";
// import SuccessAlert from "../../components/Tutor/Tutor_Regform/SuccessAlert";
import Pan from "../../components/Tutor/Tutor_Regform/Pan";
import Accounts from "../../components/Tutor/Tutor_Regform/Accounts";
import axios from "axios";
import TutorDashboard from "./TutorDashboard";
import { SettingsSystemDaydreamSharp } from "@mui/icons-material";
import History from "../../components/Tutor/History"
import CurrentSessions from "../../components/Tutor/CurrentSessions"
import Profile from "../../components/Tutor/Profile"
import Payments from "../../components/Tutor/Payments"
// import StepperDemo from "./components/Stepper";

function TutorRegform(props) {
  const history=useHistory()
  const[isSubmit,setIsSubmit]=useState(false)
  const[success,setSuccess]=useState(false)
  const[tutorId,setTutorId]=useState("")
  const [insCountryVal, setInsCountryVal] = useState("India +(91)");
  const [isInputError, setIsInputError] = useState(true);
  const[tutorformData,setTutorformData]=useState()
  const[dash,setDash]=useState(false)
  const[tutrId,setTutrId]=useState("")
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


  // 
  const enEmail=props.enteredEmail;
  let formdata=new FormData()
console.log("enmail",enEmail)
  const tutor_reg = async () => {
    // console.log({tutorId:tutorId})
    formdata.append('tutorId',tutorId);
    formdata.append('email',enEmail);
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

    // for(let j=0;j<highestDegreeFile.length;j++){
    //   formdata.append('highestDegreeFile',highestDegreeFile[j])
    // }


    // for(let i=0;i<panFile.length;i++){
    //   formdata.append('panFile',panFile[i])
    // }


    const tutorSave = await axios.post(
      "http://localhost:8800/tutor/regForm_tutor",formdata
      
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
    const findForm2=async()=>{
    const findEmail = await axios.post(
      "http://localhost:8800/tutor/findEmail",{email:props.enteredEmail}
    );
    

    if(findEmail.data){
      let data=findEmail.data.tutorForm_object;
      console.log({daaataaa:data})
      setTutorformData(data)
      if(data.pan_name){
        setDash(true)
      }
      else{
        setDash(false)
      }
      console.log({tuuuuu:data.tutor_id})
      setTutrId(findEmail.data.tutorForm_object.tutor_id)
      // setData({
      //   ...data,
      //   email:email1
      // })
    }
    else{
      console.log("email doesnot found")
    }

  }
    
  
  findForm2();
  },[])


  useEffect(()=>{
    if(isSubmit===true){
    tutor_reg()
      setIsSubmit(false)
  }

  },[isSubmit])



  // const tutorId_currentSession=async()=>{
    
  //    const find_tutorId= await axios.post("http://localhost:8800/tutor/tutorSignUp", {email})
  // }
 


  return (
    <BrowserRouter>
      <div className="Appp">
      {/* <StepperDemo /> */}
      {/* <h1>We are in tutorRegForm</h1> */}

        <Switch>

            {/* <Route exact path="/TutorRegform/"><h1>We are in the tutorRegForm</h1></Route> */}

          <Route exact path="/TutorSignIn/">
            {!dash && <RegistrationForm
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
              enteredEmail={props.enteredEmail}
            />}
            {dash && <TutorDashboard tutorformData={tutorformData}/>}
          </Route>
          <Route exact path="/TutorSignIn/PAN_Card_Check">
            <Pan panName={panName} panNumber={panNumber} panFile={panFile} data={data}
              setData={setData} />
          </Route>
           <Route exact path="/TutorSignIn/accountDetails">
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
          <Route exact path="/TutorSignIn/tutorForm_success">
            {/* <SuccessAlert /> */}
            <h1>Form submission success</h1>
          </Route>
          <Route exact path="/TutorSignIn/History">
          <History tutrId={tutrId}/>
             {/* <TutorDashboard tutorformData={tutorformData}/> */}
          </Route>
          <Route exact path="/TutorSignIn/CurrentSessions">
          <CurrentSessions tutrId={tutrId} />
             {/* <TutorDashboard tutorformData={tutorformData}/> */}
          </Route>
          <Route exact path="/TutorSignIn/Profile">
          <TutorDashboard  tutrId={tutrId} tutorformData={tutorformData}/> 
          </Route>
          <Route exact path="/TutorSignIn/Payments">
          <Payments  tutrId={tutrId}/> 
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default TutorRegform;
