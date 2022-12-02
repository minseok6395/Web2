const cluster = require('cluster')

function startWorker() {
    const worker = cluster.fork()
    console.log(`CLUSter: Worker ${worker.id} started`)
}

if(cluster.isMaster){

    require('os').cpus().forEach(startWorker)

    // 연결이 끊어진 워커를 로그에 기록합니다.
    // 연결이 끊어진 워커는 종료(exit)되야 하므로
    // exit 이벤트를 기다렸다가 새 워커를 만듭니다.
    cluster.on('disconnect', worker => console.log(
        `CLUSTER: Worker ${worker.id} disconnected from the cluster.`
    ))

    //워커가 종료되면 이를 대처할 새 워커를 만듭니다.
    cluster.on('exit', (worker, code, signal) => {
        console.log(
            `CLUSTER: Worker ${worker.id} died with exit` +
            `code ${code} (${signal})`
        )
        startWorker()
    })
} else {

    const port = process.env.PORT || 3000
    // 앱을 워커로 시작합니다. meadowlark.js를 보세요.
    require('./01-server.js')(port)
}