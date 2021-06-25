const express = require('express')

const mediaRoute = require('./src/routes/media')

const app = express()

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

app.use(express.json())

app.use('/media', mediaRoute)

app.listen(process.env.PORT, () => {
    console.log(`Media server listening on port ${process.env.PORT}`)
})