import express from 'express'
import cors from 'cors'
import db from "./db.js";

import filmeControler from './Controller/filmeController.js';
import usuarioControler from './Controller/usuarioController.js';
import comentarioControler from './Controller/comentarioController.js';
import listaControler from './Controller/listaController.js';
import filmeUsuControler from './Controller/filmeUsuController.js';
import listaItemControler from './Controller/listaItemController.js';
import loginControler from './Controller/loginController.js';

const app = express();
app.use(cors());
app.use(express.json());


app.use('/filme', filmeControler);
app.use('/usuario', usuarioControler);
app.use('/comentario', comentarioControler);
app.use('/listar', listaControler);
app.use('/filmeUsu', filmeUsuControler);
app.use('/listarItem', listaItemControler);
app.use('/login', loginControler);



function Ordenação(criterio) {
    switch(criterio) {
        case 'A - Z': return['nm_filme', 'asc'] 
        case 'Z - A': return['nm_filme', 'desc']
        case 'Avaliação': return['ds_avaliacao', 'desc']

        default: return['nm_filme', 'asc'] 
    }
}

app.get("/filmesjassistidos", async(req, resp) => {
    try {
        let Ordenar = Ordenação(req.query.ordenacao)

        let filmes = await db.infob_mw_filme.findAll({
            order: [
                Ordenar 
            ]
        })

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

        resp.send(filmes);
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})



app.listen(process.env.PORT,
    x => console.log(`Subiu a api, hehe ${process.env.PORT}`))