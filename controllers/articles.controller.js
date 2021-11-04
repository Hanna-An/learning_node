export default class ArticlesController {
    static async getArticles(req, res) {

        const limit = 2
        let offset = 0
        if (req.query.page) {
            offset = req.query.page * limit - 2
        }
        let arr = await global.db.collection('articles').find().skip(offset).limit(limit).toArray()
        arr.forEach(function (item) {
            item.url = req._parsedOriginalUrl.pathname + '/' + item.key
        })
        let count = await global.db.collection('articles').count()
        let pages = parseInt(count / limit) + 1
        let arrPages = []
        for (let i = 0; i < pages; i++) {
            arrPages.push(i + 1)
        }
        return res.render('articles', {title: 'articles', articles: arr, pages: arrPages})
        }

        static async getDetailArticles (req, res) {
            let articles = await global.db.collection('articles').findOne({key: req.params.key})
                if (articles) {
                    return res.render('articles/_key', {articles: articles})
                } else {
                    throw new Error('404')
                }
            }
}


