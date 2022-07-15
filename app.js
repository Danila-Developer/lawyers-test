const express = require('express')


const server = express()

server.use(express.static(__dirname))

server.get('/', (req, res) => {
   console.log('get-запрос!')
   res.sendFile(__dirname + '/home.html')
})

server.listen(3009, ()=>{
   console.log('Сервер запущен!')
})