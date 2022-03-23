import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { borderColor } from "@mui/system";
import { red } from "@mui/material/colors";
// import './SignUpForm.css'

const SignUpForm = (props) => {
//   props.setIsSignUp(false);
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredCPassword, setEnteredCPassword] = useState("");
  const [tutorId,setTutorId] = useState("")
  const [isSignUp, setIsSignUp] = useState(false);
  const [isCorrect,setIsCorrect]=useState(false)



  useEffect(()=>{
    const findForm2=async()=>{
    const find_tutorId = await axios.get(
      "http://localhost:8800/tutor/find_tutorId"
    );
    
    // console.log({lllll:find_tutorId.data.tutorForm_object})
    // console.log("hiiiii",find_tutorId)
      if(find_tutorId?.data?.tutorForm_object?.length!=0){
        let tutoId=find_tutorId?.data?.tutorForm_object;
        let tutId=tutoId[(tutoId.length)-1]?.tutor_id;
        // console.log({tutId})
        tutId=tutId?.replace("EDUT","")
        let newId=+tutId+1;
        // console.log({newId})
        let newId2="EDUT"+newId
        console.log({newId2})
        setTutorId(newId2)
        
      }
      else{
        let tutId="EDUT1000101"
        setTutorId(tutId)
        // console.log({tutId})
    }
  }
  findForm2()
 
  },[])

  const usernameHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const emailHandler =  (event) => {
    // event.preventDefault()
    setEnteredEmail(event.target.value);
  };
  const phoneHandler = (event) => {
    setEnteredPhone(event.target.value);
  };
  const passwordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  const passwordCHandler = (event) => {
    setEnteredCPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    let postData = {
      username: enteredUsername,
      email1: enteredEmail,
    //   phone: enteredPhone,
      password: enteredPassword,
      
    };

    console.log(postData);

    // if(checked){
    if (
      postData.username &&
      postData.email1 &&
    //   postData.phone &&
      postData.password
    ) {
      
    //   const result2=await axios
    //         .post("http://localhost:8800/client/getPhone", {email:postData.email1})
    // if(result2.data===null){
    //   setIsCorrect(true)
      if (enteredCPassword === enteredPassword) {
        try {
          await axios
            .post("http://localhost:8800/tutor/tutorSignUp", postData)
            .then((res) => {
              console.log(res.data.success);
              if (res.data.success) {
                setIsSignUp(true);
                setEnteredUsername(" ");
                setEnteredEmail(" ");
                setEnteredPhone(" ");
                setEnteredPassword("");
                setEnteredCPassword("");
                alert("Successfully Submitted");
              }
            })
            .catch((err) => console.log(err));

          console.log("working");
        } catch (err) {
          console.log("not working");
        }
      } else {
        alert("password is not matching");
      }
    // }
    // else{
    //   alert("Email is already used")
    // }
  }
    else{
      alert("Please enter all the required fields")
    }
  };

  // }

  return (
    <section className="sign_in_area bg_color sec_pad">
      <div className="container">
        <div className="sign_info">
          <div style={{ justifyContent: "flex-end" }} className="row">
            <div className="col-lg-6">
              <img
                style={{ width: "509px", marginTop: "60px" }}
                // src={require("../img/home-chat/login.png")}
                alt=""
              />
            </div>
            <div className="col-lg-6">
              <div className="login_info">
                <h2 className="f_p f_600 f_size_24 t_color3 mb_40">Sign Up</h2>
                <form
                  action="/SignIn"
                  onSubmit={submitHandler}
                  className="login-form sign-in-form"
                >
                  <div className="form-group text_box">
                    <label className="f_p text_c f_400">Username</label>
                    <input
                      type="text"
                      placeholder="Name"
                      onChange={usernameHandler}
                      value={enteredUsername}
                    />
                  </div>
                  <div className="form-group text_box">
                    <label className="f_p text_c f_400">Email Address</label>
                    <input
                      type="email"
                      placeholder="xyz@gmail.com"
                      onChange={emailHandler}
                      value={enteredEmail}
                      className={isCorrect && "inputEmail" }
                    />
                  </div>

                  {/* <div className="form-group text_box">
                    <label className="f_p text_c f_400">Phone Number</label>
                    <input
                      type="number"
                      placeholder="Enter Your Number"
                      onChange={phoneHandler}
                      value={enteredPhone}
                      style={{
                        font: "400 15px/60px Poppins sansSerif",
                        color: "#222d39",
                        height: "60px",
                        borderRadius: "4px",
                        backgroundColor: "white",
                        boxShadow: "0px 2px 4px 0px rgb(12 0 46 / 4%)",
                        width: "100%",
                        border: "1px",
                        solid: "#fff",
                        paddingLeft: "30px",
                      }}
                    />
                  </div> */}

                  <div className="form-group text_box">
                    <label className="f_p text_c f_400">Password</label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      onChange={passwordHandler}
                      value={enteredPassword}
                    />
                  </div>

                  <div className="form-group text_box">
                    <label className="f_p text_c f_400">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      onChange={passwordCHandler}
                      value={enteredCPassword}
                    />
                  </div>

                  <div className="extra mb_20">
                    <div className="checkbox remember">
                      <label>
                        <input type="checkbox" checked /> I agree to terms and
                        conditions of this website
                      </label>
                    </div>

                    {/* <div className="forgotten-password">
                                                <a href="/#">Forgot Password?</a>
                                            </div> */}
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    {/* <Link  to={isSignUp && '/SignIn'}> */}
                    <button type="submit" className="btn_three">
                      Sign Up
                    </button>
                    {/* </Link> */}

                    <div className="social_text d-flex ">
                      <div className="lead-text">Or Sign up Using</div>
                      <ul className="list-unstyled social_tag mb-0">
                        <li>
                          <a href="/#">
                            <i className="ti-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="/#">
                            <i className="ti-twitter-alt"></i>
                          </a>
                        </li>
                        <li>
                          <a href="/#">
                            <i className="ti-google"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div style={{ marginTop: "25px" }}>
                    Already have an account?{" "}
                    <strong>
                      <Link to="/TutorSignIn">Sign in</Link>
                    </strong>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    
  );
};
export default SignUpForm;
