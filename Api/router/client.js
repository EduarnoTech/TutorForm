const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = require("../middleware/filesave");
const upload2 = require("../middleware/filesave2");
const Multer=multer()

const { client_req, SessionReq, findForm} = require("../controllers/client");
const { tutorForm1,email_check,find_tutorId,info} = require("../controllers/regForm");
router.route("/client").post( client_req);
router.route("/addSession").post (upload.array('files[]'),SessionReq);
router.route("/tutor_save").post( upload2.fields([{name:'panFile',maxCount:4},{name:'highestDegreeFile',maxCount:4}]),tutorForm1);
router.route("/email_check").post(email_check);
router.route("/find_tutorId").get(find_tutorId);
router.route("/info").get(info)
module.exports = router;
