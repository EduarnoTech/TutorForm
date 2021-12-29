import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./registrationForm.css";
import axios from "axios";
import { dropdownDataUrl, storeDataUrl } from "../serviceUrls/ServiceUrl";

const Accounts = (props) => {
  const [checkAccName, setCheckAccName] = useState(true);
  const [checkAccNumber, setCheckAccNumber] = useState(true);
  const [checkIfsc, setCheckIfsc] = useState(true);
  const [validUpi, setValidUpi] = useState(true);
  const [validIfsc, setValidIfsc] = useState(true);
  const [validAccNumber, setValidAccNumber] = useState(true);

  const history = useHistory();
  // const [data, setData] = useState({
  //   accName:'',
  //   accNumber:'',
  //   ifsc:'',
  //   UPI:''
  // });
  // const {
  //  accName,
  //  accNumber,
  //  ifsc,
  //  UPI
  // } = data;
  console.log(props.data);
  const handleChange = (e) => {
    setCheckAccName(true);
    setCheckAccNumber(true);
    setCheckIfsc(true);
    setValidAccNumber(true);
    setValidIfsc(true);
    setValidUpi(true);
    props.setData({
      ...props.data,
      [e.target.name]: e.target.value,
    });
  };
  const handleDegreeChange = (e) => {
    props.setData({
      ...props.data,
      [e.target.name]: e.target.value,
      other_degree: "",
    });
  };
  //   const handleOther = (e) => {
  //     setData({
  //       ...data,
  //       [e.target.name]: e.target.value,
  //     });
  //   };
  //   const handleSetSkills = (e) => {
  //     const newSkill = skill.filter((i) => i === e.target.value);
  //     if (newSkill.length === 0 && skill.length < 20) {
  //       setSkill([...skill, e.target.value]);
  //       setData({
  //         ...data,
  //         [e.target.name]: [...skill, e.target.value],
  //       });
  //     }
  //   };

  //   const handleOtherSkill = (e) => {
  //     setOtherSkill(e.target.value);
  //   };
  //   const handleAddSkill = (e) => {
  //     if (skill.length < 21) {
  //       setData({
  //         ...data,
  //         other_skill: [...other_skill, otherSkill],
  //       });
  //       setSkill([...skill, otherSkill]);
  //     }
  //   };

  //   const handleBestSub = (e) => {
  //     const filter = bestSub.filter((i) => i === e.target.value);
  //     if (filter.length === 0 && bestSub.length < 5) {
  //       setBestSub([...bestSub, e.target.value]);
  //       setData({
  //         ...data,
  //         [e.target.name]: [...bestSub, e.target.value],
  //       });
  //     }
  //   };

  const handlePrevious = (e) => {
    e.preventDefault();
    history.replace("/PAN_Card_Check");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (

    //     props.accName.length > 0 &&
    //     props.accNumber.length > 0 &&
    //     props.ifsc.length > 0

    //   )
    if (props.accName.length === 0) {
      setCheckAccName(false);
    } else if (props.accNumber.length === 0) {
      setCheckAccNumber(false);
    } else if (props.ifsc.length === 0) {
      setCheckIfsc(false);
    } else {
      let re = /^\d{9,18}$/;
      if (re.test(props.accNumber)) {
        let reg = /^[A-Za-z]{4}0[A-Z0-9]{6}$/;
        if (reg.test(props.ifsc)) {
          let re1 = /[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/;
          if (props.UPI === "" || re1.test(props.UPI)) {
            props.setIsSubmit(true);

            console.log({ itsUltimate: "submitted" });
          } else {
            // alert ('Enter a valid UPI Id')
            setValidUpi(false);
            props.setIsSubmit(false);
            // setIsInputError(false)
          }
          // history.replace('/registration-form/success');
        } else {
          // alert('Plese enter a valid IFSC code')
          setValidIfsc(false);
          props.setIsSubmit(false);
          // setIsInputError(false)
        }
      } else {
        // alert('Please enter a valid Account Number')
        setValidAccNumber(false);
        props.setIsSubmit(false);
        // setIsInputError(false)
      }
    }
    // else{
    //   alert('Please fill all the required feilds properly*')
    //   props.setIsSubmit(false)
    // }
  };

  // if(props.success===true){
  //   history.replace('/tutorForm_success');}
  //   else{
  //     console.log({error:"some issue in submitting"})
  //   }

  useEffect(() => {
    if (props.success === true) {
      history.replace("/tutorForm_success");
    } else {
      console.log({ error: "some issue in submitting" });
    }
  }, [props.success]);
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
                name="accName"
                id="accName"
                value={props.accName}
                style={{ borderBottomColor: !props.isInputError && "red" }}
                // onClick={props.setIsInputError(true)}
                onChange={handleChange}
                placeholder="Account Holder's Name (Same as there in Bank Passbook)*"
                required
              />
              {!checkAccName && (
                <p
                  style={{
                    color: "red",
                    marginTop: "-30px",
                    marginBottom: "20px",
                  }}
                >
                  Please enter your registered name
                </p>
              )}
              <input
                type="text"
                // pattern="[0-9]{9,18}"
                name="accNumber"
                id="accNumber"
                value={props.accNumber}
                style={{ borderBottomColor: !props.isInputError && "red" }}
                // onClick={props.setIsInputError(true)}
                onChange={handleChange}
                placeholder="Account Number*"
                required
              />
              {!checkAccNumber && (
                <p
                  style={{
                    color: "red",
                    marginTop: "-30px",
                    marginBottom: "20px",
                  }}
                >
                  Please enter your bank account number
                </p>
              )}
              {!validAccNumber && (
                <p
                  style={{
                    color: "red",
                    marginTop: "-30px",
                    marginBottom: "20px",
                  }}
                >
                  Please enter a valid account number
                </p>
              )}
              <input
                type="text"
                name="ifsc"
                id="ifsc"
                value={props.ifsc}
                style={{ borderBottomColor: !props.isInputError && "red" }}
                onChange={handleChange}
                // onClick={props.setIsInputError(true)}
                placeholder="IFSC*"
                required
              />
              {!checkIfsc && (
                <p
                  style={{
                    color: "red",
                    marginTop: "-30px",
                    marginBottom: "20px",
                  }}
                >
                  Please enter Ifsc
                </p>
              )}
              {!validIfsc && (
                <p
                  style={{
                    color: "red",
                    marginTop: "-30px",
                    marginBottom: "20px",
                  }}
                >
                  Please enter a valid Ifsc
                </p>
              )}
              <input
                type="text"
                name="UPI"
                id="UPI"
                value={props.UPI}
                onChange={handleChange}
                placeholder="UPI Id"
              />
              {!validUpi && (
                <p
                  style={{
                    color: "red",
                    marginTop: "-30px",
                    marginBottom: "20px",
                  }}
                >
                  Please enter a Valid Upi
                </p>
              )}
            </div>
            <div className="form-check">
              <label for="agree-term" className="label-agree-term">
                I agree that I have read the{" "}
                <a
                  href="https://tutorpoint.in/p_policy.php"
                  target="_blank"
                  rel="noreferrer"
                  className="term-service"
                >
                  Privacy and Policy
                </a>
              </label>
            </div>
            <div className="form-submit" style={{ display: "flex" }}>
              <div className="col-sm " style={{ width: "50%" }}>
                <h4 style={{ color: "gray" }}>Step 3/3</h4>
              </div>
              <div style={{ width: "50%" }}>
                <input
                  type="submit"
                  name="previous"
                  id="previous"
                  className="previous"
                  value="Previous"
                  onClick={handlePrevious}
                />
              </div>
              <input
                type="submit"
                name="submit"
                id="submit"
                className="submit"
                value="Submit"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
