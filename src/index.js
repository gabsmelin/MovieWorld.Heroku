import db from "./db.js";
import express from 'express'
import cors from 'cors'
import enviarEmail  from "./enviarEmail.js"; 
import crypto from 'crypto-js'


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


app.listen(process.env.PORT,
    x => console.log(`Subiu a api, hehe ${process.env.PORT}`))