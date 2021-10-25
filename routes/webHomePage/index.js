import express from 'express'
// import fs from 'fs'
// import path from 'path'
// import multer from 'multer'
// import {ObjectId} from 'mongodb'


let webRoutes = express.Router()

webRoutes.get('/layouts/main', (req, res) => {
    res.render('home', {
        title: 'Greetings form Handlebars',
        content: 'Description how to use it handlebars',
        style: 'style.css',
    })
})