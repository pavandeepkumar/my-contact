const express = require('express');
const router = express.Router();


const { getContacts, deleteContants, createContacts, updateContacts, getContactbyId} = require('../controllers/contactControllers');
const validateTokenHandler = require('../middleware/validateTokenHandler');
router.use(validateTokenHandler)
router.route("/").get(getContacts).post(createContacts);

router.route("/:id").get(getContactbyId).put(updateContacts).delete(deleteContants)



module.exports = router