

import {Router} from 'express'
import db from "../db.js";

const app = Router();

app.get('/lista', async(req, resp) => {
    try {
        let l = await db.infob_mw_usuario.findAll();
        resp.send(l);
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})

app.post('/lista', async(req, resp) => {
    try {
        let { nome, descricao } = req.body;

        let i = await db.infob_mw_usuario.create({
            nm_lista: nome, 
            ds_descricao: descricao
        })
        resp.send('Lista criada!')
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})

app.put('/lista/:id', async(req, resp) => {
    try {
        let { nome, descricao } = req.body;
        let { id } = req.params;

        let a = await db.infob_mw_usuario.update({
            nm_lista: nome,
            ds_descricao: descricao
        },
        {
            where: {id_lista: id}
        })
        resp.send('Lista alterada!')
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})

app.delete('/lista/:id', async(req, resp) => {
    try {
        let { id } = req.params;

        let d = await db.infob_mw_usuario.destroy({ where: {id_lista: id }})
        resp.send('Lista removida!')
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


export default app