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

export const getAllGroups = (params) => {
  if (params) {
    return client.get('/api/search/groups', {
      params: {
        params: params,
      },
    });
  }
  return client.get('/api/search/groups');
};
