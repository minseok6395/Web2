const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

const port = process.env.PORT || 3000

// 핸들바 뷰 엔진 설정
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) =>{
    res.render('09-home')
})

app.get('/page1', (req, res) =>{
    res.render('09-page', {page: 1})
})

app.get('/page2', (req, res) =>{
    res.render('09-page', {page: 2})
})

app.get('/page3', (req, res) =>{
    res.render('09-page', {page: 3})
})

app.get('/page4', (req, res) =>{
    res.render('09-page', {page: 4})
})

// 이 핸들러는 반드시 라우트 마지막에 있어야 합니다.
app.use((req, res) =>
res.status(404).render('404'))

app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}\n`))