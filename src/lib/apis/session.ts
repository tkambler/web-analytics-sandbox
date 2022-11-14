import { axios } from '@app/axios';

export const createSession = async (email: string, password: string) => {
  const result = await axios({
    method: 'POST',
    url: '/session',
    data: {
      email,
      password,
    },
  });
  return result.data.data;
};

export const getSession = async () => {
  const result = await axios({
    method: 'GET',
    url: '/session',
  });
  return result.data.data;
};

export const destroySession = async () => {
  await axios({
    method: 'DELETE',
    url: '/session',
  });
};
