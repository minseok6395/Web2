const { render } = require("../meadowlark")

exports.api = {}

exports.home = (req, res) => res.render('home')

exports.newsletterSignup = (req,res) => {
    //CSRF에 대해서는 나중에 알아봅니다. 지금은 일단 더미 값을 넣어둡니다.
    res.render('newsletter-signup', {csrf: 'CSRF token goes here'})
}
exports.newsletterSignupProcess = (req, res) => {
    console.log('Form (from querystring): ' + req.query.form)
    console.log('CSRF token (from hidden fom filed): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form filed): ' + req.body.email)
}
exports.newsletterSignupThankYou = (req, res) =>
    res.render('newsletter-signup-thank-you')

exports.vacationPhotoContest = (req, res) => {
    const now = new Date()
    res.render('contest/vacation-photo', { year: now.getFullYear(), month: now.getMonth() })
}
      exports.vacationPhotoContestAjax = (req, res) => {
    const now = new Date()
    res.render('contest/vacation-photo-ajax', { year: now.getFullYear(), month: now.getMonth() })
}
      
exports.vacationPhotoContestProcess = (req, res, fields, files) => {
    console.log('field data: ', fields)
    console.log('files: ', files)
    res.redirect(303, '/contest/vacation-photo-thank-you')
}
exports.vacationPhotoContestProcessError = (req, res, fields, files) => {
    res.redirect(303, '/contest/vacation-photo-error')
}
exports.vacationPhotoContestProcessThankYou = (req, res) => {
    res.render('contest/vacation-photo-thank-you')
}
exports.api.vacationPhotoContest = (req, res, fields, files) => {
    console.log('field data: ', fields)
    console.log('files: ', files)
    res.send({ result: 'success' })
}
exports.api.vacationPhotoContestError = (req, res, message) => {
    res.send({ result: 'error', error: message })
}

exports.newsletter = (req, res) => {
    //CSRF에 대해서는 나중에 알아봅니다. 지금은 일단 더미 값을 넣어둡니다.
    res.render('newsletter', {csrf: 'CSRF token goes here'})
}
exports.api = {
    newsletterSignup: (req,res) => {
        console.log('CSRF token (form hidden form field): ' + req.body._csrf)
        console.log('NAme (form visible form field): ' + req.body. name)
        console.log('Email (form visible form field): ' + req.body.meail)
        res.send({ result: 'success'})
    },
}

exports.notFound = (req ,res) => res.render('404')

exports.serverError = (err, req, res, next) => res.render('500')