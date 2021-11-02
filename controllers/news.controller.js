export default class NewsController {
    static async getNews(req, res) {
        const limit = 2
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
        return res.render('news', {title: 'news', news: arr, pages: arrPages})
    }

    static async getDetailNews (req, res) {
        let previous
        let current = req.params.key
        let next
        let news = await global.db.collection('news').findOne({key: current})
        if (news) {
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
                return res.render('news/_key', {news: news, previous: previous, next: next})
            } else {
                throw new Error('404')
            }
        }
    }
}



