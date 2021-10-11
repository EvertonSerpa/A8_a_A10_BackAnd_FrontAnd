// BACKEND DE ANIMES

// importar o express
const express = require('express');

// importa o cors
const cors = require('cors');

// inicializar o express e atribuir em uma constante
const app = express();

// falar para o express ultilizar o middleware()
// fala para o express trabalhar com o JSON.
app.use(express.json())

// fala para o express ultilizar as configurações do cors
app.use(cors());

// estou importando as rotas dos animes.
const AnimesRouter = require('../back-and/routers/animes.routes')
// estou inicializando a rota /animes de acordo com as configurações do arquivo AnimesRouter.
app.use('/animes', AnimesRouter);
//criação de rotas



//http://localhost:3000/
app.get('/', (req, res) => {
    res.send('Anime é vida!');
})



// definir em qual porta iremos rodar a aplicação
const port = 3000;

app.listen(port, () => {
    console.log(`O serivodr está rodando na porta http://localhost:${port}/`);
})