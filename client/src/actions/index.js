import axios from 'axios';

import { getUserCookie } from '../cookie';

const token = getUserCookie('token');

// const apiRootProduction = 'https://our-chat-a.herokuapp.com/';
// const apiRootTesting = 'http://192.168.43.95:5000/';

// const apiRoot = apiRootTesting;
const apiRoot = '';

export const registerUser = async (name, phone, pin) => {
	const response = await axios.post(`${apiRoot}register-user`, {
    name,
    phone,
    pin,
  });

  const { data } = response;

  return data;
};

export const loginUser = async (phone, pin) => {
  const response = await axios.post(`${apiRoot}login-user`, {
    phone,
    pin,
  });

  const { data } = response;

  return data;
};

export const getUsers = async () => {
  const response = await axios.get(`${apiRoot}get-users`);

  const data = response.data;
  const result = data.result;

  return result;
};

export const getUserDetails = async userIds => {
	const response = await axios.post(
    `${apiRoot}get-user-details`,
    { userIds },
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }},
  );

  const data = response.data;
  const result = data.result;

  return result;
};

export const startChat = async (userOne, userTwo) => {
  const response = await axios.post(
    `${apiRoot}start-chat`,
    { userOne, userTwo },
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }},
  );

  const data = response.data;

  return {
    success: data.success,
    result: data.result,
  }
};

export const getFriends = async userId => {
  const response = await axios.post(
    `${apiRoot}get-friends`,
    { userId },
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }},
  );

  const data = response.data;

  return data;
};

export const searchNumbers = async num => {
  const response = await axios.post(
    `${apiRoot}search-numbers`,
    { num },
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }},
  );

  const { data } = response;

  return {
    success: data.success,
    result: data.result,
  };
}

export const getChats = async userId => {
	const response = await axios.post(`${apiRoot}get-chats`, {
    userId,
  });

  const data = response.data;
  const result = data.result;

  return result;
};

export const getConversation = async chatId => {
	const response = await axios.post(
    `${apiRoot}get-conversation`,
    { chatId },
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }},
  );

  const { data } = response;

  return data;
};

export const postConversation = async (chatId, authorId, message, time) => {
	const response = await axios.post(
    `${apiRoot}post-conversation`,
    {
      chatId,
      authorId,
      message,
      time,
    },
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }},
  );

  const { data } = response;
  console.log({response, data})
  return data;
};