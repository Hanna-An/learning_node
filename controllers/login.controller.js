import bcrypt from "bcrypt";

export default class LoginController {

    static async getLogin(req, res) {
        return res.render('login')
    }

    static async postLogin(req, res) {
        const body = req.body
        const user = await global.db.collection('users').findOne({email: body.email})
        if (user) {
            const validPassword = await bcrypt.compare(body.password, user.password)
            if (validPassword) {
                req.session.user = user
                return res.redirect('/')
            } else {
                return res.json({error: "Invalid Password"})
            }
        } else {
            return res.json({error: "User does not exist"})
        }
// res.send('ok')
    }
}

