

import {Router} from 'express'
import db from "../db.js";

const app = Router();

app.get('/listar', async(req, resp) => {
    try {
        let c = await db.infob_mw_comentario.findAll();

        c = c.map(item => {
            return {
              id: item.id_cometario,
              id_filme: item.id_filme,
              id_usuario: item.id_usuario,
              mensagem: item.ds_mensagem,
              data: item.dt_comentario,
              curtidas: item.ds_curtidas
            }
          })
        resp.send(c);
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})


app.post('/inserir', async(req, resp) => {
    try {
        let { id_filme, id_usuario, mensagem, curtidas } = req.body;
        
        let i = await db.infob_mw_comentario.create({
            id_filme: id_filme,
            id_usuario: id_usuario,
            ds_mensagem: mensagem,
            dt_comentario: new Date,
            ds_curtidas: curtidas
        })
        resp.send("Comentario inserido!");
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.put('/alterar/:id', async(req, resp) => {
    try {
        let { id_filme, id_usuario, mensagem,curtidas } = req.body;
        let { id } = req.params;

        let a = await db.infob_mw_comentario.update({
            id_filme: id_filme,
            id_usuario: id_usuario,
            ds_mensagem: mensagem,
            ds_curtidas: curtidas
        },
        {
            where: {id_cometario: id}
        })
        resp.send("Comentario alterado!");
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.delete('/deletar/:id', async(req, resp) => {
    try {
        let { id } = req.params;
        let c = db.infob_mw_comentario.destroy({ where: {id_cometario: id}})
        resp.send("Comentario removido!");
    } catch(e) {
        resp.send({ erro: e.toString()});
    }
})

export default app