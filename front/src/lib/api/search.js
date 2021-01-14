import client from './client';

export const getAllJobs = () => {
  return client.get('/api/search/jobs');
};
