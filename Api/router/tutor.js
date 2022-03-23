const express = require("express");
const router = express.Router();
const multer = require("multer");
const Detailed_tutorForm1 = require("../models/Detailed_tutorForm1");
const { google } = require("googleapis");
const upload = require("../middleware/filesave");
const upload2 = require("../middleware/filesave2");

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});
// oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Create client instance for auth

// const spreadsheetId = "12SRZTtWmR-4lETEcPbzyWUbwEaU-3PQsSjkamUS6sjk";
const spreadsheetId = "1ZhPTFouLJxd7Pii48DpaEWGx59PegDnC7qZLRWK4JCs";

// get questions from drive
router.post("/get_questions", async (req, res) => {
  const CLIENT_ID =
    "831170386816-nc4hts2cbl21o5slo4kah59mc1q2i05k.apps.googleusercontent.com";
  const CLIENT_SECRET = "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";
  const REDIRECT_URI = "https://developers.google.com/oauthplayground";
  const REFRESH_TOKEN =
    "1//04ndJ7bFzKndqCgYIARAAGAQSNwF-L9IrRpzre3yKbDTkl5Lhh2giG__S-X0J0AILmneXueTx0AfLXH9V3oF2uc6o4hBycknOnWI";

  const oauth2client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });

  const drive = google.drive({
    version: "v3",
    auth: oauth2client,
  });

  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  function getRandom(arr, n) {
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError(
        "getRandom: more elements taken than available"
      );
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  try {
    //googlesheet api
    const metaData = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });

    // console.log({title:metaData.data.sheets[0].properties.title})
    let title = metaData.data.sheets[0].properties.title;
    let subjectList = req.body.subjectList;
    let answerRowId = "";
    let timeOfTest = "";
    let noOfQues = "";
    const getData = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,

      range: title + "!A:A",
    });

    if (getData.data) {
      // console.log({ getData: getData.data });
      let subVal = getData.data.values;

      subjectList.map(async (el4) => {
        subVal.map(async (el, index) => {
          if (el[0] == el4) {
            console.log({ subjectList: el4, subVal: el });
            answerRowId = index + 1;

            const InfoFromSheet =
              await googleSheets.spreadsheets.values.batchGet({
                auth,
                spreadsheetId,

                ranges: [
                  title + `!$C${answerRowId}:C${answerRowId}`,
                  title + `!$D${answerRowId}:D${answerRowId}`,
                ],
              });
            if (InfoFromSheet?.data?.valueRanges.length !== 0) {
              // passing_marks = InfoFromSheet.data.valueRanges[0].values[0][0];
              noOfQues = InfoFromSheet.data.valueRanges[0].values[0][0];
              timeOfTest = InfoFromSheet.data.valueRanges[1].values[0][0];
              console.log({ noOfQues, timeOfTest });

              let count = 1;

              console.log({ noOfQues11: noOfQues });
              let numberOfQues = +noOfQues / subjectList.length;
              numberOfQues = Math.floor(numberOfQues);
              let maxNumOfQues = numberOfQues * subjectList.length;
              let dif = noOfQues - maxNumOfQues;
              console.log({ numberOfQues });
              var quesBuffer = [];
              var keyArr = [];

              var clientFolderSearch = await drive.files.list({
                q: `mimeType='application/vnd.google-apps.folder' and name='Question Bank'`,
                fields: "files(id,name)",
              });

              console.log({ create3: clientFolderSearch.data.files });
              // try {
              var ClientFolder = clientFolderSearch.data.files[0];

              // SEARCHING FOR SESSION FOLDER

              if (clientFolderSearch.data.files.length !== 0) {
                subjectList.map(async (el2, index) => {
                  var sessionFolderSearch = await drive.files.list({
                    q: ` name="${el2}" and '${ClientFolder.id}' in parents`,
                    fields: "files(id,name)",
                  });
                  // console.log({ sessionisthere: sessionFolderSearch.data.files });

                  if (sessionFolderSearch.data.files.length !== 0) {
                    var fileSearch = await drive.files.list({
                      q: `'${sessionFolderSearch.data.files[0].id}' in parents`,
                      fields: "files(id,name)",
                    });
                    // console.log({fileId:fileSearch.data.files})

                    let fileId_Ar = fileSearch.data.files;

                   


                    if (index == subjectList.length - 1) {
                      numberOfQues += dif;
                    }
                    console.log({ numberOfQues });

                    let sortedFileId_Ar = getRandom(fileId_Ar, numberOfQues);
                    // console.log({ sortedFileId_Ar });

                    let i = 0;
                    sortedFileId_Ar?.map((el) => {
                      // fileId_Ar?.map((el) => {
                      let fileId = el.id;
                      let fileName = el.name;
                      let fileKey = fileName.split(".")[0];
                      
                      drive.files.get(
                        { fileId: fileId, alt: "media" },
                        { responseType: "stream" },
                        (err, { data }) => {
                          if (err) {
                            console.log(err);
                            return;
                          }
                          let buf = [];
                          data.on("data", (e) => buf.push(e));
                          data.on("end", () => {
                            const buffer = Buffer.concat(buf);
                            // console.log({buffer});

                            // console.log({boofer});
                            keyArr.push([fileKey, el2]);
                            quesBuffer.push(buffer);
                            // console.log({quesBuffer});
                            if (count == noOfQues) {
                              // console.log({quesBuffer});
                              res
                                .status(200)
                                .json({
                                  questionArr: quesBuffer,
                                  keyArr,
                                  timeOfTest
                                });
                            }
                            i++;
                            count++;
                          });
                        }
                      );
                      // }
                    });
                  }
                });
              }
            } else {
              console.log("not getting info from sheet");
            }
          } else {
            console.log("not able to find subject");
          }
        });
      });
    } else {
      console.log("not getting response from google sheet api");
      res.status(400).json({ errorInQues: err });
    }
  } catch (err) {
    res.status(400).json({ errorInQues: err });
    console.log({ err });
  }
});

