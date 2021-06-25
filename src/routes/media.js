const { Router } = require('express')
const fs = require('fs')

const router = Router()

// Load Environmental Variables
if (process.env.NODE_ENV === 'development') {
    const dotenv = require('dotenv')
    const environmentalVars = dotenv.config({ path: './configs.env' })
    if (environmentalVars.error) {
        throw environmentalVars.error
    } else {
        console.log('Environmental Variables Loaded')
    }
}

router.get('/', async (_, res) => {
    fs.readdir(process.env.MEDIA_LOCATION, (err, files) => {
        if (err) {
            res.status(500).json({ msg: err.message })
        } else if (files) {
            res.status(200).json({ files })
        } else {
            res.sendStatus(200)
        }
    })
})

module.exports = router