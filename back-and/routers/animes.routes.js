const express = require("express");
const router = express.Router();

const animes = [
  {
    id: Date.now(),
    nome: "Dororo",
    genero: "Ação",
    nota: "10",
    imgUrl: "https://uploads.jovemnerd.com.br/wp-content/uploads/2018/12/dororo-poster.jpg"
  }
]

//[GET] /animes = Retorna uma lista de vagas.
router.get('/', (req, res) => {
    res.send(animes);
})

// primeiro fazemos uma requisição buscando a vaga por ai
// depois enviamos o objeto atualizado para fazer a atualização na lista
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const index = animes.findIndex(anime => anime.id == id);
  const anime = animes[index];
  res.send(anime);
})

// [PUT] Atualiza o anime pelo ID
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const animeAtualizado = req.body;
  const index = animes.findIndex(anime => anime.id == id);

  animes[index] // anime

  animes[index] = {
    id: animes[index].id,
    ...animeAtualizado
  }
  res.send(animes[index]);
})

// [POST] /add - cadastrar um novo anime.
router.post('/add', (req, res) => {
  const anime = req.body;
  anime.id = Date.now();
  animes.push(anime);
  res.status(201).send({
    menssage: 'Anime cadastrado com sucesso!',
    data: anime,
  });
})

module.exports = router;
