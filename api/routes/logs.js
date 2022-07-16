/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const { v4: uuidv4 } = require('uuid')
const util = require('util')

/* Initialize databases. */
const logsDb = new PouchDB('http://api:XXX@localhost:5984/logs')

/**
 * Sessions Module
 */
const logs = async function (req, res) {
    console.log('SESSIONS BODY', req.body)

    const body = req.body

    let results

    /* Request owner. */
    results = await logsDb.query('api/justCreated', {
        // key: ownerSlug,
        include_docs: true,
        descending: true,
    })
    .catch(err => {
        console.error('SESSION ERROR:', err)

        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json(err)
    })
    console.log('RESULT (justCreated)', util.inspect(results, false, null, true))

    if (results.rows && results.rows.length) {
        const logs = results.rows.map(_session => {
            return _session.doc
        })

        // FIXME: Add pagination (limit/skip).
        const slice = logs.slice(0, 100)

        return res.json(slice)
    }

    res.end('error!')

}

/* Export module. */
module.exports = logs
