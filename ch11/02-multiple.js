const sgMail = require('@sendgrid/mail')
const credentials = require('./credentials')
const api_key = process.env.SENDGRID_API_KEY || credentials.sendgrid.password
sgMail.setApiKey(api_key)

const msg = {
  to: ['minseok6395@naver.com', 'minseok030426@gmail.com'],
  from: 'minseok6395@naver.com',
  subject: 'Sendgin to multiple recipants',
  text: 'sent using Node.js at home PC.',
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