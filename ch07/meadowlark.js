const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()
const handlers = require('./lib/handlers')
const weatherMiddlware = require('./lib/middleware/weather')

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

app.use(express.static(__dirname + '/public'))

app.use(weatherMiddlware)

app.get('/', handlers.home)
app.get('/section-test', handlers.sectionTest)

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

