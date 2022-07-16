/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const { v4: uuidv4 } = require('uuid')
const util = require('util')

/* Initialize databases. */
const logsDb = new PouchDB('http://api:XXX@localhost:5984/logs')
const sessionsDb = new PouchDB('http://api:XXX@localhost:5984/sessions')

/**
 * Sessions Module
 */
const sessions = async function (req, res) {
    // console.log('SESSIONS BODY', req.body)

    let results

    const body = req.body

    /* Validate body. */
    if (body) {
        const id = uuidv4()
        const createdAt = moment().unix()

        const pkg = {
            _id: id,
            src: 'sessions',
            ...body,
            createdAt,
        }

        results = await logsDb.put(pkg)
            .catch(err => console.error('LOGS ERROR:', err))
    }

    const person = body.person

    const document = body.document

    const vendorData = body.vendorData

    // Timestamp format => YYYY-MM-DDTHH:MM:S+Timezone Offset|Z or UTC

    if (req.method === 'GET') {
        /* Request owner. */
        results = await sessionsDb.query('api/justCreated', {
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
        // console.log('RESULT (justCreated)', util.inspect(results, false, null, true))

        if (results.rows && results.rows.length) {
            const sessions = results.rows.map(_session => {
                return _session.doc
            })

            // FIXME: Add pagination (limit/skip).
            const slice = sessions.slice(0, 100)

            return res.json(slice)
        }

        res.end('error!')

    } else if (req.method === 'POST') {
        const id = uuidv4()
        const createdAt = moment().unix()

        const pkg = {
            _id: id,
            ...body,
            createdAt,
        }

        /* Retrieve results. */
        results = await sessionsDb.put(pkg)
            .catch(err => {
                console.error('SESSION ERROR:', err)

                /* Set status. */
                res.status(400)

                /* Return error. */
                return res.json(err)
            })
        // console.log('RESULT (sessions)', util.inspect(results, false, null, true))

        return res.json(results)

    }

    /* Return params. */
    res.end('session error!')
}

/* Export module. */
module.exports = sessions
