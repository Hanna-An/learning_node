export default class NewsController {
    static async getNews(req, res) {
        let limit = 2
        let offset = 0
        if (req.query.page) {
            offset = req.query.page * limit - 2
        }
        let arr = await global.db.collection('news').find().skip(offset).limit(limit).toArray()
        arr.forEach(function (item) {
            item.url = req._parsedOriginalUrl.pathname + '/' + item.key
        })
        let count = await global.db.collection('news').count()
        let pages = parseInt(count / limit) + 1
        let arrPages = []
        for (let i = 0; i < pages; i++) {
            arrPages.push(i + 1)
        }
        let limitNews = 3
        let popularNews = await global.db.collection('news').find().sort({views: -1}).limit(limitNews).toArray()
        res.render({data: popularNews})
    }

    static async getDetailNews(req, res) {
        let previous
        let current = req.params.key
        let next
        let news = await global.db.collection('news').findOne({key: current})
        if (news) {
            news.views = news.views === undefined ? 1 : ++news.views
            await global.db.collection('news').update({_id: news._id}, {$set: {views: news.views}})
            let arr = await global.db.collection('news').find({}).sort({key: 1}).toArray()
            if (arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].key === current) {
                        if (arr[i + 1]) {
                            next = arr[i + 1]
                        }
                        break
                    }
                    previous = arr[i]
                }
                res.render('news/_key', {news: news, previous: previous, next: next})
            } else {
                throw new Error('404')
            }
        }
    }
}



