import {Router} from 'express'
import db from "../db.js";

const app = Router();

////////////////////////////////////////// POR GOSTO //////////////////////////////////////////
app.get('/filmesgosto', async(req, resp) => {
    try {
        let a = await db.infob_mw_filme.findAll();

        a = a.map(item => {
            return {
              id: item.id_filme,
              nome: item.nm_filme,
              imagem: item.img_capa_menor
            }
          })
        resp.send(a);
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////// POPULARES //////////////////////////////////////////
app.get('/filmespops', async(req, resp) => {
    try {
        let a = await db.infob_mw_filme.findAll({order: [['ds_avaliacao', 'desc']]});
        a = a.map(item => {
            return {
              id: item.id_filme,
              nome: item.nm_filme,
              imagem: item.img_capa_menor,
              avaliacao: item.ds_avaliacao
            }
          })
        resp.send(a);
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})



function Ordenação(criterio) {
    switch(criterio) {
        case 'A - Z': return['nm_filme', 'asc'] 
        case 'Z - A': return['nm_filme', 'desc']
        case 'Avaliação': return['ds_avaliacao', 'desc']

        default: return['nm_filme', 'asc'] 
    }
}

app.get("/filmesjassistidos", async(req, resp) => {
    let Ordenar = Ordenação(req.query.ordenacao)

    const filmes = await db.infob_mw_filme.findAll({
        order: [
            Ordenar 
        ]
    })
    resp.send(filmes)
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////// JÁ ASSISTIDOS ////////////////////////////////////////////////
app.delete('/MeusF_Ja', async (req,resp) => { 
    try{ 
        let { id } = req.params; 
        let Filme_Ja = db.infob_mw_filme_ja_assistidos.destroy({ where: { id_filme: id }}) 
        resp.send("Filme removido!"); 
     } catch(e) { 
         resp.send({ erro: e.toString()}); 
     }
  } )


export default app