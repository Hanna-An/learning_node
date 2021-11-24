import bcrypt from "bcrypt";

export default class FileController {
    static async postFile(req, res) {
        // console.log(req.file)
        res.send({data: 123})
    }
}


