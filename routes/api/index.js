import express from 'express'

let apiRoutes = express.Router()

apiRoutes.get('/cars', async (req, res) => {
    let arr = await global.db.collection('cars').find().toArray()
    res.render('cars', {title: 'cars', cars: arr})
})

apiRoutes.get('/shops', async (req, res) => {
    let arr = await global.db.collection('shops').find().toArray()
    res.render('shops', {title: 'shops', shops: arr})
})

apiRoutes.get('/news', async (req, res) => {
    let arr = await global.db.collection('news').find().toArray()
    res.render('news', {title: 'news', news: arr})
})

apiRoutes.get('/articles', async (req, res) => {
    let arr = await global.db.collection('articles').find().toArray()
    res.render('articles', {title: 'articles', articles: arr})
})

apiRoutes.get('/category', async (req, res) => {
    let category = await global.db.collection('categories').find()
    if (category) {
        res.render('category')
    } else {
        throw new Error('404')
    }
})



export default apiRoutes
