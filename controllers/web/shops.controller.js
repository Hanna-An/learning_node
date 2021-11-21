export default class ShopsController {
    static async getShops(req, res) {

        let arr = await global.db.collection('shops').find().toArray()
        arr.forEach(function (item) {
            item.url = req._parsedOriginalUrl.pathname + '/' + item.key
        })
        return res.render('shops', {title: 'shops', shops: arr})
    }

    static async getDetailShops(req, res) {
        let shops = await global.db.collection('shops').findOne({key: req.params.key})
        if (shops) {
            return res.render('shops/_key', {shops: shops})
        } else {
            throw new Error('404')
        }
    }

    // static async getCartShops (req, res) {
    //     return res.render ('cart')
    // }
}



