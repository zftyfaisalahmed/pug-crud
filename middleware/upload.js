const multer = require('multer')
const path = require('path')

// storage 
const myStorage  = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './docs')
    },
    filename: (req,file,cb) => {
        // cb(null, file.originalname)
        cb(null, `doc-${new Date().getTime().toString()}${path.extname(file.originalname)}`)
    }
})

// upload config
const fileConfig = multer({
    storage: myStorage,
    limits: { fileSize: 10 * 1024 * 1024 }  // 10Mb
}).single('doc')

module.exports = fileConfig