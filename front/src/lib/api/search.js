import client from './client';

export const getInitialTags = (params) => {
  return client.get('/api/search/initialTags');
};

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

export const getAllSubGroups = (params) => {
  if (params) {
    return client.get('/api/search/subGroups', {
      params: {
        params: params,
      },
    });
  }
  return client.get('/api/search/subGroups');
};

export const getAllInterests = (params) => {
  if (params) {
    return client.get('/api/search/interests', {
      params: {
        params: params,
      },
    });
  }
  return client.get('/api/search/interests');
};

export const getOneSurvey = (params) => {
  return client.get(`/api/survey/read/${params}`);
};

export const getResult = (params) => {
  return client.get(`/api/survey/result/${params}`);
};

export const getMySurveys = () => {
  return client.get(`/api/info/surveys`);
};

export const getSurveys = () => {
  return client.get(`/api/surveys/index`).catch((err) => {
    throw err;
  });
};
