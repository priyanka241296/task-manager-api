const sgMail = require("@sendgrid/mail");
// const sendgridAPIKey =
//   "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";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "kulkarnipriyanka2496@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app , ${name} , Let me know how you get along with the app.`,
    html: "<div><h1>Welcome to App </h1>",
  });
};
const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "kulkarnipriyanka2496@gmail.com",
    subject: "Sorry to see you go!",
    text: `GoodBye , ${name}. I hope to see you back sometime soon.`,
  });
};
module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};

// sgMail.send({
//   to: "kulkarnipriyanka2496@gmail.com",
//   from: "kulkarnipriyanka2496@gmail.com",
//   subject: "This is my first creation!",
//   text: "I hope this one actually get to you.",
// });
