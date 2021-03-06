import bcrypt from "bcrypt";

export default class LoginController {
    static async postLogin(req, res) {
        const body = req.body;
        const user = await global.db.collection('users').findOne({email: body.email})
        if (user) {
            const validPassword = await bcrypt.compare(body.password, user.password)
            if (validPassword) {
                res.status(200).json({message: "Valid password"})
            } else {
                res.status(400).json({error: "Invalid Password"})
            }
        } else {
            res.status(401).json({error: "User does not exist"})
        }
    }
}


