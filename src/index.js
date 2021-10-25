import db from "./db.js";
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());


app.get('/filme', async(req, resp) => {
    try {
        let a = await db.infob_mw_filme.findAll();

        a = a.map(item => {
            return {
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
        resp.send(a);
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})

app.post('/filme', async(req, resp) => {
    try {
        let { nome, genero, lancamento, diretor, sinopse, avaliacao, descricao, plataforma, img_maior, img_menor } = req.body;
    
        let i = await db.infob_mw_filme.create({
            nm_filme: nome,
            ds_genero: genero,
            ano_lancamento: lancamento,
            nm_diretor: diretor, 
            ds_sinopse: sinopse,
            ds_avaliacao: avaliacao,
            ds_descricao: descricao,
            ds_plataforma: plataforma,
            img_capa_maior: img_maior,
            img_capa_menor: img_menor
        })
        resp.send("Filme inserido!");
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})




app.put('/filme/:id', async(req, resp) => {
    try {
        let { nome, genero, lancamento, diretor, sinopse, avaliacao, descricao, plataforma, img_maior, img_menor } = req.body;
        let { id } = req.params;

        let a = await db.infob_mw_filme.update(
        {
            nm_filme: nome,
            ds_genero: genero,
            ano_lancamento: lancamento,
            nm_diretor: diretor, 
            ds_sinopse: sinopse,
            ds_avaliacao: avaliacao,
            ds_descricao: descricao,
            ds_plataforma: plataforma,
            img_capa_maior: img_maior,
            img_capa_menor: img_menor
        },
        {
            where: {id_filme: id}
        })
        resp.send("Filme alterado!");
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})


app.delete('/filme/:id', async(req, resp) => {
    try {
        let { id } = req.params;
        let d = db.infob_mw_filme.destroy({ where: {id_filme: id}})
        resp.send("Filme removido!");
    } catch(e) {
        resp.send({ erro: e.toString()});
    }
})



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

app.post('/filmesgosto', async(req, resp) => {
    try {
        let { nome, img_menor } = req.body;
    
        let i = await db.infob_mw_filme.create({
            nm_filme: nome,
            img_capa_menor: img_menor
        })
        resp.send("Filme inserido!");
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


//


app.get('/usuario', async(req, resp) => {
    try {
        let a = await db.infob_mw_usuario.findAll();
        resp.send(a);
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})

app.post('/usuario', async(req, resp) => {
    try {
        let { nome, sobrenome, username, email, senha, genero, localizacao, redes, fotoperfil } = req.body;
        
        let i = await db.infob_mw_usuario.create({
            nm_usuario: nome,
            nm_sobrenome: sobrenome,
            nm_username: username,
            ds_email: email,
            ds_senha: senha,
            ds_genero: genero,
            ds_nascimento: new Date(),
            ds_localizacao: localizacao,
            ds_redes_sociais: redes,
            ds_foto: fotoperfil
        })
        resp.send("Usuário inserido!");
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.put('/usuario/:id', async(req, resp) => {
    try {
        let { nome, sobrenome, username, email, senha, genero, nascimento, localizacao, redes, fotoperfil } = req.body;
        let { id } = req.params;

        let a = await db.infob_mw_usuario.update({
            nm_usuario: nome,
            nm_sobrenome: sobrenome,
            nm_username: username,
            ds_email: email,
            ds_senha: senha,
            ds_genero: genero,
            ds_nascimento: nascimento,
            ds_localizacao: localizacao,
            ds_redes_sociais: redes,
            ds_foto: fotoperfil
        },
        {
            where: {id_usuario: id}
        })
        resp.send("Usuário alterado!");
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.delete('/usuario/:id', async(req, resp) => {
    try {
        let { id } = req.params;
        let d = db.infob_mw_usuario.destroy({ where: {id_usuario: id}})
        resp.send("Produto removido!");
    } catch(e) {
        resp.send({ erro: e.toString()});
    }
})

//

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


app.get('/lista_item', async(req, resp) => {
    try {
        let x = await db.infob_mw_lista_item.findAll();
        resp.send(x);
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})


app.post('/lista_item', async (req, resp) => {
    try{
        let {nome, descricao, lista } = req.body;

        let x = await db.infob_mw_lista_item.create({
            id_lista_item: nome, 
            id_filme: descricao,
            id_lista_item: lista
        })
         resp.send('lista criada!')  
    } catch(e) {
         resp.send({erro: e.toString() })
    }

    
})


app.get('/comentario', async(req, resp) => {
    try {
        let c = await db.infob_mw_comentario.findAll();
        resp.send(c);
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})



app.post('/comentario', async(req, resp) => {
    try {
        let { filme, usuario, mensagem, curtidas } = req.body;
        
        let i = await db.infob_mw_comentario.create({
            id_filme: filme,
            id_usuario: usuario,
            ds_mensagem: mensagem,
            dt_comentario: new Date,
            ds_curtidas: curtidas
        })
        resp.send("Comentario inserido!");
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.put('/comentario/:id', async(req, resp) => {
    try {
        let { filme, usuario, mensagem,curtidas } = req.body;
        let { id } = req.params;

        let a = await db.infob_mw_comentario.update({
            id_filme: filme,
            id_usuario: usuario,
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






app.delete('/comentario/:id', async(req, resp) => {
    try {
        let { id } = req.params;
        let c = db.infob_mw_comentario.destroy({ where: {id_cometario: id}})
        resp.send("Comentario removido!");
    } catch(e) {
        resp.send({ erro: e.toString()});
    }
})



app.get('/lista_popular', async(req, resp) => {
    try {
        let c = await db.infob_mw_lista.findAll();
        resp.send(c);
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})




app.put('/lista_popular/:id', async(req, resp) => {
    try {
        let { nome_lista, descricao } = req.body;
        let { id } = req.params;

        let a = await db.infob_mw_comentario.update({
            nm_lista: nome_lista,
            ds_descricao: descricao
        },
        {
            where: {id_lista: id}
        })
        resp.send("Lista popular alterado!");
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})

app.get('/listaAssistirT', async(req, resp) => {
    try {
        let x = await db.infob_mw_lista_item.findAll();
        resp.send(x);
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})


app.post('/listaAssistirT', async (req, resp) => {
    try{
        let {filme, lista } = req.body;

        let x = await db.infob_mw_lista_item.create({
            id_filme: filme,
            id_lista: lista
        })
         resp.send('lista criada!')  
    } catch(e) {
         resp.send({erro: e.toString() })
    }

})

app.delete('/listaAssistirT/:id', async(req, resp) => {
    try {
        let { id } = req.params;

        let d = await db.infob_mw_lista_item.destroy({ where: {id_lista: id }})
        resp.send('Lista removida!')
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})

app.get('/comentario', async(req, resp) => {
    try {
        let c = await db.infob_mw_comentario.findAll();
        resp.send(c);
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})



app.post('/comentario', async(req, resp) => {
    try {
        let { filme, usuario, mensagem, curtidas } = req.body;
        
        let i = await db.infob_mw_comentario.create({
            id_filme: filme,
            id_usuario: usuario,
            ds_mensagem: mensagem,
            dt_comentario: new Date,
            ds_curtidas: curtidas
        })
        resp.send("Comentario inserido!");
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.put('/comentario/:id', async(req, resp) => {
    try {
        let { filme, usuario, mensagem,curtidas } = req.body;
        let { id } = req.params;

        let a = await db.infob_mw_comentario.update({
            id_filme: filme,
            id_usuario: usuario,
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


app.delete('/comentario/:id', async(req, resp) => {
    try {
        let { id } = req.params;
        let c = db.infob_mw_comentario.destroy({ where: {id_cometario: id}})
        resp.send("Comentario removido!");
    } catch(e) {
        resp.send({ erro: e.toString()});
    }
})



app.get('/lista_popular', async(req, resp) => {
    try {
        let c = await db.infob_mw_lista.findAll();
        resp.send(c);
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})


app.put('/lista_popular/:id', async(req, resp) => {
    try {
        let { nome_lista, descricao } = req.body;
        let { id } = req.params;

        let a = await db.infob_mw_comentario.update({
            nm_lista: nome_lista,
            ds_descricao: descricao
        },
        {
            where: {id_lista: id}
        })
        resp.send("Lista popular alterado!");
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})

app.delete('/MeusF_Ja', async (req,resp) => { 
    try{ 
        let { id } = req.params; 
        let Filme_Ja = db.infob_mw_filme_ja_assistidos.destroy({ where: { id_filme: id }}) 
        resp.send("Filme removido!"); 
     } catch(e) { 
         resp.send({ erro: e.toString()}); 
     }
  } )




app.listen(process.env.PORT,
    x => console.log(`Subiu a api, hehe ${process.env.PORT}`))