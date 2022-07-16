'use strict'

const express = require('express')

/* Set constants. */
const HOST = '0.0.0.0'
const PORT = 4000

/* Initialize application. */
const app = express()

/* Initialize JSON parser. */
app.use(express.json())

/* Initialize URL parser. */
app.use(express.urlencoded({ extended: true }))

/* Configure application. */
app.use(function (req, res, next) {
    /* Initialize headers. */
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT')
    res.header('Access-Control-Allow-Headers', 'content-type') // superagent bug fix

    /* Move to next process. */
    next()
})

/* Build welcome message. */
const welcome = `
<html>
<body>

<h2>Welcome to the Subnet Builders API</h2>
<h3>https://api.subnet.builders</h3>

</body>
</html>
`

// TODO: Replace with a "static" site.
app.get('/', (req, res) => {
    res.end(welcome)
})

/* Initialize Dashboard route. */
app.get('/v1/dashboard/:sessionid', require('./routes/dashboard'))

/* Initialize Authorization route. */
// app.get('/v1/auth', require('./routes/auth'))
app.post('/v1/auth', require('./routes/auth'))

/* Initialize Brokers route. */
app.get('/v1/brokers/:id', require('./routes/brokers'))
app.get('/v1/brokers', require('./routes/brokers'))
app.post('/v1/brokers', require('./routes/brokers'))

/* Initialize Subnets route. */
app.get('/v1/logs', require('./routes/logs'))

/* Initialize Sessions route. */
app.get('/v1/sessions', require('./routes/sessions'))
app.post('/v1/sessions', require('./routes/sessions'))
app.post('/v1/sessions/veriff', require('./routes/sessions/veriff'))

// TODO: Offer help.
app.get('/v1', (req, res) => {
    res.end('Oops! I think you forgot something.')
})

/* Start listening for connections. */
app.listen(PORT, HOST)

/* Display current environment variables. */
console.info()
console.log(`Running on http://${HOST}:${PORT}`)
console.info()
console.info('Current Environment Variables')
console.info('-----------------------------')
console.info('  - NODE_ENV           :', process.env.NODE_ENV)
console.info('  - API_ENDPOINT       :', process.env.API_ENDPOINT)
console.info()
