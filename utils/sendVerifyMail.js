const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const sgToken = process.env.SENDGRID;

const sendMail = async (email, vfToken) => {
  sgMail.setApiKey(sgToken);

  const vfLink = `http://localhost:3000/api/users/verify/${vfToken}`;
  const msg = {
    to: email,
    from: "michal.kabak218@gmail.com",
    subject: "Verification token",
    text: `Your verification token: ${vfLink}`,
    html: `<b>Your verification token: <a href="${vfLink}">${vfLink}</a></b>`,
  };

  await sgMail.send(msg);
  return;
};

module.exports = { sendMail };
