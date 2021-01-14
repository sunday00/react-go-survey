import axios from 'axios';
const client = axios.create();

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default client;
