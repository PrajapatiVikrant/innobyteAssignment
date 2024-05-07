const nodemailer = require("nodemailer");

let sendEmail = (userEmail, message) => {
    // Create a Nodemailer transporter using SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'luz.sawayn81@ethereal.email',
            pass: 'JJkrNyzkrHdra6ZvVQ'
        }
    });

    // Define email options
    let mailOptions = {
        from: "prajapativikrant2020@gmail.com",
        to: userEmail,
        subject: "Vikrant InnoByte assignment",
        text: message,
        html: "<h1>" + message + "</h1>",
    };

    // Return a Promise
    return new Promise((resolve, reject) => {
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                reject({ success: false, message: error });
            } else {
                console.log("Email sent: " + info.response);
                resolve({ success: true, message: "Email sent successfully" });
            }
        });
    });
};

module.exports = sendEmail;
