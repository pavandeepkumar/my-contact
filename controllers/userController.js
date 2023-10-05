//@desc Register a user
//@route Post api/users/register
//@acess public
const expressAsyncHandler = require("express-async-handler");
const User = require('../models/userModal')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("User already exists")
    }

    //hash password

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("hashed password", hashedPassword);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    console.log("user created ", user);

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            // token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid user data")
    }
    res.json({ message: "Register a user" });
})
//@desc login a user
//@route Post api/users/login
//@acess public

const loginUser = expressAsyncHandler(async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }
    const user = await User.findOne({ email })
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const accessToken = await jwt.sign({
                user:
                {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }, process.env.ACCESS_TOKEN_KEY, {
                expiresIn: "15m"
            })
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: accessToken
            })
        }
        else {
            res.status(400)
            throw new Error("Invalid password")
        }
    }
    else {
        res.status(400)
        throw new Error("Invalid Email Address")
    }
    // res.json({ message: "login a user" }); 
})

const currentUser = expressAsyncHandler(async (req, res) => {
    res.json(req.user);
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}