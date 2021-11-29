import crypto from "crypto";
import axios from "axios";
import {ObjectId, ObjectID} from "mongodb";

export default class AdminVacanciesController {

    static async adminVacancies(req, res) {
        let arr = await global.db.collection('vacancies').find().toArray()
        return res.send({data: arr})
    }

    static async getDetailVacancy(req, res) {
        let vacancy = await global.db.collection('vacancies').findOne({_id: new ObjectId(req.params.id)})
        if (vacancy) {
            return res.send({data: vacancy})
        } else {
            throw new Error('404')
        }
    }

    static async adminVacancyDelete(req, res) {
        await global.db.collection('vacancies').deleteOne({_id: new ObjectId(req.params.id)})
        return res.send({data: true})
    }
}



