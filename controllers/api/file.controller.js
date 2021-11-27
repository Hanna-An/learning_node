import multer from 'multer'

export default class FileController {
    static async postFile(req, res) {
        const maxSize = 10 * 1024 * 1024 // 500Kb
console.log(req)
        // if (req.file.buffer.byteLength > maxSize) {
        //     res.send({errors: "Максимальный размер файла 500Кб"})
        //     return
        // }
        res.send({data: true})
    }
}


