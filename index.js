const nodemailer = require("nodemailer");
const path = require('path')
const fs = require('fs')

const VIEW_MAIL = 'email.html'

async function main(remetente, nome, software, telefone, corpoEmail) {
console.log(corpoEmail)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "joaoferreira981011@gmail.com",
      pass: "111098jlpf",
    },
  });

  let html = fs.readFileSync(path.resolve(__dirname, 'email', VIEW_MAIL), 'utf8')
  html = html.replace('{{NAME}}', nome)
  html = html.replace('{{DESCRIPITION}}', corpoEmail)
  html = html.replace('{{DETALHES}}', "att:"+ nome + "; " + telefone)

  const info = await transporter.sendMail({
    from: remetente,
    to: "joaoferreira19981011@gmail.com",
    subject: software,
    text: corpoEmail + "att:"+ nome + "; " + telefone,
    html: html
  });

  return info
}

module.exports = main;