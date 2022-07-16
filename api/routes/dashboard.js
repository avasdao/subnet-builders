/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const { v4: uuidv4 } = require('uuid')
const util = require('util')

/* Initialize databases. */
const subnetsDb = new PouchDB('http://api:XXX@localhost:5984/subnets')
const messagesDb = new PouchDB('http://api:XXX@localhost:5984/messages')
const sessionsDb = new PouchDB('http://api:XXX@localhost:5984/sessions')

/**
 * Dashboard Module
 */
const dashboard = async function (req, res) {
    let results

    // TODO: Allow searching based on broker EMAIL.

    /* Request owner. */
    results = await subnetsDb.query('api/justCreated', {
        // key: ownerSlug,
        include_docs: true,
    })
    .catch(err => {
        console.error('DASHBOARD ERROR:', err)
    })
    console.log('RESULT (justCreated)', util.inspect(results, false, null, true))

    if (!results) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json([])
    }

    let numSubnets = 0
    let totalSubnetValue = 0

    if (results.rows && results.rows.length) {

        numSubnets = results.rows.length

        results.rows.forEach(_entry => {
            /* Set subnet. */
            const subnet = _entry.doc

            if (subnet && subnet.collateral && subnet.collateral.value) {
                /* Add collateral to total. */
                totalSubnetValue += Number(subnet.collateral.value)
            }
        })

    }

    const pkg = {
        numSubnets,
        totalSubnetValue,
    }

    res.json(pkg)
}

/* Export module. */
module.exports = dashboard
