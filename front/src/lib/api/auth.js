import client from './client';

export const registerApi = (params) => {
  return client.post('/api/auth/store', params);
};

export const signApi = (params) => {
    return client.post('/api/auth/sign', params);
}

export const signCallbackApi = (params) => {
    return client.get(params.url, params.data);
}