const express = require("express");
const router = express.Router();
const multer = require("multer");
const { file } = require("googleapis/build/src/apis/file");
const Tutor_Form1 = require("../models/TutorForm1.js");
const info = require("../models/info");
const axios = require("axios");
const base64 = require("base-64");
const upload2 = require("../middleware/filesave2");
const Multer = multer();





// Saving Tutor

router.route("/tutor_save").post(
  upload2.fields([
    { name: "panFile", maxCount: 4 },
    { name: "highestDegreeFile", maxCount: 4 },
  ]),
  async (req, res) => {
 
    const tutorForm1 = new Tutor_Form1({
      tutor_id: req.body.tutorId,
      email: req.body.email,
      username: req.body.username,
      branch: req.body.branch,
      highest_degree: req.body.highest_degree,
      other_degree: req.body.other_degree,
      university: req.body.university,
      skills: req.body.skills,
      other_skill: req.body.other_skill,
      best_subjects: req.body.best_subjects,
      software_skills: req.body.software_skills,
      country_and_code: req.body.CountryAndCode,
      whatsapp_no: req.body.whatsapp_no,
      phone_no: req.body.phone_no,
    //   highestDegreeFile:[],
      pan_name: req.body.panName,
      pan_number: req.body.panNumber,
    //   pan_file:[],
      account_name: req.body.accName,
      account_number: req.body.accNumber,
      ifsc: req.body.ifsc,
      UPI: req.body.UPI,

      // file:req.file.path
    });

    try {
      if (req.body.whatsapp_no.length != 0 && req.body.phone_no?.length == 0) {
        tutorForm1.phone_no = req.body.whatsapp_no;
      }

      if (req.files) {
        console.log({ filerr: req.files });
       

        req.files?.panFile?.forEach(function (file, index, arr) {
          let fileBuffer = file.buffer;
          tutorForm1.pan_file.push(fileBuffer);
          // console.log(fileBuffer);
        });

        req.files?.highestDegreeFile.forEach(function (file, index, arr) {
          tutorForm1.highestDegreeFile.push(file.buffer);
        });

      } else {
        console.log("no files");
        // console.log({ file: req.files.path });
      }

      if (req.body.tutorId) {
        const razorpayContacts = await axios({
          url: "https://api.razorpay.com/v1/contacts",
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic " +
              base64.encode(
                "rzp_live_Jk4vwq7tyL9Aeg" + ":" + "qUjOJWotN6x47WSDExJ4NURs"
              ),
          },
          data: {
            name: req.body.accName,
            email: req.body.email,
            contact: req.body.whatsapp_no,
            type: "vendor",
            reference_id: req.body.tutor_id,
            notes: {
              notes_key_1: "Comming from Website",
            },
          },
        });

        try {
          if (razorpayContacts.data) {
            console.log({ razorpayContacts: razorpayContacts.data });
            let contactId = razorpayContacts.data.id;

            const razorpayFund_upi = await axios({
              url: "https://api.razorpay.com/v1/fund_accounts",
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Basic " +
                  base64.encode(
                    "rzp_live_Jk4vwq7tyL9Aeg" + ":" + "qUjOJWotN6x47WSDExJ4NURs"
                  ),
              },
              data: {
                account_type: "vpa",
                contact_id: contactId,
                vpa: {
                  address: req.body.UPI,
                },
              },
            });

            if (razorpayFund_upi.data) {
              tutorForm1.fundId_upi = razorpayFund_upi.data.id;
              console.log("Got fundId upi");
            } else {
              console.log("Didn't get fundId upi");
            }

            const razorpayFund_bank = await axios({
              url: "https://api.razorpay.com/v1/fund_accounts",
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Basic " +
                  base64.encode(
                    "rzp_live_Jk4vwq7tyL9Aeg" + ":" + "qUjOJWotN6x47WSDExJ4NURs"
                  ),
              },
              data: {
                contact_id: contactId,
                account_type: "bank_account",
                bank_account: {
                  name: req.body.accName,
                  ifsc: req.body.ifsc,
                  account_number: req.body.accNumber,
                },
              },
            });

            if (razorpayFund_bank.data) {
              let fa_id = razorpayFund_bank.data.id;

              const razorpayBank_validation = await axios({
                url: "https://api.razorpay.com/v1/fund_accounts/validations",
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    "Basic " +
                    base64.encode(
                      "rzp_live_Jk4vwq7tyL9Aeg" +
                        ":" +
                        "qUjOJWotN6x47WSDExJ4NURs"
                    ),
                },
                data: {
                  account_number: "3434949239801329",
                  fund_account: {
                    id: fa_id,
                  },
                  amount: 100,
                  currency: "INR",
                  notes: {
                    random_key_1: "Bank validation",
                    // "random_key_2": "Tea. Earl Grey. Hot."
                  },
                },
              });
              if (razorpayBank_validation.data) {
                if (razorpayBank_validation.data.status == "completed") {
                  if (
                    razorpayBank_validation.data.results.registered_name ==
                    req.body.accName
                  ) {
                    tutorForm1.fundId_bank = fa_id;
                    const newV = await tutorForm1.save();
                    res.status(200).json({ success: true });
                  } else {
                    res.send({
                      success: false,
                      status: "notMatched",
                      validationOne: razorpayBank_validation.data,
                    });
                    console.log(
                      "user not validated because status is completed but user is not matching "
                    );
                    console.log({
                      validationOne: razorpayBank_validation.data,
                    });
                    console.log({ validationtWO: req.body.username });
                  }
                }
                // else{

                // }
                // console.log({validation:razorpayBank_validation})
                else if (razorpayBank_validation.data.status == "failed") {
                  res.send({
                    success: false,
                    status: "Session_Failed",
                  });
                  console.log("transaction failed due to technical error ");
                } else {
                  res.send({
                    success: false,
                    status: "Session_Pending",
                  });
                  console.log({ validation: "validation failed" });
                }
              } else {
                console.log("response is not there");
                res.status(400).json("error");
              }
            } else {
              res.send({ success: false, status: "Session_Failed" });
              console.log("Didn't get fundId bank");
            }

           
          } else {
            console.log("Didnt find contact Id ");
          }
        } catch (err) {
          res.send({ success: false, status: "Session_Failed" });
          console.log("error ! Didnt find contact id");
        }
      }

    
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);




