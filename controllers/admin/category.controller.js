import crypto from "crypto";
import axios from "axios";
import {ObjectID} from "mongodb";

export default class AdminCategoryController {

    static async adminCategory(req, res) {
        let arr = await global.db.collection('categories').find().toArray()
        arr.forEach(function (item) {
            item.url = req._parsedOriginalUrl.pathname + '/' + item.key
        })
        return res.render('admin', {title: 'admin'})
    }

    static async adminGetCategory(req, res) {
        let arr = await global.db.collection('categories').find().toArray()
        arr.forEach(function (item) {
            item.url = req._parsedOriginalUrl.pathname + '/' + item.key
        })
        return res.render('admin/category', {title: 'admin', category: arr})
    }

    static async getDetailCategory(req, res) {
        let category = await global.db.collection('categories').findOne({key: req.params.key})
        if (category) {
            return res.render('admin/category/_key', {category: category})
        } else {
            throw new Error('404')
        }
    }

    static async adminGetCategoryDelite(req, res) {
        await global.db.collection('categories').deleteOne({key: req.params.key})
        return res.redirect('/admin/category')
    }



}



