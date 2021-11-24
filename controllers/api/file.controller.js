import bcrypt from "bcrypt";

export default class FileController {
    static async postFile(req, res) {
        //id, hash, isUsed(true-false)
        res.send({data: true})
        // console.log(req.file)
    }
}


