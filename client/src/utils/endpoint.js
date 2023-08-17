import { config } from "../axios-config";

export const userEndpoints = {
  users: config.baseURL + "/user",
  signup: config.baseURL + "/user/signup",
  login: config.baseURL + "/user/login",
  search: config.baseURL + "/user/search",
  chats: config.baseURL + "/chat",
};

export const chatEndpoints = {
  chats: config.baseURL + "/chat",
};
