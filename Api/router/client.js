const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = require("../middleware/filesave");
const upload2 = require("../middleware/filesave2");

const { client_req, liveSessionReq, signUp,signIn ,history,live_history,profile,profile1,checkPassword,getPhone,refMaterial,checkId} = require("../controllers/client");

router.route("/C1").post(upload.array("quesFile"), client_req);
router.route("/refMaterial").post(upload2.array("refMaterial"), refMaterial);
router.route("/C2").post(upload.array("refMaterial"), liveSessionReq);
router.route("/history").post(history);
router.route("/liveHistory").post(live_history);
router.route("/signUp").post(signUp);
router.route("/signIn").post(signIn);
router.route("/profile").post(profile);
router.route("/profile1").post(profile1);
router.route("/getPhone").post(getPhone);
router.route("/checkId").post(checkId);
router.route("/checkPassword").post(checkPassword);
// router.route("/Tutor ")

// router.route("/C1").post(client_req);

module.exports = router;
