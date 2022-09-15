const express = require('express')
const app =express()
const port = preocess.env.PORT || 3000

// custonm 404 page
app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})

// custom 500 page
app.use(err, (req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Sever Error')
})

app.listen(port, () => console.log(
    `Express Started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))