import 'dotenv/config';

var apiKey = process.env.API_KEY_CHALLENGE_4;

let requestToken = '';
let username = '';
let password = '';
let sessionId = '';
let listId = '7101979';

let loginButton = document.getElementById('login-button')! as HTMLButtonElement;
let searchButton = document.getElementById('search-button')! as HTMLButtonElement;
let searchContainer = document.getElementById('search-container')!;

loginButton.addEventListener('click', async () => {
  await createRequestToken();
  await sigIn();
  await createSession();
})

interface Movie {
  original_title: string;
}

interface MoviesResult {
  results: Movie[];
}

searchButton.addEventListener('click', async () => {
  let myList = document.getElementById("myList");
  if (myList) {
    myList.outerHTML = "";
  }
  let query = (document.getElementById('search')! as HTMLInputElement).value;
  let moviesList = await findMovie(query) as MoviesResult;
  let ul = document.createElement('ul');
  ul.id = "myList"
  for (const item of moviesList.results) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item.original_title))
    ul.appendChild(li)
  }
  console.log(moviesList);
  searchContainer.appendChild(ul);
})

function inputPassword() {
  password = (document.getElementById('senha')! as HTMLInputElement).value;
  validateLoginButton();
}

function inputLogin() {
  username =  (document.getElementById('login')! as HTMLInputElement).value;
  validateLoginButton();
}

function inputApiKey() {
  apiKey = (document.getElementById('api-key')! as HTMLInputElement).value;
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

interface BodySigIn{
  username: string;
  password: string;
  request_token: string;
}

interface BodyCreateList{
  name: string;
  description: string;
  language: string;
}

interface BodyAddMovieToList{
  media_id: string; 
}

interface HTTPParams{
  url: string;
  method: string;
  body?: BodySigIn | BodyCreateList | BodyAddMovieToList | string | null
}

class HttpClient {
  static async get({url, method, body = null}: HTTPParams) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}

async function findMovie(query: string) {
  query = encodeURI(query)
  //console.log(query)
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: "GET"
  })
  return result
}

async function addMovie(movieId: string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`,
    method: "GET"
  })
  //console.log(result);
}

interface ResultRequestToken {
  success: boolean;
  expires_at: Date;
  request_token: string;
}

async function createRequestToken () {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET"
  }) as ResultRequestToken;
  requestToken = result.request_token
}

async function sigIn() {
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: "POST",
    body: {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  })
}

interface ResultCreateSession {
  success: boolean;
  session_id: string;
}

async function createSession() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: "GET"
  }) as ResultCreateSession;
  sessionId = result.session_id;
}

async function createList(listName: string, description: string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      name: listName,
      description,
      language: "pt-br"
    }
  })
  console.log(result);
}

async function addMovieToList(movieId: string, listId: string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: movieId
    }
  })
  console.log(result);
}

async function getList() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: "GET"
  })
  console.log(result);
}

{/* <div style="display: flex;">
  <div style="display: flex; width: 300px; height: 100px; justify-content: space-between; flex-direction: column;">
      <input id="login" placeholder="Login" onchange="inputLogin(event)">
      <input id="senha" placeholder="Senha" type="password" onchange="inputPassword(event)">
      <input id="api-key" placeholder="Api Key" onchange="inputApiKey()">
      <button id="login-button" disabled>Login</button>
  </div>
  <div id="search-container" style="margin-left: 20px">
      <input id="search" placeholder="Escreva...">
      <button id="search-button">Pesquisar Filme</button>
  </div>
</div>*/}