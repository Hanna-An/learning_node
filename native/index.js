// import http from 'http'
// import Users from "./controllers/Users.js"
//
// const port = process.env.PORT || 3000
// const server = http.createServer((req, res) => {
//     console.log(req.method)
//     console.log(req.url)
//     switch (req.method) {
//         case 'POST':
//
//             switch (req.url) {
//                 case '/users':
//                     try {
//                         Users.saveUser(req, res)
//                         res.setHeader('Content-Type', 'application/json');
//                         res.end(JSON.stringify({success: true}))
//                     } catch (e) {
//                         res.end({error: 'слишком юн'})
//                     }
//                     break
//                 case '/users':
//                     try {
//                         Users.getAdmin(req, res)
//                         res.setHeader('Content-Type', 'application/json');
//                         res.end(JSON.stringify({success: true}))
//                     } catch (e) {
//                         res.end({error: 'введите имя'})
//                     }
//                     break
//             }
//
//             break
//         case 'GET':
//             if (req.url === '/') {
//                 res.end(`<h1>Hello World</h1>`)
//             }
//             if (req.url === '/hello') {
//                 res.end(`<h1>Hello</h1>`)
//             }
//             break
//         default:
//             res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
//             break
//     }
// })
//
// server.listen(port, () => {
//     console.log(`Server listening on port ${port}`)
// })


// 6. создать апи POST /users
// body:
// name: string
// birth_date: date

// Поставить валидации:
// 1. name не доджен быть пустым
// 2. на младше 13 лет выдавать ошибку


import http from 'http'
import fs from 'fs'
import Users from "./controllers/Users.js"

const port = process.env.PORT || 3000
const server = http.createServer((req, res) => {
    console.log(req.method)
    console.log(req.url)
    switch (req.method) {
        case 'POST':

            switch (req.url) {
                case '/users':
                    try {
                        req.on('data', chunk => {
                            let data = JSON.parse(chunk)
                            let dir = './temp'
                            console.log(data)
                            if (!fs.existsSync(dir)) {
                                fs.mkdirSync(dir)
                            }
                            let content_admin = '111'
                            console.log(fs.accessSync('./temp/admin.txt'))
                            fs.writeFileSync(dir + '/' + data.category + '.txt', content_admin)
                            let new_content_admin = '222'
                            fs.appendFileSync('./temp/admin.txt', '\n' + new_content_admin, (err) => {
                                if (err) {
                                    console.error(err)
                                    return
                                }
                            })
                            let content_user = '333'
                            console.log(fs.accessSync('./temp/user.txt'))
                            fs.writeFileSync(dir + '/' + data.category + '.txt', content_user)
                            let new_content_user = '444'
                            fs.appendFileSync('./temp/user.txt', '\n' + new_content_user, (err) => {
                                if (err) {
                                    console.error(err)
                                    return
                                }
                            })
                            let content_master = '555'
                            console.log(fs.accessSync('./temp/master.txt'))
                            fs.writeFileSync(dir + '/' + data.category + '.txt', content_master)
                            let new_content_master = '666'
                            fs.appendFileSync('./temp/master.txt', '\n' + new_content_master, (err) => {
                                if (err) {
                                    console.error(err)
                                    return
                                }
                            })
                        })
                        req.on('end', () => {
                            }
                        )
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({success: true}))
                    } catch (e) {
                        res.end({error: 'введите имя'})
                    }
                    break
            }

            break
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

