const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const validateTokenHandler = require('../middleware/validateTokenHandler');
const router = express.Router();


router.post('/register', registerUser)
router.post('/login',loginUser)

router.post('/logout', (req, res) => {
    res.json({ message: 'log out sucessfully' });
})
router.get('/current', validateTokenHandler,currentUser)


module.exports = router