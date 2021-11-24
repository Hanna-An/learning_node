
export default class NewsController {
    static async getNews(req, res) {
        let arr = await global.db.collection('news').find().toArray()
        res.send({data: arr})
    }
}


