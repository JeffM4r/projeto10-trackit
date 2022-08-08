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

function sendHabit(post, token) {
  const promise = axios.post(`${BASE_URL}/habits`, post , token);
  return promise
}

function receiveHabit(token) {
  const promise = axios.get(`${BASE_URL}/habits`,token);
  return promise
}

function deleteHabit(id, token){
  const promise = axios.delete(`${BASE_URL}/habits/${id}`,token);
  return promise
}

export { login, signUp, sendHabit, receiveHabit, deleteHabit };