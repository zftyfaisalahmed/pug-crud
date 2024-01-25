const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
    fieldname: {
        type: String,
        trim: true
    },
    originalname: {
        type: String,
        trim: true
    },
    encoding: {
        type: String,
        trim: true
    },
    mimetype: {
        type: String,
        trim: true
    },
    destination: {
        type: String,
        trim: true
    },
    filename: {
        type: String,
        trim: true
    },
    path: {
        type: String,
        trim: true
    },
    size: {
        type: Number,
        default: 0
    }
},{
    collection: "files",
    timestamps: true
})

module.exports  = mongoose.model("File", FileSchema)