import db from "./db.js";
import express from 'express'
import cors from 'cors'
import crypto from 'crypto-js'

import enviarEmail from "./enviarEmail.js";

const app = express();
app.use(cors());
app.use(express.json());





/// Filmes Geral ///
app.get('/filme', async(req, resp) => {
    try {
        let a = await db.infob_mw_filme.findAll();

        a = a.map(item => {
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
        resp.send(a);
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})

app.post('/filme', async(req, resp) => {
    try {
        let { nome, genero, lancamento, diretor, sinopse, avaliacao, descricao, plataforma, img_maior, img_menor } = req.body;
    
        if(nome == "" && nome.length < 2 || genero == "" || genero <= 3 || lancamento == "" && lancamento.length < 2 || diretor == "" && diretor.length <= 0 || sinopse == "" && sinopse.length <= 0 || avaliacao == "" && avaliacao.length <= 0 || descricao == "" && descricao.length <= 0 || avaliacao.length <= 0 || descricao == "" && descricao.length <= 0 || plataforma == "" && plataforma.length <= 0 || img_menor == "" && img_menor.length <= 0 || img_maior == "" && img_maior.length <= 0) {
            resp.send({erro: '❌ Campos inválidos!'})
        } else {
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
        }
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})




app.put('/filme/:id', async(req, resp) => {
    try {
        let { nome, genero, lancamento, diretor, sinopse, avaliacao, descricao, plataforma, img_maior, img_menor } = req.body;
        let { id } = req.params;

        if(nome == "" && nome.length < 2 || genero == "" || genero <= 3 || lancamento == "" && lancamento.length < 2 || diretor == "" && diretor.length <= 0 || sinopse == "" && sinopse.length <= 0 || avaliacao == "" && avaliacao.length <= 0 || descricao == "" && descricao.length <= 0 || avaliacao.length <= 0 || descricao == "" && descricao.length <= 0 || plataforma == "" && plataforma.length <= 0 || img_menor == "" && img_menor.length <= 0 || img_maior == "" && img_maior.length <= 0) {
            resp.send({erro: '❌ Campos inválidos!'})
        } else {
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
        }
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






//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////





/// Filmes por gosto ///

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
    
        if(nome == "" && nome.length < 2 || genero == "" || genero <= 3 || lancamento == "" && lancamento.length < 2 || diretor == "" && diretor.length <= 0 || sinopse == "" && sinopse.length <= 0 || avaliacao == "" && avaliacao.length <= 0 || descricao == "" && descricao.length <= 0 || avaliacao.length <= 0 || descricao == "" && descricao.length <= 0 || plataforma == "" && plataforma.length <= 0 || img_menor == "" && img_menor.length <= 0 || img_maior == "" && img_maior.length <= 0) {
            resp.send({erro: '❌ Campos inválidos!'})
        } else {
            let i = await db.infob_mw_filme.create({
                nm_filme: nome,
                img_capa_menor: img_menor
            })
            resp.send("Filme inserido!");
        }
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})





//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////





/// Filmes populares ///

app.get('/filmespops', async(req, resp) => {
    try {
        let a = await db.infob_mw_filme.findAll({order: [['ds_avaliacao', 'desc']]});

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





/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////





app.get('/comentario', async(req, resp) => {
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


app.post('/comentario', async(req, resp) => {
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


app.put('/comentario/:id', async(req, resp) => {
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


app.delete('/comentario/:id', async(req, resp) => {
    try {
        let { id } = req.params;
        let c = db.infob_mw_comentario.destroy({ where: {id_cometario: id}})
        resp.send("Comentario removido!");
    } catch(e) {
        resp.send({ erro: e.toString()});
    }
})






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
        let { nome, sobrenome, username, email, senha, genero, localizacao, redes, fotoperfil, codigo } = req.body;
        
        let i = await db.infob_mw_usuario.create({
            nm_usuario: nome,
            nm_sobrenome: sobrenome,
            nm_username: username,
            ds_email: email,
            ds_senha: crypto.SHA256(senha).toString(crypto.enc.Base64),
            ds_genero: genero,
            ds_nascimento: new Date(),
            ds_localizacao: localizacao,
            ds_redes_sociais: redes,
            ds_foto: fotoperfil,
            ds_codigo_rec: codigo
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
        resp.send("Usuario removido!");
    } catch(e) {
        resp.send({ erro: e.toString()});
    }
})

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




app.post('/login', async (req, resp) => {
const senha = req.body.senha;
const cryptoSenha = crypto.SHA256(senha).toString(crypto.enc.Base64);
const usuario = await db.infob_mw_usuario.findOne({
    where: {
       ds_email: req.body.email,
       ds_senha: cryptoSenha
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
    <p> insira esse código ${codigo} para recuper sua conta
    
    `) 
    resp.send({ status: 'Código Enviado'});

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
     if (usuario.ds_codigo_rec !== req.body.code) {
        resp.send({ status: 'erro', mensagem: 'Código inválido.'});
     } 
     else{
     return resp.send({ status: 'ok', mensagem: 'Código validado.'});   
     }
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
     if (usuario.ds_codigo_rec !== req.body.codigo || 
        usuario.ds_codigo_rec === '') {
        resp.send({ status: 'erro', mensagem: 'Código inválido.'});
     }
     await db.infob_mw_usuario.update({
        ds_senha: req.body.novaSenha,
        ds_codigo_rec: ''
    }, {  
    where: { id_usuario: usuario.id_usuario }
    })
    resp.send({ status: 'ok', mensagem: 'Senha Alterada.'});
})

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

app.listen(process.env.PORT,
    x => console.log(`Subiu a api, hehe ${process.env.PORT}`))  