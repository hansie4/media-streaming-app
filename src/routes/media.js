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
    const matrix = getAllFiles(process.env.MEDIA_LOCATION, [])

    const mediaTree = getMediaTree(process.env.MEDIA_LOCATION)

    let testMatrix = []

    matrix.forEach((value) => {
        try {
            fs.accessSync(value, fs.constants.R_OK)

            testMatrix.push(true)
        } catch (error) {
            testMatrix.push(false)
        }
    })

    const test = fs.readFileSync('D:\\Media\\test.txt')

    res.status(200).json({ matrix, testMatrix, mediaTree, test })
})

const getAllFiles = (currentLocation, files) => {
    const currentDirectory = fs.readdirSync(currentLocation)

    currentDirectory.forEach((value) => {
        if (value.match(/^.*\.(jpg|JPG|gif|GIF|doc|DOC|pdf|PDF|txt|mkv|mp4|m4v)$/)) {
            files.push(currentLocation.concat(value))
        } else {
            getFiles(currentLocation.concat(value, '\\'), files)
        }
    })

    return files
}

const getMediaTree = (currentLocation) => {
    let mediaTree = []
    const currentDirectory = fs.readdirSync(currentLocation)

    currentDirectory.forEach((value) => {
        if (value.match(/^.*\.(jpg|JPG|gif|GIF|doc|DOC|pdf|PDF|txt|mkv|mp4|m4v)$/)) {
            mediaTree.push(currentLocation.concat(value))
        } else {
            mediaTree.push([value, getMediaTree(currentLocation.concat(value, '\\'))])
        }
    })

    return mediaTree
}

module.exports = router