// get answers from google sheet
router.post("/get_sheet", async (req, res) => {


  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  
  let marks = 0;
  let countMark = 0;
  let studentResponseSheet = req.body.answerObj;
  let subjectList = req.body.subjectList;
  let tutorId = req.body.tutorId;
  let passing_marks;
  let noOfQues;
  let timeOfTest;
  let examId = req.body.examId;
  // console.log(studentResponseSheet)

  //function to convert no. to letter
  var alphabet1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result123 = "";
  var result321 = "";
  function printToLetter(number) {
    var charIndex = number % alphabet1.length;
    var quotient = number / alphabet1.length;
    if (charIndex - 1 == -1) {
      charIndex = alphabet1.length;
      quotient--;
    }

    result123 = alphabet1.charAt(charIndex - 1) + result123;
    if (quotient >= 1) {
      printToLetter(parseInt(quotient));
    } else {
      console.log(result123);
      result321 = result123;
      result123 = "";
    }
  }

  try {
    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });

    // console.log({title:metaData.data.sheets[0].properties.title})
    let title = metaData.data.sheets[0].properties.title;
    let answerRowId = "";
    const getData = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,

      range: title + "!A:A",
    });

    if (getData.data) {
      console.log({ getData: getData.data });
      let subVal = getData.data.values;

      subjectList.map(async (el4) => {
        subVal.map(async (el, index) => {
          if (el[0] == el4) {
            console.log({ subjectList: el4, subVal: el });
            answerRowId = index + 1;

            const InfoFromSheet =
              await googleSheets.spreadsheets.values.batchGet({
                auth,
                spreadsheetId,

                ranges: [
                  title + `!$B${answerRowId}:B${answerRowId}`,
                  title + `!$C${answerRowId}:C${answerRowId}`,
                  title + `!$D${answerRowId}:D${answerRowId}`,
                ],
              });
            if (InfoFromSheet?.data?.valueRanges.length !== 0) {
              passing_marks = InfoFromSheet.data.valueRanges[0].values[0][0];
              noOfQues = InfoFromSheet.data.valueRanges[1].values[0][0];
              timeOfTest = InfoFromSheet.data.valueRanges[2].values[0][0];
              console.log({ passing_marks, noOfQues, timeOfTest });
            } else {
              passing_marks = 40;
              console.log("In else condition of spreadsheet values");
            }

            // logic match answer
            studentResponseSheet.map(async (el5) => {
              if (el4 == el5.Subject) {
                let idSub = el5.Key;

                printToLetter(+idSub + 4);
                console.log({ result321 });

                const answerFromSheet =
                  await googleSheets.spreadsheets.values.get({
                    auth,
                    spreadsheetId,

                    range:
                      title +
                      `!${result321}${answerRowId}:${result321}${answerRowId}`,
                  });
                // result123 = "";
                if (answerFromSheet?.data?.values[0][0] == el5.Answer) {
                  marks = marks + 1;
                  countMark = countMark + 1;
                  console.log("matching answers");
                  if (countMark == noOfQues) {
                    if (marks >= passing_marks) {
                      const updateMarks =
                        await Detailed_tutorForm1.findOneAndUpdate(
                          { tutor_id: tutorId },
                          {
                            $push: {
                              tutor_exam: {
                                exam_id: examId,
                                subject: subjectList[0],
                                marks: marks,
                                passing_marks: passing_marks,
                                status: "pass",
                              },
                            },
                          },
                          {
                            upsert: true,
                            new: true,
                            setDefaultsOnInsert: true,
                          }
                        );
                      res.status(200).json({
                        success: true,
                        exam_id: examId,
                        status: "pass",
                        result: marks,
                        subject: subjectList[0],
                      });
                    } else {
                      const updateMarks =
                        await Detailed_tutorForm1.findOneAndUpdate(
                          { tutor_id: tutorId },
                          {
                            $push: {
                              tutor_exam: {
                                exam_id: examId,
                                subject: subjectList[0],
                                marks: marks,
                                passing_marks: passing_marks,
                                status: "fail",
                              },
                            },
                          },
                          {
                            upsert: true,
                            new: true,
                            setDefaultsOnInsert: true,
                          }
                        );
                      res.status(200).json({
                        success: true,
                        exam_id: examId,
                        status: "fail",
                        result: marks,
                        subject: subjectList[0],
                      });
                    }
                  }
                 
                } else {
                  countMark = countMark + 1;
                  if (countMark == noOfQues) {
                    console.log({ marks, countMark });
                    if (marks >= passing_marks) {
                      const updateMarks =
                        await Detailed_tutorForm1.findOneAndUpdate(
                          { tutor_id: tutorId },
                          {
                            $push: {
                              tutor_exam: {
                                exam_id: examId,
                                subject: subjectList[0],
                                marks: marks,
                                passing_marks: passing_marks,
                                status: "pass",
                              },
                            },
                          },
                          {
                            upsert: true,
                            new: true,
                            setDefaultsOnInsert: true,
                          }
                        );
                      res.status(200).json({
                        success: true,
                        exam_id: examId,
                        status: "pass",
                        result: marks,
                        subject: subjectList[0],
                      });
                    } else {
                      const updateMarks =
                        await Detailed_tutorForm1.findOneAndUpdate(
                          { tutor_id: tutorId },
                          {
                            $push: {
                              tutor_exam: {
                                exam_id: examId,
                                subject: subjectList[0],
                                marks: marks,
                                passing_marks: passing_marks,
                                status: "fail",
                              },
                            },
                          },
                          {
                            upsert: true,
                            new: true,
                            setDefaultsOnInsert: true,
                          }
                        );
                      res.status(200).json({
                        success: true,
                        exam_id: examId,
                        status: "fail",
                        result: marks,
                        subject: subjectList[0],
                      });
                    }
                  }
                }
                console.log({
                  answerSheet: answerFromSheet.data.values[0][0],
                  idSub,
                  answerRowId,
                });
              }
            });
          }
        });
      });

      // if (marks >= 3) {
      //   res.status(200).json({ success: true, status: "pass", result: marks });
      // } else {
      //   res.status(200).json({ success: true, status: "fail", result: marks });
      // }
    } else {
      console.log({ error: "getData not found" });
      res.status(400).json({ error: "In getting data" });
    }
  } catch (err) {
    res.status(400).json({ errorInQues: err });
    console.log({ err });
  }
});

// find exam id
router.post("/find_examId", async (req, res) => {
  let tutorId = req.body.tutorId;
  const tutorForm_object = await Detailed_tutorForm1.findOne(
    { tutor_id: tutorId },
    { tutor_exam: 1, best_subjects: 1 }
  );

  try {
    console.log({ tutorForm_object });
    if (tutorForm_object?.tutor_exam?.length != 0) {
      let examId =
        tutorForm_object.tutor_exam[tutorForm_object.tutor_exam.length - 1]
          ?.exam_id;
      console.log({ examId });
      res.status(200).json({
        examId: examId,
        subjectList: tutorForm_object?.best_subjects,
        success: true,
      });
      console.log("object is there");
    } else {
      res.send({ success: false });
      console.log("objects are not there");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
