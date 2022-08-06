import axios from 'axios';

const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit';

function login(login) {
  const promise = axios.post(`${BASE_URL}/auth/login`, login);
  return promise;
}

function signUp(cadastro) {
  const promise = axios.post(`${BASE_URL}/auth/sign-up`, cadastro);
  return promise;
}


export { login, signUp };