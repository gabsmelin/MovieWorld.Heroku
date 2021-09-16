import db from "./db.js";
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());


app.get('/filme', async(req, resp) => {
    try {
        let a = await db.tb_filme.findAll();
        resp.send(a);
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})

app.post('/post', async(req, resp) => {
    try {
        let { nome, genero, lancamento, diretor, sinopse, avaliacao, descricao, plataforma, img_maior, img_menor } = req.body;
        
        let i = await db.tb_filme.create({
            nm_filme: nome,
            ds_genero: genero,
            dt_lancamento: lancamento,
            nm_diretor: diretor, 
            ds_sinopse: sinopse,
            ds_avaliacao: avaliacao,
            ds_descricao: descricao,
            ds_plataforma: plataforma,
            img_capa_maior: img_maior,
            img_capa_menor: img_menor
        })
        resp.sendStatus(200)
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.listen(process.env.PORT,
    x => console.log(`Subiu a api, hehe ${process.env.PORT}`))