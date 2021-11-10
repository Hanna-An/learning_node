export default class LoginController {

    static async getLogin(req, res) {
        return res.render('login')
    }

    static async postLogin(req, res) {
        res.send('ok')
    }
}


