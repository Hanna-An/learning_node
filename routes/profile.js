import express from 'express'
import fs from 'fs'
import path from 'path'
import multer from 'multer'

const upload = multer({
    dest: "./uploads"
})

let profile = express.Router()

profile.route('/profile')
    .get(async (req, res) => {
        res.render('profile', {title: 'Profile'})
    })
    .post(upload.single("avatar"), (req, res) => {
        const tempPath = req.file.path
        console.log(req.file)
        const targetPath = path.join('./public/uploads', req.file.originalname)

        // if (path.extname(req.file.originalname).toLowerCase() === ".png") {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res)

                res.render('profile', {title: 'Profile', image: '/uploads/' + req.file.originalname})
            })
        // } else {
        //     fs.unlink(tempPath, err => {
        //         if (err) return handleError(err, res)
        //
        //         res
        //             .status(403)
        //             .contentType("text/plain")
        //             .end("Only .png files are allowed!")
        //     })
        // }
    })

export default profile