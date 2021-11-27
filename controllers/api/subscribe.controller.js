import bcrypt from "bcrypt";

export default class SubscribeController {
    static async postSubscribe(req, res) {
        const body = req.body
        let errors = []
        let emailRe = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
        let email = body.email
        if (email === undefined) {
            errors.push('Введите email')
        }
        if (!emailRe.test(email)) {
            errors.push('Введите корректный email')
        }
        if (errors.length > 0) {
            res.send({errors: errors})
            return
        }
        console.log(req.body)
        await global.db.collection('subscribes').insert({
            email: body.email
        })
        res.send({data: true})
    }
}


