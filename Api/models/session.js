const { file } = require("googleapis/build/src/apis/file");
const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const Session = new mongoose.Schema(
  {
    session_id: {
      type: String,
      unique: true,
    },
    client_id: {
      type: String,
      default: null,
    },
    client_files: { type: String, default: null },
    client_comments: { type: String, default: null },
    agent_name: {
      type: String,
      default: null,
    },
    device_id: {
      type: String,
      default: null,
    },
    branch: {
      type: String,
      default: null,
    },
    subject: {
      type: String,
      default: null,
    },
    deadline: {
      type: String,
      default: null,
    },
    duration: {
      type: String,
      default: null,
    },
    // assigned_tutors: Array,
    // notified_tutors: Array,
    client_amount: {
      type: String,
      default: null,
    },
    work_status: {
      type: String,
      default: null,
    },
    // amount_received: Number,
    // amount_remaining: Number,
    currency: {
      type: String,
      default: null,
    },
    rating_client: {
      type: String,
      default: null,
    },
    session_status: {
      type: String,
      default: null,
    },
    client_payment_status: {
      type: String,
      default: null,
    },
    agent_comments: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    tutor_pay_total: {
      type: String,
      default: null,
    },

    filelink: {
      type: Array,
      default: null,
    },
    tutor_Interested: {
      type: Array,
      default: null,
    },
    active: Boolean,
  },



  { timestamps: true }
);

module.exports = mongoose.model("session", Session);
