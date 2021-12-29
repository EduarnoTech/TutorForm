import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./registrationForm.css";
import classes from "./autoComplete.module.css";
import axios from "axios";
import { dropdownDataUrl, storeDataUrl } from "../serviceUrls/ServiceUrl";
import en from "react-phone-number-input/locale/en.json";
import Input, {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import Autocomplete from "./Autocomplete";
import { red } from "@material-ui/core/colors";

const RegistrationForm = (props) => {
  const [branches, setBranches] = useState();
  const [subjects, setSubjects] = useState();
  const [subjects1, setSubjects1] = useState();
  const [skill, setSkill] = useState([]);
  const [otherSkill, setOtherSkill] = useState("");
  const [softwareSkill, setSoftwareSkill] = useState("");
  const [softSkill, setSoftSkill] = useState([]);
  const [file1, setFile1] = useState();
  const [bestSub, setBestSub] = useState([]);
  const history = useHistory();
  const [display, setDisplay] = useState(false);
  const [skillChange, setSkillChange] = useState("");
  const [countryVal, setCountryVal] = useState("+(91)");
  const [check, setCheck] = useState(true);
  const [waValidation, setWaValidation] = useState(true);
  const [checkEmail,setCheckEmail]=useState(true);
  const [validEmail,setValidEmail]=useState(true);
  const [checkUsername,setCheckUsername]=useState(true);
  const [checkHighestDegree,setCheckHighestDegree]=useState(true);
  const [checkUniversity,setCheckUniversity]=useState(true);
  const [checkSkills,setCheckSkills]=useState(true);
  const [checkBestSubjects,setCheckBestSubjects]=useState(true);
  const [checkWhatapp,setCheckWhatapp]=useState(true);
  const [checkHighestDegreeFile,setCheckHighestDegreeFile]=useState(true);
  // const [data, props.setData] = useState({
  //   email: '',
  //   name: '',
  //   branch: '',
  //   highest_degree: '',
  //   other_degree: '',
  //   university: '',
  //   skills: [],
  //   other_skill: [],
  //   best_subjects: [],
  //   software_skills: '',
  //   whatsapp_no: '',
  // });
  // const {
  //   email,
  //   name,
  //   branch,
  //   highest_degree,
  //   other_degree,
  //   university,
  //   skills,
  //   other_skill,
  //   best_subjects,
  //   software_skills,
  //   whatsapp_no,
  //   highestDegreeFile,
  // } = data;
  // console.log(props.data);
  const handleChange = (e) => {
    setCheckEmail(true);
    setValidEmail(true);
    setCheckUsername(true)
    setCheckUniversity(true)
    props.setData({
      ...props.data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setCheck(true);
  }, []);

  const handleWhatsapp = async (e) => {
    setCheckWhatapp(true)
    const re = /^[0-9\b]+$/; //rules
    if (e.target.value === "" || re.test(e.target.value)) {
      props.setData({
        ...props.data,
        whatsapp_no: e.target.value,
      });
    //   let wa_num = e.target.value;
    //   console.log({ length: wa_num.length });
    //   if (wa_num.length === 10) {
    //     const payload = {
    //       blocking: "wait",
    //       contacts: ["+91" + wa_num],
    //       force_check: true,
    //     };
    //     const wa_valid = await axios.post(
    //       "https://waba.360dialog.io/v1/contacts",
    //       payload,
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //           "D360-API-KEY": "JMjJNtiGmSiet1O9OXJOExGhAK",
    //         },
    //       }
    //     );

    //     if (wa_valid?.data.contacts[0]?.status === "valid") {
    //       setWaValidation(true);
    //     } else {
    //       setWaValidation(false);
    //     }
    //   }
    }
  };
  useEffect(async() => {
    if(props.whatsapp_no.length===10){
      let countryVall=countryVal+ props.whatsapp_no;
      console.log({countryVal:countryVall})
      const payload = {
        blocking: "wait",
        contacts: [ countryVal+ props.whatsapp_no],
        force_check: true,
      };
      const wa_valid = await axios.post(
        "https://waba.360dialog.io/v1/contacts",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "D360-API-KEY": "JMjJNtiGmSiet1O9OXJOExGhAK",
          },
        }
      );

      if (wa_valid?.data.contacts[0]?.status === "valid") {
        
        setWaValidation(true);
      } else {
        setWaValidation(false);
      }
    }
    else if(props.whatsapp_no.length===0){
      setWaValidation(true);
    }
 
  }, [props.whatsapp_no]);

  const handlePhone = (e) => {
    const re = /^[0-9\b]+$/; //rules
    if (e.target.value === "" || re.test(e.target.value)) {
      props.setData({
        ...props.data,
        phone_no: e.target.value,
      });
    }
  };

  const handleDegreeChange = (e) => {
    setCheckHighestDegree(true)
    props.setData({
      ...props.data,
      [e.target.name]: e.target.value,
      other_degree: "",
    });
  };
  const handleOther = (e) => {
    props.setData({
      ...props.data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSetSkills = (i) => {
    setCheckSkills(true)
    // const newSkill = skill.filter((i) => i === e.target.value);
    const newSkill = skill.filter((j) => j === i);
    if (newSkill.length === 0 && skill.length < 20) {
      setSkill([...skill, i]);
      props.setData({
        ...props.data,
        skills: [...props.skills, i],
      });
      setDisplay(false);
      setSkillChange("Skills/Known Subjects");
    }
  };

  const handleEnterInINput = (e) => {
    if (e.key === "Enter") {
      setSkill([...skill, skillChange]);
      props.setData({
        ...props.data,
        skills: [...props.skills, skillChange],
      });
      setSkillChange("");
      setDisplay(false);
    }
  };

  const handleOtherSkill = (e) => {
    setOtherSkill(e.target.value);
  };
  const handleAddSkill = (e) => {
    if (skill.length < 21) {
      props.setData({
        ...props.data,
        other_skill: [...props.other_skill, otherSkill],
      });
      setSkill([...skill, otherSkill]);
    }
  };

  const handleSkillChange = (e) => {
    setCheckSkills(true)
    let newSkill2 = e.target.value;
    let newSkill1 = newSkill2.toLowerCase();
    setSkillChange(newSkill1);

    setDisplay(true);
  };

  const handleBestSub = (e) => {
    setCheckBestSubjects(true)
    const filter = bestSub.filter((i) => i === e.target.value);
    if (filter.length === 0 && bestSub.length < 5) {
      setBestSub([...bestSub, e.target.value]);
      props.setData({
        ...props.data,
        [e.target.name]: [...bestSub, e.target.value],
      });
    }
  };

  // const handleSoftwareSkillChange = (e) => {
  //   // const getInfo=await axios.post("http://localhost:8800/tutor/info",{software_skills:props.software_skills})
  //   setSoftwareSkill(e.target.value);

  //   props.setData({
  //     ...props.data,
  //     software_skills: [...props.software_skills, softwareSkill],
  //   });
  //   // const updateInfo=await axios.post("http://localhost:8800/tutor/info",{software_skills:props.software_skills})
  //   // setSkill([...skill, otherSkill]);
  // };

  const handleNext = async (e) => {
    e.preventDefault();

    if (props.email.length > 0) {
      const EmailValid = await axios.post(
        "http://localhost:8800/tutor/email_check",
        { email: props.email }
      );
      console.log({ email: EmailValid.data.success });
    if (EmailValid.data.success === true) {
        // console.log({ skills: props.skills, branch: props.branch });
      //   if (
      //     props.username.length > 0 &&
      //     // props.branch.length > 0 &&
      //     props.highest_degree.length > 0 &&
      //     props.university.length > 0 &&
      //     props.skills.length > 0 &&
      //     props.best_subjects.length > 0 &&
      //     props.whatsapp_no.length > 0 &&
      //     props.highestDegreeFile.length > 0
      //   ) {
      //     history.replace("/PAN_Card_Check");
      //   } else {
      //     console.log("please fill all the feilds");
      //     alert("Please fill in all *required fields properly");
      //   }
      // } else {
      //   alert("Email already exists");
      //   props.setData({ ...props.data, email: "" });
      // }
      if( props.username.length === 0){
        console.log({check:"username"})
        setCheckUsername(false)
      }
      else if( props.highest_degree.length === 0){
        setCheckHighestDegree(false)
      }
      else if( props.university.length === 0){
        setCheckUniversity(false)
      }
      else if( props.skills.length ===0){
        setCheckSkills(false);
      }
      else if( props.best_subjects.length===0){
        setCheckBestSubjects(false)
      }
      else if( props.whatsapp_no.length===0){
        setCheckWhatapp(false);
      }
      else if(props.highestDegreeFile.length===0){
        setCheckHighestDegreeFile(false);
      }
      else{
        history.replace("/PAN_Card_Check");
      }

    } else {
      // alert("Email exists");
      setValidEmail(false)
    }
  }
  else{
    // alert ("please enter the email")
    setCheckEmail(false)
  }
  };

  const handleFile = (e) => {
    setCheckHighestDegreeFile(true)
    let mfiles = e.target.files;
    setFile1(mfiles);
    let formdata1 = [];

    for (let i = 0; i < mfiles.length; i++) {
      formdata1.push(mfiles[i]);
      props.setData({
        ...props.data,
        highestDegreeFile: formdata1,
      });
    }
  };

  // const setSelectOptions

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (
  //     // props.email.length > 0
  //     // name.length > 0 &&
  //     // branch.length > 0 &&
  //     // highest_degree.length > 0 &&
  //     // university.length > 0 &&
  //     // skills.length > 0 &&
  //     // best_subjects.length > 0 &&
  //     // whatsapp_no.length > 0
  //   ) {
  //     history.replace('/PAN_Card_Check');
  //     // try {
  //     //   const res = await axios({
  //     //     method: 'post',
  //     //     url: storeDataUrl,
  //     //     params: { tabId: 'Sheet1', api_key: 'aLMXQryByNyzBFgFC' },
  //     //     data: JSON.stringify([
  //     //       [
  //     //         email,
  //     //         name,
  //     //         branch,
  //     //         highest_degree,
  //     //         other_degree,
  //     //         university,
  //     //         skills.toString(),
  //     //         other_skill.toString(),
  //     //         best_subjects.toString(),
  //     //         whatsapp_no,
  //     //         software_skills
  //     //       ],
  //     //     ]),
  //     //     headers: {
  //     //       'Content-Type': 'application/json',
  //     //     },
  //     //   });
  //     //   props.setData({
  //     //     ...data,
  //     //     email: '',
  //     //     name: '',
  //     //     branch: '',
  //     //     highest_degree: '',
  //     //     other_degree: '',
  //     //     university: '',
  //     //     skills: [],
  //     //     other_skill: [],
  //     //     best_subjects: [],
  //     //     whatsapp_no: '',
  //     //     software_skills: ''
  //     //   });
  //     //   if (res.status === 200 || res.status === '200') {
  //     //     history.replace('/registration-form/success');
  //     //   }
  //     // } catch (err) {
  //     //   console.log(err);
  //     // }
  //   } else {
  //     alert('Submission failed! Please fill in all *required fields properly');
  //   }
  // };
  useEffect(() => {
    setCheck(true);

    const getDropdownData = async (req, res) => {
      try {
        const res = await axios({
          method: "get",
          url: "http://localhost:8800/tutor/info",
        });
        // console.log({ branch: res.data.getInfo});
        setBranches(res.data.getInfo.branch);
        setSubjects(res.data.getInfo.skills);
        setSoftwareSkill(res.data.getInfo.software_skills);
      } catch (err) {
        console.log(err);
      }
    };
    getDropdownData();
  }, []);

  // var clickOutside=()=>{
  //   var body = document.getElementById("bodyWrapper");
  //   var except = document.getElementById("skillWrapper");

  //   body.addEventListener(
  //     "click",
  //     function () {
  //       // alert("wrapper");
  //       setDisplay(false);
  //     },
  //     false
  //   );
  //   except.addEventListener(
  //     "click",
  //     function (ev) {
  //       // alert("except");
  //       ev.stopPropagation(); //this is important! If removed, you'll get both alerts
  //     },
  //     false
  //   );
  // }

  const countryHandler = (e) => {
    let val = e.target.value;
    // let val1=en.val
    // console.log({vaaaaaaal:val1})
    // let ind=val1.indexOf('+')
    // let countryCode=val.substring(0,ind)

    let val1 = getCountryCallingCode(val);
    let countryCode = "+" + "(" + val1 + ")";
    // console.log({vaaaaaaal:countryCode})
    setCountryVal(countryCode);
    let insVal = `${en[val]} +${getCountryCallingCode(val)}`;
    props.setInsCountryVal(insVal);
  };

  const handleCheck = () => {
    // console.log({check1:check})
    setCheck(!check);
    // console.log({check})
    // if(check===true){
    //   setCheckVal(true)
    // }
    // else{
    //   setCheckVal(false)
    // }
  };
  // console.log({check})

  useEffect(() => {
    // var body = document.getElementById("bodyWrapper");
    // var except = document.getElementById("skillWrapper1");
    // body.addEventListener(
    //   "click",
    //   function () {
    //     // alert("wrapper");
    //     setDisplay(false);
    //   },
    //   false
    // );
    // except.addEventListener(
    //   "click",
    //   function (ev) {
    //     // alert("except");
    //     ev.stopPropagation(); //this is important! If removed, you'll get both alerts
    //   },
    //   false
    // );
  }, []);
  // console.log({waValidation:waValidation})
  return (
    <div className="main_container">
      <div className="main">
        <div className="container">
          <div className="appointment-form" id="appointment-form">
            <h2>TutorPoint India Registration Form</h2>
            <p>
              &bull; Please make sure that you don't use country code (+91)
              while entering WhatsApp no.
            </p>
            <p>
              &bull; Please leave no gaps or spaces while entering email id or
              any other information.
            </p>
            <br />
            <p>*Required</p>
            <br />
            <br />
            <div className="form-group-1">
              <input
                type="email"
                name="email"
                id="email"
                value={props.email}
                onChange={handleChange}
                placeholder="Email *"
                required
              />
               {!checkEmail && <p style={{color:"red" ,marginTop:"-30px",marginBottom:"20px"}}>Please enter email</p>}
               {!validEmail && <p style={{color:"red" ,marginTop:"-30px",marginBottom:"20px"}}>Please use another email</p>}
              <input
                type="text"
                name="username"
                id="username"
                value={props.username}
                onChange={handleChange}
                placeholder="Full Name (As per your PAN Card) *"
                required
              />
             {!checkUsername && <p style={{color:"red" ,marginTop:"-30px"}}>Please enter username</p>}
              {/* <div className="select-list">
                <select
                  name="branch"
                  id="branch"
                  className="arrow"
                  value={props.branch}
                  onChange={handleChange}
                  required
                >
                  <option slected value="">
                    Branch/Specialization/Department *
                  </option>
                  {branches &&
                    branches.map((i) => <option value={i}>{i}</option>)}
                </select>
              </div> */}

              {/* <div
                id="skillWrapper"
                className="select-list-skill"
                className={classes.flexContainer}
                className={classes.flexColumn}
                className={classes.posRel}
              >
                <input
                  name="skills"
                  id="skills"
                  className="skill-select arrow"
                  // onClick={()=>setDisplay(true)}
                  // value={props.skills[props.skills.length - 1]}
                  value={skillChange}
                  onChange={handleSkillChange}
                  onKeyDown={handleEnterInINput}
                  placeholder="Skills/Known Subjects (upto 20)*"
                  required
                />
                <div>
                  {display && (
                    <div className={classes.autoContainer}>
                      {subjects
                        .filter((name) =>
                          name.toLowerCase().includes(skillChange)
                        )
                        .map((i) => {
                          return (
                            <div
                              className={classes.option}
                              onClick={() => handleSetSkills(i)}
                              tabIndex="0"
                            >
                              <span
                                style={{
                                  color: "black",
                                  fontSize: "13px",
                                  textTransform: "capitalize",
                                }}
                              >
                                {i}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div> */}
              <Autocomplete
                isBig={false}
                dataBase={branches}
                setData={props.setData}
                data={props.data}
                variableData={props.branch}
                staticName="branch"
                placeholder="Branch/Specialization/Department*"
              />
              

              <div style={{ marginTop: "30px" }} className="select-list">
                <select
                  name="highest_degree"
                  id="highest_degree"
                  className="skill-select arrow"
                  value={props.highest_degree}
                  onChange={handleDegreeChange}
                  required
                >
                  <option selected value="">
                    Highest Degree *
                  </option>
                  <option value="b-tech">B.Tech</option>
                  <option value="m-tech">M.Tech</option>
                  <option value="phd">Phd</option>
                  <option value="other">Other</option>
                </select>
                {!checkHighestDegree && <p style={{color:"red" ,marginTop:"-30px",marginBottom:"20px"}}>Please enter your degree</p>}
                {props.highest_degree === "other" ? (
                  <input
                    type="text"
                    name="other_degree"
                    placeholder="Please mention *"
                    value={props.other_degree}
                    onChange={handleOther}
                    autoComplete="none"
                    required
                  />
                ) : null}
              </div>

              <input
                type="text"
                name="university"
                id="university"
                placeholder="University/Colleges (with separated comma) *"
                value={props.university}
                onChange={handleChange}
                required
              />
               {!checkUniversity && <p style={{color:"red" ,marginTop:"-30px",marginBottom:"20px"}}>Please enter your college name</p>}

              <div
                className="select-list-skill"
                className={classes.flexContainer}
                className={classes.flexColumn}
                className={classes.posRel}
              >
                <input
                  style={{ marginBottom: "0px" }}
                  name="skills"
                  id="skills"
                  className="skill-select arrow"
                  // onClick={()=>setDisplay(true)}
                  // value={props.skills[props.skills.length - 1]}
                  value={skillChange}
                  onChange={handleSkillChange}
                  onKeyDown={handleEnterInINput}
                  onClick={() => setDisplay(false)}
                  placeholder="Skills/Known Subjects (upto 20)*"
                  required
                  autoComplete="off"
                />
                 {!checkSkills && <p style={{color:"red" }}>Please enter your subjects</p>}
                <div>
                  {/* <option selected value="">
                    Skills/Known Subjects (upto 20) *
                  </option> */}
                  {display && (
                    <div className={classes.autoContainer}>
                      {subjects
                        ?.filter((name) =>
                          name.toLowerCase().includes(skillChange)
                        )
                        .map((i) => {
                          return (
                            <div
                              key={i}
                              className={classes.option}
                              onClick={() => handleSetSkills(i)}
                              tabIndex="0"
                            >
                              <span
                                style={{
                                  color: "black",
                                  fontSize: "13px",
                                  textTransform: "capitalize",
                                }}
                              >
                                {i}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>

                {props.skills[props.skills.length - 1]?.trim() === "Others" ? (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <input
                      type="text"
                      name="other_skill"
                      placeholder="Please mention *"
                      value={otherSkill}
                      className="otherskill"
                      onChange={handleOtherSkill}
                      autoComplete="none"
                      required
                    />
                    <div className="addBtn" onClick={handleAddSkill}>
                      Add
                    </div>
                  </div>
                ) : null}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {skill &&
                    skill?.map((el, i, arr) => (
                      <div
                        style={{
                          color: "#404040",
                          width: "fit-content",
                          border: "1px solid darkgray",
                          padding: "0px 7px 0px 7px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          margin: "3px",
                        }}
                        onClick={() => {
                          arr.splice(i, 1);
                          setSkill((prev) =>
                            [...prev, ...arr].filter((c, index) => {
                              return [...prev, ...arr].indexOf(c) == index;
                            })
                          );
                          props.setData({
                            ...props.data,
                            skills: [...skill],
                          });
                        }}
                      >
                        {el} x
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <select
                  style={{ marginBottom: "0px", marginTop: "30px" }}
                  name="best_subjects"
                  id="best_subjects"
                  className="skill-select arrow"
                  value={props.best_subjects[props.best_subjects.length - 1]}
                  onChange={handleBestSub}
                  required
                >
                  <option selected value="">
                    Best Subjects (upto 5) *
                  </option>
                  {skill &&
                    skill
                      .filter((i) => i?.trim() !== "Others")
                      .map((i) => <option value={i}>{i}</option>)}
                </select>
                {!checkBestSubjects && <p style={{color:"red"}}>Please enter your best subjects</p>}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {bestSub &&
                    bestSub.map((el, i, arr) => (
                      <div
                        style={{
                          color: "#404040",
                          width: "fit-content",
                          border: "1px solid darkgray",
                          padding: "0px 7px 0px 7px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          margin: "3px",
                        }}
                        onClick={() => {
                          arr.splice(i, 1);
                          setBestSub((prev) =>
                            [...prev, ...arr].filter((c, index) => {
                              return [...prev, ...arr].indexOf(c) == index;
                            })
                          );
                          props.setData({
                            ...props.data,
                            best_subjects: bestSub,
                          });
                        }}
                      >
                        {el} x
                      </div>
                    ))}
                </div>
              </div>

              {/* <input
                type="text"
                name="software_skills"
                id="software_skills"
                value={softwareSkill}
                placeholder="Software Skills (with separated comma)"
                onChange={handleSoftwareSkillChange}
              /> */}

              <Autocomplete
                isBig={true}
                stateDriver={softSkill}
                setStateDriver={setSoftSkill}
                dataBase={softwareSkill}
                setData={props.setData}
                data={props.data}
                variableData={props.software_skills}
                staticName="software_skills"
                placeholder="Software Skills"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {/* {console.log({ softSkill })} */}
                {softSkill &&
                  softSkill?.map((el, i, arr) => (
                    <div
                      style={{
                        color: "#404040",
                        width: "fit-content",
                        border: "1px solid darkgray",
                        padding: "0px 7px 0px 7px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        margin: "3px",
                      }}
                      onClick={() => {
                        arr.splice(i, 1);
                        setSoftSkill((prev) =>
                          [...prev, ...arr].filter((c, index) => {
                            return [...prev, ...arr].indexOf(c) == index;
                          })
                        );
                        // props.setData({
                        //   ...props.data,
                        //   skills: skill,
                        // });
                      }}
                    >
                      {el} x
                    </div>
                  ))}
              </div>

              <div style={{ display: "flex", marginTop: "35px" }}>
                <input
                  type="checkbox"
                  checked={check}
                  onChange={handleCheck}
                  style={{ width: "4%", display: "block", alignSelf: "center" }}
                />
                <p>Whatsapp and phone no. are same.</p>
              </div>

              <div style={{ display: "flex" }}>
                {/* <select {...rest} value={value} onChange={(event) => onChange(event.target.value || undefined)}> */}
                <select
                  value={countryVal}
                  onChange={(e) => countryHandler(e)}
                  style={{
                    width: "20%",
                    marginBottom: "60px",
                    marginTop: "28px",
                    marginRight: "10px",
                  }}
                >
                  <option value="">{countryVal}</option>
                  {getCountries().map((country) => (
                    // {console.log({country:country})}
                    <option key={country} value={country}>
                      {en[country]} +{getCountryCallingCode(country)}
                    </option>
                  ))}
                </select>

                {!waValidation ? (
                  
                  <input
                    type="text"
                    style={{
                      marginTop: "30px",
                      marginRight: "10px",
                      borderBottomColor: "red",
                    }}
                    pattern="[0-9]*"
                    name="whatsapp_no"
                    id="phone_number"
                    value={props.whatsapp_no}
                    className="whatsapp_input"
                    placeholder="Whatsapp No.*"
                    onChange={handleWhatsapp}
                    required
                  />
            
                ) : (
                  <input
                    type="text"
                    style={{ marginTop: "30px", marginRight: "10px" }}
                    pattern="[0-9]*"
                    name="whatsapp_no"
                    id="phone_number"
                    value={props.whatsapp_no}
                    className="whatsapp_input"
                    placeholder="Whatsapp No.*"
                    onChange={handleWhatsapp}
                    required
                  />
                )}

                <input
                  type="text"
                  style={{ marginTop: "30px", marginRight: "10px" }}
                  pattern="[0-9]*"
                  name="phone_number"
                  id="phone_number"
                  value={check ? props.whatsapp_no : props.phone_no}
                  className="whatsapp_input"
                  placeholder="Phone No.*"
                  onChange={handlePhone}
                  required
                />
              </div>
             {!waValidation && <p style={{color:"red",marginTop: "-60px",marginBottom: "60px"}}>Please enter a valid whatsapp number</p>}
             {!checkWhatapp && <p style={{color:"red",marginTop: "-60px",marginBottom: "60px"}}>Please enter whatsapp number</p>}
            </div>
            <div>
              <label for="agree-term" className="label-agree-term">
                Select Files showing your highest Degree*
                <input
                  type="file"
                  name="highestDegreeFile"
                  onChange={(e) => handleFile(e)}
                  multiple
                ></input>
                {!checkHighestDegreeFile && <p style={{color:"red",marginTop:"-30px"}}>Please add file</p>}
              </label>
            </div>
            <div className="form-submit row" style={{ display: "flex" }}>
              <div className="col-sm " style={{ width: "50%" }}>
                <h4 style={{ color: "gray" }}>Step 1/3</h4>
              </div>
              <div
                className="col-sm"
                style={{ width: "50%", alignSelf: "center" }}
              >
                <button
                  type="next"
                  name="next"
                  id="next"
                  className="submit"
                  value="Next"
                  onClick={handleNext}
                  style={{
                    width: "35%",
                    display: "flex",
                    height: "40px",
                    justifyContent: ["space-evenly"],
                    alignItems: "center",
                    marginLeft: "65%",
                    alignSelf: "center",
                  }}
                  // placeholder="Next"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
