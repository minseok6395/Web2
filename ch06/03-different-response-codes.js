const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

const port = process.env.PORT || 3000

// 핸들바 뷰 엔진 설정
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.get('/error', (req, res) => {
    res.status(500)
    res.render('error')
})

app.get('*', (req, res) => res.send('"<a href="/error">error</a>" page!'))

app.listen(port, () => console.log(`Express started on http://localhost:${port}/error\n` +
'; press Ctrl-C to terminate.'))