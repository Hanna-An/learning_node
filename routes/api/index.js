import express from 'express'

let apiRoutes = express.Router()

apiRoutes.post('/signup', async (req, res) => {
    // make validations
    // name - >3, required
    // email required mask, not dublicate in db
    // password >3
    // if have errors return {error: "err"}

    // write logic

    console.log(req.body)

    await global.db.collection('users').insert({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    res.send({success: true})
})

apiRoutes.get('/news', async (req, res) => {
    let arr = await global.db.collection('news').find().toArray()
    res.send({news: arr})
})

apiRoutes.get('/articles', async (req, res) => {
    let arr = await global.db.collection('articles').find().toArray()
    res.send({articles: arr})
})

apiRoutes.get('/articles/:key', async (req, res) => {
    let articles = await global.db.collection('articles').findOne({key: req.params.key})
    if (articles) {
        res.send({articles: articles})
    }
})



export default apiRoutes

