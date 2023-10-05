const Contact = require('../models/contactModals')


const asyncHandler = require('express-async-handler')
//desc of get all contacts 
//route GET /api/contacts

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id })
    res.status(200).json(contacts)
})
//desc of create new contacts 
//route POST /api/contacts

const createContacts = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, mobile_no, img } = req.body
    if (!email || !name || !mobile_no) {
        res.status(404)
        throw new Error("all fields required")
        // return res.status(400).json({ message: "email and  name is required" })
    }
    const contact = await Contact.create({
        name,
        email,
        mobile_no,
        user_id: req.user.id,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }

    })
    res.status(203).json(contact)

})
//desc of get all contacts by id

const getContactbyId = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id)
    if (!contacts) {
        res.status(404)
        throw new Error("contact not found")
    }
    res.status(200).json(contacts)
})


//desc of get all contacts 
//route GET /api/contacts

const updateContacts = asyncHandler(async (req, res) => {

    const contacts = await Contact.findById(req.params.id)
    if (!contacts) {
        res.status(404)
        throw new Error("contact not found")
    }

    const updatedContacts = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(202).json(updatedContacts)
})
//desc of get all contacts 
//route GET /api/contacts

const deleteContants = asyncHandler(async (req, res) => {

    const contacts = await Contact.findById(req.params.id)
    if (!contacts) {
        res.status(404)
        throw new Error("contact not found")
    }

    await Contact.findByIdAndDelete(req.params.id)
    res.status(201).json(contacts)
}
)

module.exports = {
    getContacts,
    createContacts,
    updateContacts,
    deleteContants,
    getContactbyId
}