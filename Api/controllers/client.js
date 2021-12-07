const mongoose = require("mongoose");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);
// var streamBuffers = require("stream-buffers");

const Session = require("../models/session.js");
const Client = require("../models/clientSchema.js");

const { google } = require("googleapis");
const path = require("path");
// const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config("../config/config.env");
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// findform api

exports.findForm = async (req, res) => {
  let clientId = req.body.clientId;
  let sessionId = req.body.sessionId;
  console.log(clientId);

  console.log("chalu to ho");
  try {
    const result = await Client.findOne({ client_id: clientId });
    const result1 = await Session.findOne({ session_id: sessionId });

    var formResult = {
      name: result.client_name,
      email: result.email,
      username: result.socialmedia.username,
      university: result.university,
      semester: result.semester,
      branch: result.branch,
      subject: result1.subject,
      date_time: result1.deadline,
      duration: result1.duration,
      timezone: result.timezone,
      type: result1.type,
      // comments: result1.client_comments
    };

    // console.log({ formResult: formResult });
    res.send(formResult);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    console.log("findform not working");
  }
};

// update client Api

exports.client_req = async (req, res) => {
  const clientId = req.body.whatsapp;

  try {
    const result = await Client.findOneAndUpdate(
      { client_id: clientId },
      {
        client_id: clientId,
        whatsapp: req.body.whatsapp,
        client_name: req.body.name,
        university: req.body.university,
        semester: req.body.semester,
        branch: req.body.branch,
        email: req.body.email,
        timezone: req.body.timezone,
        socialmedia: {
          // "platform":req.body.socialmedia.platform,
          username: req.body.fb_username,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    // console.log("result:", result);

    res.status(200).json({ success: true });

    console.log("working client backend");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    console.log("not_working client");
  }
};

// updata session API

exports.SessionReq = async (req, res) => {
  var clientId = req.body.clientId;
  var sessionId = req.body.sessionId;
  const type = req.body.type;
  console.log({ sessionId1: sessionId });
  console.log({ clientId1: clientId });
  // try {
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

  var fileName = "";
  let filelink = [];

  if (req.files) {
    // console.log({ reqfiles: req.files });

    try {
      var clientFolderSearch = await drive.files.list({
        q: `mimeType='application/vnd.google-apps.folder' and name='Client-${clientId}'`,
        fields: "files(id,name)",
      });

      console.log({ create3: clientFolderSearch.data.files });
      // try {
      var ClientFolder = clientFolderSearch.data.files[0];

      // SEARCHING FOR SESSION FOLDER

      if (clientFolderSearch.data.files.length !== 0) {
        var sessionFolderSearch = await drive.files.list({
          q: ` name='Session-${sessionId}' and '${ClientFolder.id}' in parents`,
          fields: "files(id,name)",
        });
        console.log({ sessionisthere: sessionFolderSearch.data.files });

        if (sessionFolderSearch.data.files.length !== 0) {
          //UPLOADING FILE INTO GOOGLE DRIVE 1st

          req.files.forEach(async (file, index, arr) => {
            fileName = fileName + file.originalname + ",";

            const filePath = file.path;
            var response = await drive.files.create({
              requestBody: {
                name: `${file.originalname}_${type}--${clientId}/${sessionId}`,
                mimeType: file.mimeType,
                parents: [sessionFolderSearch.data.files[0].id],
              },
              media: {
                mimeType: file.mimeType,
                body: fs.createReadStream(filePath), //myReadableStreamBuffer,
              },
            });
            console.log({ DriveData: response.data });
            let fileId = response.data.id;

            await drive.permissions.create({
              fileId: fileId,
              requestBody: {
                role: "reader",
                type: "anyone",
              },
            });
            drive.files
              .get({
                fileId: fileId,
                fields: "webViewLink,webContentLink",
              })
              .then(async (resUrl) => {
                // console.log({ resUrl });
                // try {
                let weblink = resUrl.data.webViewLink;

                filelink.push(weblink);
                const result = await Session.findOneAndUpdate(
                  { session_id: sessionId },
                  {
                    // "sessionId":sessionId,
                    client_id: clientId,
                    session_id: sessionId,
                    client_files: fileName,
                    filelink: filelink,
                    client_comments: req.body.client_comments,
                    agent_name: req.body.agent_name,
                    device_id: req.body.device_id,
                    branch: req.body.branch,
                    subject: req.body.subject,
                    deadline: req.body.date_time,
                    duration: req.body.duration,
                    assigned_tutors: req.body.assigned_tutors,
                    notified_tutors: req.body.notified_tutors,
                    client_amount: req.body.client_amount,
                    work_status: req.body.work_status,
                    amount_received: req.body.amount_received,
                    amount_remaining: req.body.amount_remaining,
                    currency: req.body.currency,
                    rating_client: req.body.rating_client,
                    session_status: req.body.session_status,
                    client_payment_status: req.body.client_payment_status,
                    agent_comments: req.body.agent_comments,
                    type: type,
                    active: req.body.active,
                  },
                  {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true,
                  }
                );
                console.log("result:", result);

                // res.send({ success: true });

                console.log("working session backend");
               
              });

            await unlinkAsync(filePath);
            console.log("file deleted from disk");
            console.log({ filelink11: filelink });
          });
        } else {
          var createSessioFolder = await drive.files.create({
            resource: {
              name: `Session-${sessionId}`,
              mimeType: "application/vnd.google-apps.folder",
              parents: [ClientFolder.id],
            },
            fields: "id",
          });

          //UPLOADING FILE INTO GOOGLE DRIVE 2nd
          req.files.forEach(async (file, index, arr) => {
            fileName = fileName + file.originalname + ",";

            const filePath = file.path;
            var response = await drive.files.create({
              requestBody: {
                name: `Refrence_Material_${type}--${clientId}/${sessionId}`,
                mimeType: file.mimeType,
                parents: [createSessioFolder.data.id],
              },
              media: {
                mimeType: file.mimeType,
                body: fs.createReadStream(filePath),
              },
            });

            console.log({ DriveData: response.data });
            let fileId = response.data.id;

            await drive.permissions.create({
              fileId: fileId,
              requestBody: {
                role: "reader",
                type: "anyone",
              },
            });
            drive.files
              .get({
                fileId: fileId,
                fields: "webViewLink,webContentLink",
              })
              .then(async (resUrl) => {
                // console.log({ resUrl });
                // try {
                let weblink = resUrl.data.webViewLink;

                filelink.push(weblink);
                const  result = await Session.findOneAndUpdate(
                  { session_id: sessionId },
                  {
                    // "sessionId":sessionId,
                    client_id: clientId,
                    session_id: sessionId,
                    client_files: fileName,
                    filelink: filelink,
                    client_comments: req.body.client_comments,
                    agent_name: req.body.agent_name,
                    device_id: req.body.device_id,
                    branch: req.body.branch,
                    subject: req.body.subject,
                    deadline: req.body.date_time,
                    duration: req.body.duration,
                    assigned_tutors: req.body.assigned_tutors,
                    notified_tutors: req.body.notified_tutors,
                    client_amount: req.body.client_amount,
                    work_status: req.body.work_status,
                    amount_received: req.body.amount_received,
                    amount_remaining: req.body.amount_remaining,
                    currency: req.body.currency,
                    rating_client: req.body.rating_client,
                    session_status: req.body.session_status,
                    client_payment_status: req.body.client_payment_status,
                    agent_comments: req.body.agent_comments,
                    type: type,
                    active: req.body.active,
                  },
                  {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true,
                  }
                );
                console.log("result:", result);
               

                console.log("working session backend");
              });
              

            await unlinkAsync(filePath);
            console.log("file deleted from disk");
          });
          
        }
      } else {
        var createClientFolder = await drive.files.create({
          resource: {
            name: `Client-${clientId}`,
            mimeType: "application/vnd.google-apps.folder",
          },
          fields: "id",
        });
        var createSessionFolder = await drive.files.create({
          resource: {
            name: `Session-${sessionId}`,
            mimeType: "application/vnd.google-apps.folder",
            parents: [createClientFolder.data.id],
          },
          fields: "id",
        });

        //UPLOADING FILE INTO GOOGLE DRIVE 3rd
        req.files.forEach(async (file, index, arr) => {
          fileName = fileName + file.originalname + ",";
          const filePath = file.path;
          var response = await drive.files.create({
            requestBody: {
              name: `Refrence_Material_${type}--${clientId}/${sessionId}`,
              mimeType: file.mimeType,
              parents: [createSessionFolder.data.id],
            },
            media: {
              mimeType: file.mimeType,
              body: fs.createReadStream(filePath),
            },
          });
          console.log({ DriveData: response.data });

          let fileId = response.data.id;

          await drive.permissions.create({
            fileId: fileId,
            requestBody: {
              role: "reader",
              type: "anyone",
            },
          });
          drive.files
            .get({
              fileId: fileId,
              fields: "webViewLink,webContentLink",
            })
            .then(async (resUrl) => {
              // console.log({ resUrl });
              // try {
              let weblink = resUrl.data.webViewLink;

              filelink.push(weblink);
              const result = await Session.findOneAndUpdate(
                { session_id: sessionId },
                {
                  // "sessionId":sessionId,
                  client_id: clientId,
                  session_id: sessionId,
                  client_files: fileName,
                  filelink: filelink,
                  client_comments: req.body.client_comments,
                  agent_name: req.body.agent_name,
                  device_id: req.body.device_id,
                  branch: req.body.branch,
                  subject: req.body.subject,
                  deadline: req.body.date_time,
                  duration: req.body.duration,
                  assigned_tutors: req.body.assigned_tutors,
                  notified_tutors: req.body.notified_tutors,
                  client_amount: req.body.client_amount,
                  work_status: req.body.work_status,
                  amount_received: req.body.amount_received,
                  amount_remaining: req.body.amount_remaining,
                  currency: req.body.currency,
                  rating_client: req.body.rating_client,
                  session_status: req.body.session_status,
                  client_payment_status: req.body.client_payment_status,
                  agent_comments: req.body.agent_comments,
                  type: type,
                  active: req.body.active,
                },
                {
                  upsert: true,
                  new: true,
                  setDefaultsOnInsert: true,
                }
              );
              console.log("result:", result);
              console.log("working session backend");
            });

          await unlinkAsync(filePath);
          console.log("file deleted from disk");
        });
       
      }
     
    } catch (err) {
      console.log("DRIVE HAVE SOME ERROR");
      res.send(err);
    }
  } else {
    console.log("No file is added");
  }

  console.log({ filelink: filelink });
  
};
