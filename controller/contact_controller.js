// read all - get
const Contact = require('../model/contact_model')
const readAllContact = async (req, res) => {
    try{
        let contacts = await Contact.find({})
        res.status(200).json({length:contacts.length, contacts})
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}
// read single - get(id)
const readSingleContact = async (req, res) => {
    try{
        let id = req.params.id;
        let single = await Contact.findById({_id:id})
        if(!single)
            return res.status(404).json({msg:"Requested id not found"})
        res.status(200).json({contact : single})
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}
// create -> post + data
const createContact = async (req, res) => {
    try{
        let {email, mobile, website} = req.body
        let extData = await Contact.findOne({email})
        if(extData)
            return res.status(400).json({msg : `${email} already exists`})

        let extMob = await Contact.findOne({mobile})
        if(extMob)
            return res.status(400) .json({msg : `${mobile} already exists`})

        let extWeb = await Contact.findOne({website})    
        if(extWeb)
            return res.status(400) .json({msg : `${website} already exists`})

        let newContact = await Contact.create(req.body)
        res.status(200).json({msg:`new contact added succefully`,data : newContact})
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}
// update -> patch(id)/put(id) + data
const updateContact = async (req, res) => {
    try{
        let id = req.params.id
        let {email, mobile, website} = req.body
        let single = await Contact.findById({_id:id})
        if(!single)
            return res.status(404).json({msg:"Requested id not found"})
        // let extData = await Contact.findOne({email})
        // if(extData)
        //     return res.status(400).json({msg : `${email} already exists`})

        // let extMob = await Contact.findOne({mobile})
        // if(extMob)
        //     return res.status(400) .json({msg : `${mobile} already exists`})

        // let extWeb = await Contact.findOne({website})    
        // if(extWeb)
        //     return res.status(400) .json({msg : `${website} already exists`})
        await Contact.findByIdAndUpdate({_id:id}, req.body)
        res.status(200).json({msg:'contact info update successfully'})
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}
// delete -> delete(id)
const deleteContact = async (req, res) => {
    try{
        let id = req.params.id
        let single = await Contact.findById({_id:id})
        if(!single)
            return res.status(404).json({msg:"Requested id not found"})
        await Contact.findByIdAndDelete({_id:id})
        res.status(200).json({msg:'contact info deleted'})
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}

// const export or types export
module.exports = {readAllContact, readSingleContact, createContact, updateContact, deleteContact}