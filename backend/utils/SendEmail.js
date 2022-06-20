const nodeMailer = require('nodemailer');

class SendEmail {
    constructor()
    {
        this.configuration = {
            host : process.env.SMTP_HOST,
            port : process.env.SMTP_PORT,
            secure : false,
            auth : {
                user : process.env.SMTP_USER,
                pass : process.env.SMTP_PASSWORD
            }
        }
        this.transporter = nodeMailer.createTransport(this.configuration);
    }

    async send(emailObj)
    {
        try {
            this.transporter.sendMail({
                from : emailObj.from,
                to : emailObj.to.join(','),
                subject : emailObj.subject,
                text : emailObj.text,
                html : emailObj.html
            })  
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = SendEmail;