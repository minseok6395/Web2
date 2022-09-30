const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

const port = process.env.PORT || 3000

// 핸들바 뷰 엔진 설정
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

// 레이아웃 파일 view/layouts/custom.handlebars를 사용합니다.
app.get('/custom-layout', (req, res) =>
  res.render('custom-layout', {layout: 'custom'})
)

app.get('*', (req, res) => res.send('"<a href="/custom-layout">custom-layout</a>" page!'))

app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/custom-layout\n`))