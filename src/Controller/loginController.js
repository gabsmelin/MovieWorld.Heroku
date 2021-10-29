import {Router} from 'express'
import db from "../db.js";

import enviarEmail  from "../enviarEmail.js"; 


const app = Router();

app.post('/login', async (req, resp) => {
    let { email, senha } = req.body;
    const usuario = await db.infob_mw_usuario.findAll({
        where: {
        ds_email: email,
        ds_senha: senha
        }
    })

    if (!usuario) {
        resp.send({ status: 'erro', mensagem: 'Credenciais inválidas.'});
    } else {
        resp.send({ status: 'ok', nome: usuario.nm_usuario});
    }
})


app.post('/esqueciSenha', async (req, resp) => {
 const usuario = await db.infob_mw_usuario.findOne ({
    where : {
        ds_email: req.body.email
    }
 });
 if(!usuario) {
    resp.send({ status: 'erro', mensagem: 'E-mail não existe'});
 }
 let codigo = getRandomInteger(1000, 9999);
 await db.infob_mw_usuario.update({
    ds_codigo_rec: codigo
 }, {
     where: {id_usuario: usuario.id_usuario}
 })
    enviarEmail(usuario.ds_email, 'Recuperação De Senha', `
    <h3> Recuperação de senha </h3>
    <p> Sua recuperação de senha da sua conta foi atendida 
    <p> insira esse código ${codigo} para recuperar ir adiante com a recuperação. 
    `) 
    resp.send({ status: 'ok'})

})

app.post('/validarcodigo', async (req, resp) => {
    const usuario = await db.infob_mw_usuario.findOne ({
        where : {
            ds_email: req.body.email
        }
     });
     if(!usuario) {
        resp.send({ status: 'erro', mensagem: 'E-mail não existe'});
     }
     if (usuario.ds_codigo_rec !== req.body.codigo) {
        resp.send({ status: 'erro', mensagem: 'Código inválido.'});
     }
     resp.send({ status: 'ok', mensagem: 'Código validado.'});   
})

app.put('/resetarsenha', async (req, resp) => {
    const usuario = await db.infob_mw_usuario.findOne ({
        where : {
            ds_email: req.body.email
        }
     });
     if(!usuario) {
        resp.send({ status: 'erro', mensagem: 'E-mail não existe'});
     }
     if (usuario.ds_codigo_rec !== req.body.codigo) {
        resp.send({ status: 'erro', mensagem: 'Código inválido.'});
     }
     await db.infob_mw_usuario.update({
        ds_senha: req.body.novaSenha
    }, {  
    where: {id_usuario: usuario.id_usuario}
    })
    resp.send({ status: 'ok', mensagem: 'Senha Alterada.'});
})

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

export default app