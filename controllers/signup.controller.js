import bcrypt from "bcrypt";

export default class SignupController {

    static async getSignup(req, res) {
        return res.render('signup')
    }

    static async postSignup(req, res) {
        const body = req.body
        let errors = []
        const salt = await bcrypt.genSalt(10)
        let emailRe = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
        let emailValue = body.email
        if (body.name === undefined || body.name.length < 3) {
            errors.push('Имя не должно быть короче 3 символов')
        }
        if (body.email === undefined) {
            errors.push('Введите email')
        }
        if (!emailRe.test(emailValue)) {
            errors.push('Введите корректный email')
        }
        if (body.password === undefined || body.password.length < 3) {
            errors.push('Пароль должен содержать не менее 3 символов')
        }
        if (errors.length > 0) {
            res.send({errors: errors})
            return
        }
        await global.db.collection('users').insert({
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password, salt)
        })
        return res.redirect('/login')
    }
}