// Email exist in database or not

router.route("/email_check").post(async (req, res) => {
    const emailCheck = await Tutor_Form1.findOne({ email: req.body.email });
  
    try {
      console.log({ emailCheck });
      if (emailCheck) {
        res.status(200).json({ success: false });
        console.log("Email exist");
      } else {
        res.send({ success: true });
        console.log("Email doesnot exist");
      }
    } catch (err) {
      console.log(err);
    }
  });





//   get form_data through tutorId 

router.route("/find_tutorId").get(async (req, res) => {
    const tutorForm_object = await Tutor_Form1.find({});
  
    try {
      //    console.log({emailCheck})
      if (tutorForm_object) {
        res.status(200).json({ tutorForm_object: tutorForm_object });
        console.log("object is there");
      } else {
        res.status(400).json({ success: false });
        console.log("objects are not there");
      }
    } catch (err) {
      console.log(err);
    }
  });






//   getting information for dropdowns

router.route("/info").get(async (req, res) => {
    const getInfo = await info.findOne({ key: "one" });
    try {
      console.log({ getInfo });
      if (getInfo) {
        res.status(200).json({ getInfo });
        console.log("getInfo");
      } else {
        res.status(400).json({ success: "getInfoFailed" });
        console.log("getInfoFailed");
      }
    } catch (err) {
      console.log(err);
    }
  }
  );



module.exports = router;
