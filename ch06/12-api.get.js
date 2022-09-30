const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const tours = [
    { id: 0, name: 'Hood River', price: 99.99 },
    { id: 1, name: 'Oregon Coast', price: 149.95 },
]

app. get('/api/tours', (req. res) => res.json(tours))

app.use('*', (req, res) => res.send('"<a href="/api/tours">/api/tours</a>" page!'))

app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/api/tours\n`))