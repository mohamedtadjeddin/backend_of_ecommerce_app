const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Phone = mongoose.model('phone');
const auth = require('./auth');
const jwt = require('jsonwebtoken');
const router = express.Router();
router.post('/signUp', async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password })
    try {
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, "hatlijat")
        res.send({ token });
    } catch (err) {
        res.status(422).send(err.message)
    }

})
router.post('/logIn', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send("you must provide both email and password")
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).send("email not found")
    }
    try {
        await user.comparePasswords(password)
        const token = jwt.sign({ userId: user._id }, "hatlijat")
        res.send({ token })
    } catch (err) {
        return res.status(422).send("password or email not valid")
    }
})
router.post('/addPhone', auth, async (req, res) => {
    const { brand, name, colors, price, quantity } = req.body;
    const newPhone = new Phone({ brand, name, colors, price, quantity });
    try {
        await newPhone.save();
        res.send('saved successfuly!');
    } catch (err) {
        res.status(422).send("err")
    }

})

router.post('/removePhone/:id', auth, async (req, res) => {
    const ID = req.params.id;
    try {
        await Phone.findByIdAndDelete(ID)
        res.send("deleted")
    } catch (err) {
        res.status(422).send("err")
    }

})

router.post('/search', auth, async (req, res) => {
    const dt = req.query
    try {
        const r = await Phone.find(dt)
        res.send(r)
    } catch (err) {
        res.status(404).send("not found")
    }
})
router.post('/searchById/:id', auth, async (req, res) => {
    const ID = req.params.id;
    try {
        const r = await Phone.findById(ID)
        res.send(r)
    } catch (err) {
        res.status(404).send("not found")
    }
})
router.post('/addFavourites/:id', auth, async (req, res) => {
    try {
        const r = await User.updateOne({ _id: req.user._id }, { $push: { favourites: req.params.id } })
        res.send('added')
    } catch (err) {
        res.send("err")
    }
})
router.post('/removeFavourites/:id', auth, async (req, res) => {
    try {
        const r = await User.updateOne({ _id: req.user._id }, { $pull: { favourites: req.params.id } })
        res.send('deleted')
    } catch (err) {
        res.send("err")
    }
})
router.post('/addToCart/:id', auth, async (req, res) => {
    try {
        const r = await User.updateOne({ _id: req.user._id }, { $push: { cart: req.params.id } })
        res.send('added')
    } catch (err) {
        res.send("err")
    }
})
router.post('/removeFromCart/:id', auth, async (req, res) => {
    try {
        const r = await User.updateOne({ _id: req.user._id }, { $pull: { cart: req.params.id } })
        res.send('removed')
    } catch (err) {
        res.send("err")
    }
})
router.post('/hello', auth, (req, res) => {
    res.send("hello")
})


module.exports = router;