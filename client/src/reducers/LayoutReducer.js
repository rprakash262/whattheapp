import socketIOClient from "socket.io-client";

import {
  getFriends,
  getUserDetails,
  searchNumbers,
  startChat,
  getConversation,
  postConversation,
} from '../actions';
import { getUserCookie, deleteCookie } from '../cookie';
import { setCurrentUser } from './LoginReducer';

// const ENDPOINT = "http://localhost:5000";
const ENDPOINT = 'https://arcane-wildwood-43524.herokuapp.com';
const socket = socketIOClient(ENDPOINT);

const INIT = 'LayoutReducer/INIT';
const SET_SELECTED_CHAT_ID = 'LayoutReducer/SET_SELECTED_CHAT_ID';
const SET_SELECTED_CHAT = 'LayoutReducer/SET_SELECTED_CHAT';
const SET_LOADING_APP = 'LayoutReducer/SET_LOADING_APP';
const TOGGLE_MODAL = 'LayoutReducer/TOGGLE_MODAL';
const SEARCHING_NUM_INPUT = 'LayoutReducer/SEARCHING_NUM_INPUT';
const SET_SEARCHING_NUMBER = 'LayoutReducer/SET_SEARCHING_NUMBER';
const SET_SUGGESTION_NUMBERS = 'LayoutReducer/SET_SUGGESTION_NUMBERS';
const SET_ACTIVE_CHATS = 'LayoutReducer/SET_ACTIVE_CHATS';
const CHANGE_TEXT_MSG = 'LayoutReducer/CHANGE_TEXT_MSG';
const SET_MESSAGES = 'LayoutReducer/SET_MESSAGES';
const SET_FETCHING_MESSAGES = 'LayoutReducer/SET_FETCHING_MESSAGES';
const SET_USER_ID = 'LayoutReducer/SET_USER_ID';
const TOGGLE_LEFT_HEADER_DROPDOWN = 'LayoutReducer/TOGGLE_LEFT_HEADER_DROPDOWN';
const IS_SENDING_MSG = 'LayoutReducer/IS_SENDING_MSG';

const setSelectedChatId = chatId => ({ type: SET_SELECTED_CHAT_ID, chatId });
const setSelectedChat = chat => ({ type: SET_SELECTED_CHAT, chat });
const setLoadingApp = bool => ({ type: SET_LOADING_APP, bool });
const toggleModal = bool => ({  type: TOGGLE_MODAL, bool });
const setSearchingNumberInput = num => ({ type: SEARCHING_NUM_INPUT, num });
const setSearchingNumber = bool => ({ type: SET_SEARCHING_NUMBER, bool });
const setSuggestionNumbers = numbers => ({ type: SET_SUGGESTION_NUMBERS, numbers });
const setActiveChats = activeChats => ({ type: SET_ACTIVE_CHATS, activeChats });
const changeTextMsg = textMsg => ({ type: CHANGE_TEXT_MSG, textMsg });
const setMessages = messages => ({ type: SET_MESSAGES, messages });
const setFetchingMessages = bool => ({ type: SET_FETCHING_MESSAGES, bool });
const setUserId = userId => ({ type: SET_USER_ID, userId });
const toggleLeftHeaderDropdown = bool => ({ type: TOGGLE_LEFT_HEADER_DROPDOWN, bool });
const sendingMsg = bool => ({ type: IS_SENDING_MSG, bool });

const defaultState = {
  loadingApp: true,
  selectedChatId: null,
  selectedChat: {},
  activeChats: [],
  showModal: false,
  searchingNumber: false,
  searchingNumberInput: null,
  suggestionNumbers: [],
  messages: [],
  textMsg: '',
  fetchingMessages: false,
  userId: '',
  leftHeaderDropdown: false,
  isSendingMsg: false,
};

const randomIdGenerator = txt => {
  const randomNumber1 = Math.floor(Math.random() * 1000);
  const randomNumber2 = Math.floor(Math.random() * 10000);
  return `${randomNumber1}${txt}${randomNumber2}`;
}

const init = () => async (dispatch, getState) => {
  const user = JSON.parse(getUserCookie('user'));
  const token = getUserCookie('token');
  const { userId } = user;

  dispatch(setUserId(userId));
  
  try {
    const response = await getFriends(userId, token);
    const { result } = response;
    const friendIds = result.map(frnd => frnd.userTwo);
    const friendsDetails = await getUserDetails(friendIds);

    let transformedFriendsDetails = [];
    
    if (friendsDetails.length > 0) {
      transformedFriendsDetails = friendsDetails.map(d => ({
        userId: d.userId,
        chatId: result.find(p => p.userTwo === d.userId).chatId,
        chatNumber: d.phone,
        chatName: d.name,
        chatImage: d.image,
      }));
    }
    
    dispatch(setActiveChats(transformedFriendsDetails));
    dispatch(setLoadingApp(false));
  } catch (err) {
    console.log(err);
    dispatch(setLoadingApp(false));
  }
}

export const scrollToBottom = () => {
  const elm = document.getElementById('scrollBottom');

  if (elm) {
    elm.scrollTop = elm.scrollHeight;
  }
}

