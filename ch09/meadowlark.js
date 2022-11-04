const express = require('express')
const expressHandlebars = require('express-handlebars')
const multiparty = require('multiparty')
const cookieParser = require('cookie-parsers')

const handlers = require('./lib/handlers')
const weatherMiddlware = require('./lib/middleware/weather')
const flashMiddleware = require('./lib/middleware/flash')

const app = express()

const port = process.env.PORT || 3000

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    },
}))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'))
app.use(express.static(__dirname + '/node_modules/jquery/dist'))
app.use(express.static(__dirname + '/node_modules/popper.js/dist'))

app.use(weatherMiddlware)
app.use(flashMiddleware)

app.get('/', handlers.home)

app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

app.get('/contest/vacation-photo', handlers.vacationPhotoContest)
app.get('/contest/vacation-photo-ajax', handlers.vacationPhotoContestAjax)
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if(err) return handlers.vacationPhotoContestProcessError(req, res, err.message)
        console.log('got fields: ', fields)
        console.log('and files: ',files)
        handlers.vacationPhotoContestProcess(req, res, fields, files)
    })
})
app.get('/contest/vacation-photo-thank-you', handlers.vacationPhotoContestProcessThankYou)
app.post('/contest/vacation-photo-contest/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if(err) return handlers.api.vacationPhotoContestError(req, res, err.messeage)
        handlers.api.vacationPhotoContest(req, res, fields, files)
    })
})

app.use(handlers.notFound)
app.use(handlers.serverError)

if (require.main === module) {
    app.listen(port, () => {
        console.log( `Express started on http://localhost:${port}` +
        '; press Ctrl-C to terminate...')
    })
} else {
    module.exports = app
}