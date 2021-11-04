import express from 'express'
import db from "../db.js";

const app = express.Router();

////////////////////////////////////////// POR GOSTO //////////////////////////////////////////
  app.get('/filmesgosto', async(req, resp) => {
      try {
          let a = await db.infob_mw_filmes.findAll();

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
          let a = await db.infob_mw_filmes.findAll({order: [['ds_avaliacao', 'desc']]});
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
  app.get("/ja", async(req, resp) => {
      let Ordenar = Ordenação(req.query.ordenacao)

      let filmes = await db.infob_mw_filmes.findAll({ order: [ Ordenar ] })

      filmes = filmes.map(item => {
          return {
            id: item.id_filme,
            nome: item.nm_filme,
            genero: item.ds_genero,
            lancamento: item.ano_lancamento,
            diretor: item.nm_diretor, 
            sinopse: item.ds_sinopse,
            avaliacao: item.ds_avaliacao, 
            descricao: item.ds_descricao, 
            plataforma: item.ds_plataforma, 
            img_maior: item.img_capa_maior, 
            img_menor: item.img_capa_menor
          }
        })
      resp.send(filmes)
  })


export default app