const selectChat = chat => async (dispatch, getState) => {
  const { chatId } = chat;

  dispatch(setFetchingMessages(true));
  dispatch(setSelectedChatId(chatId));
  dispatch(setSelectedChat(chat));
  
  socket.on('receive-msg', newMsg => {
    const { messages } = getState().layout;
    messages.push(newMsg);
    dispatch(setMessages(messages));
    scrollToBottom();
  });

  try {
    const response = await getConversation(chatId);
    const { result } = response;
    const { conversation } = result;

    dispatch(setMessages(conversation));
    dispatch(setFetchingMessages(false));
  } catch (err) {
    console.log(err);
    dispatch(setFetchingMessages(false));
  }
}

const changeSearchingNumberInput = num => async (dispatch, getState) => {
  dispatch(setSearchingNumber(true));
  dispatch(setSearchingNumberInput(num));

  if (!num) {
    return dispatch(setSuggestionNumbers([]));
  };

  try {
    const token = getUserCookie('token');
    const response = await searchNumbers(num, token);
    const numbers = response.result;
    dispatch(setSearchingNumber(false));
    dispatch(setSuggestionNumbers(numbers));
  } catch (err) {
    dispatch(setSearchingNumber(false));
  }
};

const selectSuggestion = user => async (dispatch, getState) => {
  const { userId, name, image, phone } = user;
  const currentUser = JSON.parse(getUserCookie('user'));
  const { userId: currentUserId } = currentUser;
  const { activeChats } = getState().layout;

  try {
    const response = await startChat(currentUserId, userId);
    const { result } = response;

    const newActiveChat = {
      chatId: result.chatId,
      chatName: name,
      chatNumber: phone,
      chatImage: image,
    };

    activeChats.push(newActiveChat);

    dispatch(setActiveChats(activeChats));
    dispatch(setSelectedChatId(result.chatId));
    dispatch(toggleModal(false));
  } catch (err) {
    console.log(err);
  }
};

const sendMsg = e => async (dispatch, getState) => {
  e.preventDefault();
  dispatch(sendingMsg(true));
  const { textMsg, selectedChatId, messages } = getState().layout;
  const user = JSON.parse(getUserCookie('user'));
  const { userId } = user;

  const id = randomIdGenerator(textMsg)
  const newMsg = {
    id,
    author: userId,
    message: textMsg,
    status: 'sent',
    time: new Date(),
  };

  try {
    // await postConversation(selectedChatId, userId, textMsg, new Date());
    await socket.emit('send-msg', { selectedChatId, userId, textMsg, time: new Date(), msgId: id });

    messages.push(newMsg);
    dispatch(setMessages(messages));
    scrollToBottom();
    dispatch(changeTextMsg(''));
    dispatch(sendingMsg(false));
  } catch (err) {
    console.log(err);
    dispatch(sendingMsg(false));
  }
}

const logout = () => {
  deleteCookie();
  setCurrentUser({});
  window.location.href = '/login';
}

export const ACTIONS = {
  init,
  selectChat,
  toggleModal,
  changeSearchingNumberInput,
  selectSuggestion,
  changeTextMsg,
  sendMsg,
  showLeftHeaderDropdown : () => toggleLeftHeaderDropdown(true),
  hideLeftHeaderDropdown : () => toggleLeftHeaderDropdown(false),
  logout,
};

const optsToState = apiData => {
  return {};
};

function LayoutReducer(state = defaultState, action) {
  switch (action.type) {
    case INIT:
      return Object.assign({}, state, optsToState(action.opts));
    case SET_SELECTED_CHAT_ID:
      return Object.assign({}, state, { selectedChatId: action.chatId });
    case SET_SELECTED_CHAT:
      return Object.assign({}, state, { selectedChat: action.chat });
    case SET_LOADING_APP:
      return Object.assign({}, state, { loadingApp: action.bool });
    case TOGGLE_MODAL:
      return Object.assign({}, state, { showModal: action.bool });
    case SEARCHING_NUM_INPUT:
      return Object.assign({}, state, { searchingNumberInput: action.num });
    case SET_SEARCHING_NUMBER:
      return Object.assign({}, state, { searchingNumber: action.bool });
    case SET_SUGGESTION_NUMBERS:
      return Object.assign({}, state, { suggestionNumbers: action.numbers });
    case SET_ACTIVE_CHATS:
      return Object.assign({}, state, { activeChats: action.activeChats });
    case CHANGE_TEXT_MSG:
      return Object.assign({}, state, { textMsg: action.textMsg });
    case SET_MESSAGES:
      return Object.assign({}, state, { messages: action.messages });
    case SET_FETCHING_MESSAGES:
      return Object.assign({}, state, { fetchingMessages: action.bool });
    case SET_USER_ID:
      return Object.assign({}, state, { userId: action.userId });
    case TOGGLE_LEFT_HEADER_DROPDOWN:
      return Object.assign({}, state, { leftHeaderDropdown: action.bool });
    case IS_SENDING_MSG:
      return Object.assign({}, state, { isSendingMsg: action.bool });
    default:
      return state;
  }
}

export default LayoutReducer;