const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.json())

const tours = [
    { id: 0, name: 'Hood River', price: 99.99 },
    { id: 1, name: 'Oregon Coast', price: 149.95 },
]

app.get('/api/tours', (req, res) => res.json(tours))

app.delete('/api/tour/:id', (req, res) => {
    const idx = tours.findIndex(tour => tour.id === parseInt(req.params.id))
    if(idx < 0) return res.json({ error: 'No such tour exists.' })
    tours.splice(idx, 1)
    res.json({ success: true })
  })

  app.use('*', (req, res) => res.send('"<a href="/api/tours">/api/tours</a>" page!' +
  `<pre>` +
  `GET /api/tours\n` +
  `PUT /api/tour/0 with JSON body { "price": 129.99 }\n` +
  `GET /api/tours`))
  
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/api/tours\n`))