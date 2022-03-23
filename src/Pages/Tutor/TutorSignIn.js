import React,{useState, Fragment} from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import TutorRegform from "./TutorRegform";

const TutorSignIn = () => {

  const history = useHistory()

    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [ifTutorLoggedIn,setIfTutorLoggedIn]=useState(false)
    // const[isLogin,setIsLogin]=useState(false);
  
  
  
  
    const emailHandler = (event) => {
      // event.preventDefault()
      setEnteredEmail(event.target.value);
    };
    
    const passwordHandler = (event) => {
        setEnteredPassword(event.target.value);
    };
   
  
    const submitHandler= async(event)=>{
      event.preventDefault();
      try {
        await axios
          .post("http://localhost:8800/tutor/tutorSignIn", {
            email:enteredEmail,
            password:enteredPassword
          })
          .then((res) => {
            console.log(res.data.success);
            if (res.data.success) {
              // setIsSignUp(true);
              // setEnteredUsername(" ");
              // setEnteredEmail(" ");
              // setEnteredPhone(" ");
              setEnteredPassword("");
              setIfTutorLoggedIn(true)
              // setEnteredCPassword("");

              // alert("Successfully Signed In");
              // history.replace("/TutorRegform")
              // const continuationToRegform =()=>{
              //   return ( <TutorRegform enteredEmail={enteredEmail} />)
              // }
              // continuationToRegform()
            //  { <TutorRegform />}
            }
            else{
              setIfTutorLoggedIn(false)
            }
          })
          .catch((err) => console.log(err));
        console.log({enteredEmail})
        console.log("working");
      } catch (err) {
        console.log("not working");
      }

    }


  return (
    <Fragment>
     
     {ifTutorLoggedIn && <TutorRegform enteredEmail={enteredEmail} />}
     {!ifTutorLoggedIn && <section className="sign_in_area bg_color sec_pad">
      <div className="container">
        <div className="sign_info">
          <div style={{ justifyContent: "flex-end" }} className="row">
            {/* <div className="col-lg-6">
              <img
                style={{ width: "509px", marginTop: "60px" }}
                src={require("../img/home-chat/login.png")}
                alt=""
              />
            </div> */}
            <div className="col-lg-6">
              <div className="login_info">
                <h2 className="f_p f_600 f_size_24 t_color3 mb_40">Sign In</h2>
                <form
                  action="#"
                  className="login-form sign-in-form"
                  onSubmit={submitHandler}
                >
                  <div className="form-group text_box">
                    <label className="f_p text_c f_400">Email</label>
                    <input
                      type="text"
                      placeholder="Enter your Email"
                      value={enteredEmail}
                      onChange={emailHandler}
                    />
                  </div>

                  <div className="form-group text_box">
                    <label className="f_p text_c f_400">Password</label>
                    <input
                      type="password"
                      placeholder="******"
                      value={enteredPassword}
                      onChange={passwordHandler}
                    />
                  </div>

                  <div className="extra mb_20">
                    <div className="checkbox remember">
                      <label>
                        <input type="checkbox" checked /> I agree to terms and
                        conditions of this website
                      </label>
                    </div>

                    <div className="forgotten-password">
                      <a href="/#">Forgot Password?</a>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn_three">
                      Sign In
                    </button>
                    <div className="social_text d-flex ">
                      {/* <div className="lead-text">Sign In</div> */}
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
                  {/* <div style={{marginTop: '25px'}}>
                                Already have an account? <strong>Sign in</strong>
                                </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>}
    </Fragment>
  );
};

export default TutorSignIn;
