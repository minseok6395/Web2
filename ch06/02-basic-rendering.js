const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

const port = process.env.PORT || 3000

// 핸들바 뷰 엔진 설정
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('*', (req, res) => res.send('"<a href="/about">About</a>" page!'))

app.listen(port, () => console.log(`Express started on http://localhost:${port}/about\n` +
'; press Ctrl-C to terminate.'))