const sgMail = require('@sendgrid/mail')
const credentials = require('./credentials')
const api_key = process.env.SENDGRID_API_KEY || credentials.sendgrid.password
sgmMail.setApiKey(api_key)

const msg = {
    to: 'minseok6395@naver.com',
    from: 'minseok6395@naver.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'send using Node.js at home PC.',
    html: '<strong>sent using Node.js at home PC.</strong>',
}

sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })