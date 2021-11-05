import express from 'express'
import db from "../db.js";

const app = express.Router();

app.get('/', async(req, resp) => {
    try {
        let a = await db.infob_mw_filmes.findAll({limit:4
      });

        a = a.map(item => {
            return {
              id: item.id_filme,
              nome: item.nm_filme,
              img_maior: item.img_capa_maior, 
            }
          })
        resp.send(a);
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})

export default app