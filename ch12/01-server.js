const express = require('express')
const expressHandlebars = require('express-handlebars')
const cluster = require('cluster')
const { appendFile, appendFileSync } = require('fs')

const app = express()

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
  }))
app.set('view enging', 'handlebars')

app.use((req, res ,next) => {
    if(cluster.isWorker)
      console.log('Worker ${cluster.worker.id} received request')
    next()
})

app.get('/fail', (req, res) => {
    throw new Error('Nope!')
})

app.get('/epic-fial', (req, res) => {
    process.nextTick(() => {
        throw new Error('Kaboom!')
    })
    res.send('embarrased')
})

app.get('*', (req, res) => res.send('online'))

app.use((err, req, res, next) => {
    console.error(err.message, err.stack)
    res.render('500')
})

process.on('uncaughtException', err => {
    console.error('UNCAUGHT EXCEOTION\n', err.stack);
    process.exit(1)
})

function startServer(port) {
    app.listen(port, function() {
      console.log(`Express started in ${app.get('env')} ` +
        `mode on http://localhost:${port}` +
        `; press Ctrl-C to terminate.`)
    })
}
if(require.main == module) {
    // 애플리케이션을 직접 실행했으므로 앱 서버를 시작합니다.
    startServer(process.env.PORT || 3000)
} else {
    // require를 통해 애플리케이션을 모듈로 임포트했습니다.
    // 서버를 생성하는 함수를 내보냅니다.
    module.exports = startServer
}