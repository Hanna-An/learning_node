import express from 'express'
import fs from 'fs'
import path from 'path'
import multer from 'multer'

let webRoutes = express.Router()

webRoutes.get('/', (req, res) => {
    res.render('home', {
        title: 'Greetings form Handlebars',
        content: 'Description how to use it handlebars',
    })
})

webRoutes.get('/cars', async (req, res) => {
    let arr = await global.db.collection('cars').find().toArray()
    res.render('cars', {title: 'cars', cars: arr})
})

webRoutes.get('/news', async (req, res) => {
    let arr = await global.db.collection('news').find().toArray()
    res.render('news', {title: 'news', news: arr})
})

webRoutes.get('/category/:key', async (req, res) => {
    let category = await global.db.collection('categories').findOne({key: req.params.key})
    console.log(category)
    if (category) {
        res.render('category', {title: category.title})
    } else {
        throw new Error('404')
    }
})

const upload = multer({
    dest: "./uploads"
})

webRoutes.route('/profile')
    .get(async (req, res) => {
        res.render('profile', {title: 'Profile'})
    })

    .post(upload.single("avatar"), (req, res) => {
        const tempPath = req.file.path
        const targetPath = path.join('./public/uploads', req.file.originalname)

        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res)

            res.render('profile', {title: 'Profile', image: '/uploads/' + req.file.originalname})
        })
    })

export default webRoutes

