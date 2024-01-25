const File = require('../model/fileModel')
const fs = require('fs')

// index
const index = async (req,res) => {
    return res.render('index.pug')
}

// upload'
const upload = async (req,res) => {
    return res.render('fileUpload.pug')
}


// api
const fileUpload = async (req,res) => {
    try {
        // to receive file data
        const fileData = req.file

        let extFile = await File.findOne({ originalname: fileData.originalname })
            if(extFile) {
                // delete the file in doc
                fs.unlinkSync(fileData.path)
                return res.status(400).json({ msg: `File already exists..`})
            }

            const newFile = await File.create(fileData)

            res.status(200).json({ msg: "File Uploaded Successfully", file : newFile })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const fileRead = async (req,res) => {
    try {
        let files = await File.find()

        res.json({ length: files.length, files })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const fileDelete = async (req,res) => {
    try {
        let id = req.params.id 

            let extFile = await File.findById({ _id: id })
                if(!extFile)
                    return res.status(404).json({ msg: `Requested file id not found`})

                fs.unlinkSync(extFile.path)
            await File.findByIdAndDelete({ _id: id })

        res.status(200).json({ msg: 'file deleted successfully'})
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

//pnf
const pnf = async (req,res) => {
    return res.render('pnf.pug')
}

module.exports = { index, upload, fileUpload, fileRead, fileDelete, pnf }