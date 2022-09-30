const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 3000

// 핸들바 뷰 엔진 설정
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/thank-you', (req, res) => res.render('11-thank-you'))
app.get('/contact-error', (req, res) => res.render('11-contact-error'))

app.get('*', (req, res) => res.render('11-home'))

app.post('/process-contact', (req, res) => {
    try {
        // 여기서 연락처를 데이터베이스나 파일 등의 저장 장소에 보관해야 하지만
        // 일단은 오류만 시뮬레이트합니다.
        if (req.body.simulaeError) throw new Error("error saving contact!")
        console.log(`contact from ${req.body.name} <${req.body.email}`)
        res.format({
            'text/html': () => res.redirect(303, '/thank-you'),
            'application/json': () => res.json({success: ture}),
        })
    } catch(err) {
        // 저장에 문제가 발생했을 경우 여기서 처리합니다.
        console.error(`error processing contact from ${req.body.name}` +
        `<${req.body.email}>`)
        res.format({
            'text/html': () => res.redirect(303, '/contact-error'),
            'applictation/json': () => res.status(500).json({
                error: 'error saving contact information'}),
        })
    }
})
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}\n`))