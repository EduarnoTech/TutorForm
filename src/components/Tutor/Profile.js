import React, { Fragment, useEffect, useState } from "react";
import "./Profile.css";
import BankDialogBox from "../../components/Dialog_box/BankAcc_Details";
import PanDialogBox from "../../components/Dialog_box/Pan_Details";
import axios from "axios";

const Profile = (props) => {
  const [bankDialogBox, setBankDialogBox] = useState(false);
  const [panDialogBox, setPanDialogBox] = useState(false);
  const [changeSubject, setChangeSubject] = useState(false);
  const [skill, setSkill] = useState([]);
  const [skillSave, setSkillSave] = useState([]);
  const [skillInput, setSkillInput] = useState();

  const [softSkillSave, setSoftSkillSave] = useState([]);
  const [softSkillInput, setSoftSkillInput] = useState();

  const [bestSkillShow, setBestSkillShow] = useState(false);
  const [bestSkillSave, setBestSkillSave] = useState([]);

  // const skillSaveHandler = () => {
  //   setSkillSave([...skill]);
  //   console.log({ skillProfile: skill, skillSaveProfile: skillSave });
  // };

  const skillSubmit = () => {
    setSkillSave([...skillSave, skillInput]);
    setBestSkillSave([...bestSkillSave,skillInput])
    setSkillInput("");
   
  };
  const softSkillSubmit=()=>{
    setSoftSkillSave([...softSkillSave,softSkillInput])
    setSoftSkillInput("")
  }


const updateSkillHandler=async()=>{
  const updateSkill=await axios.post("http://localhost:8800/tutor/update_skill",{tutorId:props.tutrId, skillSave:skillSave,softSkillSave:softSkillSave,bestSkillSave:bestSkillSave})
  if(updateSkill.data.success){
    console.log("skills successfully updated!")
    setChangeSubject(false)
    setBestSkillShow(false)
  }
  else{
    alert("Some error in updating your skills.Please try again!!")
    console.log("not updated!")
  }
}

  useEffect(() => {
    console.log({tutorProfile:props.tutrId})
    setSkillSave([...props.tutorformData.skills]);
    setSoftSkillSave([...props.tutorformData.software_skills]);
    setBestSkillSave([...props.tutorformData.best_subjects])
  }, []);
  console.log({ skillSave: skillSave });

  return (
    <Fragment>
      {/* <CustomizedDialogs bankDialogBox={bankDialogBox} /> */}
      {/* <CustomizedDialogs /> */}
      <div>
        <div class="main-body">
          <div class="page-wrapper">
            <div class="row">
              <div class="col-sm-12">
                <div
                  class="card "
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div class="card-container" style={{ flex: "30%" }}>
                    <span class="pro">PRO</span>
                    <img class="round" src="img/TutorProfile" alt="user" />
                    <h3>{props.tutorformData.username}</h3>
                    <h6>{props.tutorformData.email}</h6>
                    <p>
                      {props.tutorformData.university}
                      <br /> {props.tutorformData.branch} (
                      {props.tutorformData.highest_degree})
                    </p>
                    <div class="buttons">
                      <BankDialogBox
                        UPI={props.tutorformData.UPI}
                        ifsc={props.tutorformData.ifsc}
                        account_name={props.tutorformData.account_name}
                        account_number={props.tutorformData.account_number}
                      >
                        <button class="primary">Bank Account Details</button>
                      </BankDialogBox>
                      <PanDialogBox
                        pan_name={props.tutorformData.pan_name}
                        pan_number={props.tutorformData.pan_number}
                      >
                        <button class="primary ghost">Pan Card Info</button>{" "}
                      </PanDialogBox>
                    </div>
                    <div class="skills">
                      {/* <h6>Skills</h6>
                    <ul>
                  
                  <div class="skills"> */}
                      <h6>Best Skills</h6>
                      {!bestSkillShow && <ul>
                        {bestSkillSave.map((i) => (
                          <li>{i}</li>
                        ))}
                      </ul>}
                          <div style={{display:"flex"}}><ul>
                     {bestSkillShow && bestSkillSave.map((el, i, arr) => (
                       <li>
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
                                      return (
                                        [...prev, ...arr].indexOf(c) == index
                                      );
                                    })
                                  );
                                  // setSkillSave([...skill]);
                                  // skillSaveHandler();
                                }}
                              >
                                {el} x
                              </div>
                              </li>
                            ))
                              }
                              </ul>
                              </div>
                      
                     

                      <div class="w-100 d-flex justify-content-center my-3 " style={{marginTop:"0rem !important"}}>
                      {!bestSkillShow && (
                        <a
                          href="#"
                          onClick={() => setBestSkillShow(true)}
                          class="profile__button responsive-pd-x py-2"
                        >
                          Change tags <i class="fas fa-pencil-alt ml-1"></i>
                        </a>
                      )}

                      {bestSkillShow && (
                        <a
                          href="#"
                          // onClick={() => setChangeSubject(false)}
                          class="profile__button responsive-pd-x py-2"
                          onClick={()=>updateSkillHandler()}
                        >
                          Update <i class="fas fa-sync-alt"></i>
                        </a>
                      )}
                    </div>
                  
                  
                      {/* </div>
                  <div class="skills"> */}
                      {/* <h6>Software Skills</h6>
                    <ul>
                    { props.tutorformData.software_skills.map((i)=><li>{i}</li>)}
                    </ul> */}
                    </div>
                  </div>

                  <div
                    class="bg-white b-r-lg px-4 py-1 shadow-sm"
                    style={{ flex: "70%" }}
                  >
                    <h4 class="my-2">Subjects </h4>

                    <div class="badge-group" style={{ display: "flex" }}>
                      {
                        !changeSubject
                          ? skillSave.map((i) => (
                              <span class="badge badge-pill text-white bg-secondary" style={{marginRight:"4px"}}>
                                {i}
                              </span>
                            ))
                          :
                          
                          skillSave &&
                            skillSave.map((el, i, arr) => (
                              
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
                                      return (
                                        [...prev, ...arr].indexOf(c) == index
                                      );
                                    })
                                  );
                                  // setSkillSave([...skill]);
                                  // skillSaveHandler();
                                }}
                              >
                                
                                {el} x
                                
                              </div>
                             
                            ))
                          
                        //  ( <a href="#" style={{size:"10px"}}><i class="fa fa-plus-circle" aria-hidden="true"></i></a>)
                      }
                      {changeSubject && (
                        <div style={{ display: "flex" }}>
                          <input
                            placeholder="Add a subject/skill"
                            onChange={(e) => setSkillInput(e.target.value)}
                            value={skillInput}
                          />
                          <button
                            style={{ size: "10px", alignSelf: "center" }}
                            className="btn btn-primary"
                            onClick={() => skillSubmit()}
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>

                    {/* software skills */}

                    <h4 class="my-2">Software Skills</h4>
                    <div class="badge-group" style={{ display: "flex" }}>
                      {/* { props.tutorformData.software_skills.map((i) => (<span class="badge badge-pill text-white bg-secondary">{i}</span>))} */}

                      {!changeSubject
                        ? softSkillSave.map((i) => (
                            <span class="badge badge-pill text-white bg-secondary" style={{marginRight:"4px"}}>
                              {i}
                            </span>
                          ))
                        : softSkillSave &&
                          softSkillSave.map((el, i, arr) => (
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
                                    return (
                                      [...prev, ...arr].indexOf(c) == index
                                    );
                                  })
                                );
                                //   props.setData({
                                //     ...props.data,
                                //     skills: [...skill],
                                //   });
                              }}
                            >
                              {el} x
                            </div>
                          ))}

                      {changeSubject && (
                        <div style={{ display: "flex" }}>
                          <input
                            placeholder="Add a subject/skill"
                            onChange={(e) => setSoftSkillInput(e.target.value)}
                            value={softSkillInput}
                          />
                          <button
                            style={{ size: "10px", alignSelf: "center" }}
                            className="btn btn-primary"
                            onClick={() => softSkillSubmit()}
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>

                    {/* change subject */}
                    <div class="w-100 d-flex justify-content-center my-3">
                      {!changeSubject && (
                        <a
                          href="#"
                          onClick={() => setChangeSubject(true)}
                          class="profile__button responsive-pd-x py-2"
                        >
                          Change subject <i class="fas fa-pencil-alt ml-1"></i>
                        </a>
                      )}

                      {changeSubject && (
                        <a
                          href="#"
                          // onClick={() => setChangeSubject(false)}
                          class="profile__button responsive-pd-x py-2"
                          onClick={()=>updateSkillHandler()}
                        >
                          Update <i class="fas fa-sync-alt"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
