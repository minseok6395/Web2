const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

const port = process.env.PORT || 3000

// 핸들바 뷰 엔진 설정
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.get('/bad-bad-not-good', (req, res) => {
    throw new Error("that didn't go well")
})

app.get('*', (req, res) => res.render('08-click-here'))

// 이 핸들러는 반드시 라우트 마지막에 있어야 합니다.
// next 함수를 사용하지 않더라도 매개변수로 써야만
// 익스프레스가 이 핸드러를 오류 핸들러로 인식합니다.
app.use((err, req, res, next) => {
    console.error('** SERVER ERROR: ' + err.message)
    res.status(500).render('08-error',
      {message: "you shouldn't have clicked that!"})
})

app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}\n`))