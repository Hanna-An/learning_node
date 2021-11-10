export default class homeController {
    static async getHome(req, res) {

        const limit = 3
        let arr = await global.db.collection('news').find().sort({_id: -1}).limit(limit).toArray()
        arr.forEach(function (item) {
            item.url = req._parsedOriginalUrl.pathname + '/' + item.key
        })
        return res.render('home', {title: 'news', news: arr})
    }

    static async getDetailHome(req, res) {
        let articles = await global.db.collection('articles').findOne({key: req.params.key})
        if (articles) {
            return res.render('//_key', {articles: articles})
        } else {
            throw new Error('404')
        }
    }
}



