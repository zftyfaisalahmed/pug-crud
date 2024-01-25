const fileRoute = require('express').Router()
const {index, upload, fileUpload, fileRead, fileDelete, pnf } = require('../controller/fileController')

const fileConfig = require('../middleware/upload')

fileRoute.get(`/`, index)
fileRoute.get(`/file/upload`, upload)


// api route
fileRoute.post(`/api/file/upload`, fileConfig, fileUpload)

fileRoute.get(`/api/files`, fileRead)

fileRoute.delete(`/api/file/:id`, fileDelete)

// default route
fileRoute.all(`/*`, pnf)

module.exports = fileRoute