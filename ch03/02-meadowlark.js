const express = require('express')
const expressHandlevars = require('express-handlebars')
const app =express()

// 핸들바 뷰 엔진 설정
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.use('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => res.render('about'))

// custonm 404 page
app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Sever Error')
})

app.listen(port, () => console.log(
    `Express Started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))