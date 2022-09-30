const express = require('express')
const app = express()

const port = process.env.PORT || 3000

// 레이아웃 파일 view/layouts/custom.handlebars를 사용합니다.
app.get('/text', (req, res) => {
    res.type('text/plain')
    res.send('this is a test')
})

app.get('*', (req, res) => res.send('"<a href="/text">plain text</a>" page!'))

app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/text\n`))