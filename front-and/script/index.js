const urlApi = "http://localhost:3000/animes";

const lista = document.getElementById("card-informacoes");

let edicao = false;

// Faz uma requisição do tipo [GET] que recebe todas as vagas cadastradas.
const getAnimes = async () => {
  // espera o assincronismo acontecer
  const Promisse = await fetch(urlApi);
  const data = await Promisse.json();
  console.log(data);

  // interamos o array passando item por item e renderizando na tela (map)
  data.map((anime) => {
    lista.insertAdjacentHTML(
      "beforebegin",
      `
          <div id="card-informacoes">
            <div id="nome-anime-card">
              <h4>Anime</h4>
            </div>
            <p id="cards-p1">NOME:</p><p class="cards-p2"><input class="inputs-cards" type="text" placeholder=${anime.nome}></p>
            <p id="cards-p1">GÊNERO:</p><p class="cards-p2"><input class="inputs-cards" type="text" placeholder=${anime.genero}></p>
            <p id="cards-p1">NOTA:</p><p class="cards-p2"><input class="inputs-cards" type="text" placeholder=${anime.nota}></p>
            <p id="cards-p1">IMG:</p><p class="cards-p2"><input class="inputs-cards" type="url" placeholder="Url"/><img id="img-card" src=${anime.imgUrl}></p>
            <div class="container-btn">
              <button class="btn-editar" onclick="putAnime(${anime.id})">Editar</button>
              <button class="btn-excluir" type="button" onclick="deletaAnime">Excluir</button>
            </div>
          </div>
      `
    );
  });
};
getAnimes();

// [POST] que cadastra as novas vagas no backend.
const submitForm = async (evento) => {
  evento.preventDefault();
  // precisamos pegar os valores que o usuario digita no formulario.
  // buscar o input e buscar seu value.

  let nome = document.getElementById('nome').value;
  let genero = document.getElementById('genero').value;
  let nota = document.getElementById('nota').value;
  let url = document.getElementById('url').value;

  // adicionamos os valores dos inputs em campos do nosso objeto anime
  const anime = {
    nome,
    genero,
    nota,
    url
  }
  console.log(anime);

  if (!edicao) {
     // configurando a requisição antes dela ser disparada.
  const request = new Request(`${urlApi}/add`, {
    method: 'POST',
    body: JSON.stringify(anime),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })

  // chamamos a função fetch de forma assincrona de acordo com as nossas configurações anteriores
  const response = await fetch(request);
  // pegamos o resultado do fetch assincrono e acessamos o body no formato json.
  const result = await response.json();

  } else {
  // configurando a requisição antes dela ser disparada.
  const request = new Request(`${urlApi}/add`, {
    method: 'PUT',
    body: JSON.stringify(anime),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })

  // chamamos a função fetch de forma assincrona de acordo com as nossas configurações anteriores
  const response = await fetch(request);
  // pegamos o resultado do fetch assincrono e acessamos o body no formato json.
  const result = await response.json();

  }

  lista.innerHTML = '';

  if (result) {
    getAnimes();
  }
}
// retorna um unico anime
const getAnime = async (id) => {
  // http://localhost:3000/animes/id
  const response = await fetch(`${urlApi}/${id}`);
  return data = response.json();
}

const putAnime = async (id) => {
  edicao = true;
  const idAnime = id;
  const anime = await getAnime(idAnime);

  let nomeEl = document.getElementById('nome');
  let generoEl = document.getElementById('genero');
  let notaEl = document.getElementById('nota');
  let urlEl = document.getElementById('url');

  // atribundo ao value a chamda que vem da api
  nomeEl.value = anime.nome;
  generoEl.value = anime.genero;
  notaEl.value = anime.nota;
  urlEl.value = anime.url;

  // pegando o valor do value
  const atualizaValor = {
    nome: nomeEl.value,
    genero: generoEl.value,
    nota: nota.value,
    url: rul.value,
  }

  console.log(atualizaValor);
}


