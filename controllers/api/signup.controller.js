import bcrypt from "bcrypt";

/**
 * @openapi
 * /signup:
 *  post:
 *      tags:
 *      - name: "signup"
 *      requestBody:
 *          content:
 *              'application/json':
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *
 */

export default class SignupController {
    static async postSignup(req, res) {
        const body = req.body
        let errors = []
        const salt = await bcrypt.genSalt(10)
        let emailRe = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
        let email = body.email
        let user = await global.db.collection('users').findOne({email: email})
        if (user) {
            errors.push('Пользователь с таким email уже существует')
        }
        if (body.name === undefined || body.name.length < 3) {
            errors.push('Имя не должно быть короче 3 символов')
        }
        if (body.email === undefined) {
            errors.push('Введите email')
        }
        if (!emailRe.test(email)) {
            errors.push('Введите корректный email')
        }
        if (body.password === undefined || body.password.length < 3) {
            errors.push('Пароль должен содержать не менее 3 символов')
        }
        if (errors.length > 0) {
            res.send({errors: errors})
            return
        }
        console.log(req.body)
        await global.db.collection('users').insert({
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password, salt)
        })
        res.send({data: true})
    }
}


