const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

const port = process.env.PORT || 3000

// 핸들바 뷰 엔진 설정
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.get('/greeting', (req, res) => {
    res.render('greeting', {
        message: 'Hello estteemed programmer!',
        style: req.query.style,
        useridd: req.cookies.userid,
        username: req.session.username
    })
})

app.get('/set-random-userid', (req, res) => {
    res.cookie('userid', (Math.random()*10000).toFixed(0))
    res.redirect('/greeting')
})
  
app.get('/set-random-username', (req, res) => {
    req.session.username = catNames.random()
    res.redirect('/greeting')
})

app.get('*', (req, res) => res.send('"<a href="/greeting">greeting</a>" page!'))

app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/greeting\n`))