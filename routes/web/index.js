import express from 'express'
import fs from 'fs'
import path from 'path'
import multer from 'multer'

let webRoutes = express.Router()

webRoutes.get('/', (req, res) => {
    res.render('home', {
        title: 'Greetings form Handlebars',
        content: 'Description how to use it handlebars',
        style: 'style.css',
    })
})

webRoutes.get('/cars', async (req, res) => {
    let arr = await global.db.collection('cars').find().toArray()
    res.render('cars', {title: 'cars', cars: arr})
})

webRoutes.get('/news', async (req, res) => {
    const limit = 2
    let offset = 0
    if (req.query.page) {
        offset = req.query.page * limit - 2
    }
    let arr = await global.db.collection('news').find().skip(offset).limit(limit).toArray()
    let count = await global.db.collection('news').count()
    let pages = parseInt(count / limit) + 1
    let arrPages = []
    for (let i = 0; i < pages; i++) {
        arrPages.push(i + 1)
    }
    res.render('news', {title: 'news', news: arr, pages: arrPages})
})

webRoutes.get('/category', async (req, res) => {
    let category = await global.db.collection('categories').find()
    if (category) {
        res.render('category')
    } else {
        throw new Error('404')
    }
})

webRoutes.get('/category/:key', async (req, res) => {
    let category = await global.db.collection('categories').findOne({key: req.params.key})
    if (category) {
        res.render('category/_key', {title: category.title})
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

