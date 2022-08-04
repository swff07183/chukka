import client from './client';

export const login = async (data) => {
  const res = await client.post('accounts/login/', data);
  return res;
};

export const register = async (data) => {
  const res = await client.post('accounts/signup/', data);
  return res;
};

export const getToken = async (userId, refreshToken) => {
  const config = {
    headers: {
      'refresh-token': `${refreshToken}`,
    },
  };
  const res = await client.post('accounts/refresh/', userId, config);
  return res.data;
};

export const idCheck = async (userId) => {
  const res = await client.get(`accounts/checkid/${userId}/`);
  // console.log(res);
  return res.data;
};
export const nickCheck = async (userNickname) => {
  const res = await client.get(`accounts/checkid/${userNickname}/`);
  console.log(res);
  return res.data;
};
