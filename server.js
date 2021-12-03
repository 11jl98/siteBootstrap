const express = require('express')
const path = require('path')
const mail = require('./index')

const server = express()

server.set('views', path.join(__dirname, ));
server.set('view engine', 'ejs');

server.use(express.static(path.join(__dirname, )));

server.use(express.json())

server.get('/version', (req, res) => {
    return res.status(200).json({
        version: '1.0.0'
    })
})


server.get('/',(req,res)=>{
    return res.render('index')
})

server.post('/send/mail', async (req, res) => {
    const remetente = req.body.remetente
    const nome = req.body.nome
    const telefone = req.body.telefone
    const software = req.body.software
    const corpoEmail = req.body.corpoEmail
    console.log(req.body)

    const result = await mail(remetente, nome, software, telefone, corpoEmail)

    return res.redirect('/')

})


server.listen(3000, () => console.log('http://localhost:3000'))