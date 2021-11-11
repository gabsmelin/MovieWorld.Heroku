import express from 'express'
import db from "../db.js";
import Sequelize from 'sequelize';
const { Op, col, fn } = Sequelize;

const app = express.Router();

////////////////////////////////////////// POR GOSTO //////////////////////////////////////////
  app.get('/filmesgosto', async(req, resp) => {
      try {
        //let { id_filme, id_usuario } = req.body;
          let a = await db.infob_mw_filme_usuario.findAll({
            include: [{
              model: db.infob_mw_usuario,
              as: 'infob_mw_usuario',
              required: true
            }],
            include: [{
              model: db.infob_mw_filmes,
              as: 'infob_mw_filmes',
              required: true
            }]
          });
          resp.send(a);
      } catch(e) {
          resp.send({erro: e.toString()})
      }
  })

  app.post('/filmesgostoedsrtst', async(req, resp) => {
    try {
      let { id_filme, id_usuario } = req.body;
        let a = await db.infob_mw_filme_usuario.findAll({
          include: [{
            model: db.infob_mw_usuario(id_usuario),
            as: 'infob_mw_usuario',
            required: true
          }],
          include: [{
            model: db.infob_mw_filmes(id_filme),
            as: 'infob_mw_filmes',
            required: true
          }]
          });

        let i = await db.infob_mw_filme_usuario.create({
            id_filme_usuario: id,
            id_usuario: id_usuario,
            id_filme: id_filme,
            nm_categoria: nome
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
  app.get('/ja', async(req, resp) => {
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


  app.get('/ja/filmes', async (req, resp) => {
    let page = req.query.page || 0;
    if (page <= 0) page = 1;
  
    const itemsPerPage = 24;
    const skipItems    = (page-1) * itemsPerPage;

    let Ordenar = Ordenação(req.query.ordenacao)
    
    const filmes = await db.infob_mw_filmes.findAll({
      limit: itemsPerPage,
      offset: skipItems,
      order: [ Ordenar ],
      attributes: [
        ['id_filme', 'id'],
        ['nm_filme', 'nome'],
        ['ds_genero', 'genero'],
        ['ano_lancamento','lancamento' ],
        ['nm_diretor', 'diretor'],
        ['ds_sinopse', 'sinopse'],
        ['ds_avaliacao', 'avaliacao'],
        ['ds_descricao', 'descricao'],
        ['ds_plataforma', 'plataforma'],
        ['img_capa_maior', 'img_maior'],
        ['img_capa_menor', 'img_menor']
      ]
    });


    const total = await db.infob_mw_filmes.findOne({
     raw: true, 
     attributes: [
       [fn('count', 1), 'qtd']
      ]
    });

      resp.send({
        itens: filmes,
        total: total.qtd,
        totalPaginas: Math.ceil(total.qtd/24),
        pagina: Number(page)
      })
    })

      app.get('/ja/filmesdif', async (req, resp) => {
        let page = req.query.page || 0;
        if (page <= 0) page = 1;
      
        const itemsPerPage = 12;
        const skipItems    = (page-1) * itemsPerPage;
    
        let Ordenar = Ordenação(req.query.ordenacao)
        
        const filmes = await db.infob_mw_filmes.findAll({
          limit: itemsPerPage,
          offset: skipItems,
          order: [ Ordenar ],
          attributes: [
            ['id_filme', 'id'],
            ['nm_filme', 'nome'],
            ['ds_genero', 'genero'],
            ['ano_lancamento','lancamento' ],
            ['nm_diretor', 'diretor'],
            ['ds_sinopse', 'sinopse'],
            ['ds_avaliacao', 'avaliacao'],
            ['ds_descricao', 'descricao'],
            ['ds_plataforma', 'plataforma'],
            ['img_capa_maior', 'img_maior'],
            ['img_capa_menor', 'img_menor']
          ]
        });
    
    
        const total = await db.infob_mw_filmes.findOne({
          raw: true, 
          attributes: [
            [fn('count', 1), 'qtd']
            ],
          limit: 3
        });
    
          resp.send({
            itens: filmes,
            total: total.qtd,
            totalPaginas: Math.ceil(total.qtd/12),
            pagina: Number(page)
          })
        })

        app.get('/ja/per', async(req, resp) => {
          let filmes = await db.infob_mw_filmes.findAll({ 
            limit: 9 
          });
    
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


        app.get('/ja/filmesdif2', async (req, resp) => {
          let page = req.query.page || 0;
          if (page <= 0) page = 1;
        
          const itemsPerPage = 18;
          const skipItems    = (page-1) * itemsPerPage;
      
          let Ordenar = Ordenação(req.query.ordenacao)
          
          const filmes = await db.infob_mw_filmes.findAll({
            limit: itemsPerPage,
            offset: skipItems,
            order: [ Ordenar ],
            attributes: [
              ['id_filme', 'id'],
              ['nm_filme', 'nome'],
              ['ds_genero', 'genero'],
              ['ano_lancamento','lancamento' ],
              ['nm_diretor', 'diretor'],
              ['ds_sinopse', 'sinopse'],
              ['ds_avaliacao', 'avaliacao'],
              ['ds_descricao', 'descricao'],
              ['ds_plataforma', 'plataforma'],
              ['img_capa_maior', 'img_maior'],
              ['img_capa_menor', 'img_menor']
            ]
          });
      
      
          const total = await db.infob_mw_filmes.findOne({
            raw: true, 
            attributes: [
              [fn('count', 1), 'qtd']
              ],
            limit: 3
          });
      
            resp.send({
              itens: filmes,
              total: total.qtd,
              totalPaginas: Math.ceil(total.qtd/18),
              pagina: Number(page)
            })
          })

/////////////////////////////////////////////////////////////////////////////////////


app.get('/AssistirT', async(req, resp) => {
  try {
      let x = await db.infob_mw_lista_item.findAll();
      resp.send(x);
  } catch(e) {
      resp.send({ erro: e.toString() })
  }
})


app.post('/AssistirT', async (req, resp) => {
  try{
      let {filme, lista} = req.body;
          let x = await db.infob_mw_lista_item.create({
              id_filme: filme,
              id_lista: lista
          })
          resp.send('Filme adicionado!')  
  } catch(e) {
       resp.send({erro: e.toString() })
  }
})

app.delete('/AssistirT/:id', async(req, resp) => {
  try {
      let { id } = req.params;

      let d = await db.infob_mw_lista_item.destroy({ where: {id_lista_item: id }})
      resp.send('Filme removido!')
  } catch(e) {
      resp.send({erro: e.toString()})
  }
})



export default app