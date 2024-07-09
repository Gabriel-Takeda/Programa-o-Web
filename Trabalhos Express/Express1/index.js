const express = require("express")
const dotenv = require("dotenv");

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT ?? 8080;

const app = express()

app.get("/",(req, res)=> {
    res.send("PAULINHA MEU AMOR")
})

app.listen(PORT, ()=> {
    console.log(`aplicação executando na porta ${PORT}`)
})