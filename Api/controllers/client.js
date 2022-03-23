const mongoose = require("mongoose");
const Client_form1 = require("../models/client_form1");
const liveSession = require("../models/liveSessionDb");
const SignUp = require("../models/signUp.js");
const path = require("path");

exports.client_req = async (req, res) => {
  const Client = new Client_form1({
    description: req.body.description,
    // email:req.body.email,
    // whatsapp:req.body.whatsapp,
    deadline: req.body.deadline,
    subject: req.body.subject,
    email: req.body.email,

    // file:req.file.path
  });

  // var files = [];
  // var fileKeys = Object.keys(req.files);

  if (req.files) {
    let Path = " ";

    req.files.forEach(function (file, index, arr) {
      Path = Path + file.path + ",";
    });

    Path = Path.substring(0, Path.lastIndexOf(","));
    // Path1 = Path1.substring(0, Path1.lastIndexOf(","));
    Client.quesFile = Path;
    // Client.refMaterial = Path1;

    // per.file=req.file.path;
  }
  try {
    const newV = await Client.save();
    console.log(newV);
    res.status(200).json(newV);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.refMaterial = async (req, res) => {
  const id1 = req.body.id1;
  if (req.files) {
    var Path2 = " ";
    req.files.forEach(function (file, index, arr) {
      Path2 = Path2 + file.path + ",";
    });
    Path2 = Path2.substring(0, Path2.lastIndexOf(","));
    // Client.refMaterial = Path;

    // per.file=req.file.path;
  }

  try {
    const result = await Client_form1.findOneAndUpdate(
      { _id: id1 },
      {
        refMaterial: Path2,
        // password:req.body.password
      }
    );

    console.log("result:", result);
    res.status(200).send(result);
    console.log("working profile backend");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    console.log("not_working backend profile");
  }
};

exports.liveSessionReq = async (req, res) => {
  const liveClient = new liveSession({
    description: req.body.description,
    deadline: req.body.deadline,
    dates: req.body.dates,
    subject: req.body.subject,
    email: req.body.email,
  });

  if (req.files) {
    let Path = " ";
    req.files.forEach(function (file, index, arr) {
      Path = Path + file.path + ",";
    });
    Path = Path.substring(0, Path.lastIndexOf(","));
    liveClient.refMaterial = Path;
  }
  try {
    const newV = await liveClient.save();
    console.log(newV);
    res.status(200).json(newV);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.signUp = async (req, res) => {
  const signClient = new SignUp({
    username: req.body.username,
    email: req.body.email1,
    phone: req.body.phone,
    password: req.body.password,
  });

  try {
    const newV = await signClient.save();
    console.log(newV);
    console.log("working");
    res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    console.log("not_working");
  }
};

exports.signIn = async (req, res) => {
  const email = req.body.email1;

  const password = req.body.password;
  // console.log(email)
  // console.log(password)

  const username = await SignUp.findOne({ email: email });
  const ismatch = await username.matchPassword(password);

  try {
    if (username.email === email) {
      if (ismatch) {
        res.send({ success: true, id9: username._id });
        // console.log(id9)
        console.log("logged in");
      } else {
        res.send({ success: false });
        console.log("Invalid Login Details 1");
      }
    } else {
      res.send({ success: false });
      console.log("Invalid Login Details 2");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    console.log("not_working");
  }
};

exports.history = async (req, res) => {
  const email = req.body.email;
  console.log({ email: email });
  try {
    const username = await Client_form1.find({ email: email });
    if (username) {
      res.send(username);
      console.log(username);
    } else {
      res.status(400);
      console.log("not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    console.log("not_working");
  }
};

exports.live_history = async (req, res) => {
  const email = req.body.email;
  try {
    const username = await liveSession.find({ email: email });
    if (username) {
      res.send(username);
      console.log(username);
    } else {
      res.status(400);
      console.log("not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    console.log("not_working");
  }
};

exports.profile = async (req, res) => {
  const email = req.body.email;
  const id=req.body.id;

  try {
    const result = await SignUp.findOneAndUpdate(
      { _id:id},
      {
        username: req.body.name,
        university: req.body.university,
        dateOfBirth: req.body.dateOfBirth,
        watsNumber: req.body.watsNumber,
        timezone: req.body.timezone,
        // password:req.body.password
      }
    );

    console.log("result:", result);
    res.status(200).send(result);
    console.log("working profile backend");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    console.log("not_working backend profile");
  }
};

exports.profile1 = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await SignUp.findOneAndUpdate(
      { email: email },
      {
        password: password,
      }
    );

    console.log("result:", result);

    res.status(200).json({ success: true });

    console.log("working profile1 backend");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    console.log("not_working backend profile1");
  }
};

exports.checkPassword = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  console.log("chalu to ho");
  try {
    const result = await SignUp.findOne({ email: email });
    console.log(result);

    if (result.password === password) {
      res.send({ success: true });
      console.log("password is correct");
    } else {
      console.log("password is incorrect");
    }

    //  res.status(200).send(result);
    console.log("working check password is working");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    console.log("not_working backend checkpassword");
  }
};

exports.getPhone = async (req, res) => {
  let email = req.body.email;

  console.log("chalu to ho");
  try {
    const result = await SignUp.findOne({ email: email });
    console.log(result);
    res.status(200).json(result);

    console.log("phone working");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    console.log("getphone not working");
  }
};

exports.checkId = async (req, res) => {
  let id = req.body.id;
  let email = req.body.email;
  console.log({ recent: id });
  if (id) {
    console.log("chalu to ho");
    try {
      const result = await SignUp.findOne({ _id: id });
      console.log(result);
      if (result) {
        if (email === result.email) {
          res.status(200).json({ success: true });
        }
      } else {
        res.send({ success: false });
      }

      console.log("id working");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      console.log("getid not working");
    }
  } else {
    res.send({ success: false });
  }
};
