const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

const port = process.env.PORT || 3000

// 핸들바 뷰 엔진 설정
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

// 다음 레이아웃은 해당항하는 레이아웃 파일이 없으므로
// views/no-layout.handlebars에 필요한 HTML이 모두 있어야 합니다.
app.get('/no-layout', (req, res) =>
res.render('no-layout', {layout: null})
)

app.get('*', (req, res) => res.send('"<a href="/no-layout">no-layout</a>" page!'))

app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/no=layout\n`))