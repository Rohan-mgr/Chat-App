import { config } from "../axios-config";

export const userEndpoints = {
  signup: config.baseURL + "/user/signup",
  login: config.baseURL + "/user/login",
};
