import client from './client';

export const getAllJobs = (params) => {
  if (params) {
    return client.get('/api/search/jobs', {
      params: {
        params: params,
      },
    });
  }
  return client.get('/api/search/jobs');
};
