const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.disable('x-powered-by')

app.listen(port, () => {
    console.log( `Express started on http://localhost:${port}` +
    '; press Ctrl-C to terminate.')
})