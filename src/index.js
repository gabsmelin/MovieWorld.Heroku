import db from "./db";
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

    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.listen(process.env.PORT,
    x => console.log(`Subiu a api, hehe ${process.env.PORT}`))