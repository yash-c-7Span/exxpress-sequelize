const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "f5c0efcaca8de7",
        pass: "f0b0ef799a8b7b"
    }
});

const formMail = "test@gmail.com";

async function sendMail(data){
    let info = await transport.sendMail({
        from:formMail,
        to:data.to,
        subject:data.subject,
        text:data.text,
        html:data.html
    });

    return info;
}

module.exports = {
    sendMail
}