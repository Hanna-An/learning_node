import express from 'express'

let apiRoutes = express.Router()

apiRoutes.get('/cars', async (req, res) => {
    let arr = await global.db.collection('cars').find().toArray()
    res.render('cars', {title: 'cars', cars: arr})
})

apiRoutes.get('/news', async (req, res) => {
    let arr = await global.db.collection('news').find().toArray()
    res.render('news', {title: 'news', news: arr})
})

export default apiRoutes
