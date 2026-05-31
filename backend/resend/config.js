const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_MEETING_MANAGER_API_KEY);

module.exports = resend;
