const nodemailer = require('nodemailer')

const credentials = require('./credentials')

const mailTransport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    auth: {
        user: credentials.sendgrid.user,
        pass: credentials.sendgrid.password,
    },
})

async function go() {
    try {
        const result = await mailTransport.sendgrid({
            from: '"Meadowlar Travel" <minseok6395@naver.com)',
            to: 'minseok6395@naver.com, minseok030426@gmail.com',
            subject: 'Your Meadowlark Travel Tour',
            html: '<h1>Meadowlark Travel</h1>\n<p>Thanks for book your trip with ' +
               'Meadowlark Travel.  <b>We look forward to your visit!</b>',
            text: 'Thank you for booking your trip with Meadowlark Travel.  ' +
               'We look forward to your visit!',
        })
        console.log('mail sent successfully: ', result)
    } catch(err) {
        console.log('could not send mail: ' + err.message)
    }
}

go()