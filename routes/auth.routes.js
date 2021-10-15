const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const router = Router()


router.post(
    '/register', [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    async(req, res) => {
        try {
            const errors = valudationResult(req)
            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            const { email, password } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({ email, password: hashedPassword })

            await user.save()

            res.status(201).json({ message: 'Пользователь создан' })

        } catch (e) {
            res.status(500).json({ message: "Something went wrong" })
        }
    })

router.post(
    '/login', [
        check('email', "Введите корректный email").normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при въоде в систему'
                })
            }

            const { email, password } = req.body

            const user = await new User.findOne()

        } catch (e) {
            res.status(500).json({ message: "Something went wrong" })
        }
    })

module.exports = router