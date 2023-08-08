import { http } from "../utils/http";
import { userEndpoints } from "../utils/endpoint";

export const userRegistration = async (credentials) => {
  const URL = userEndpoints.signup;
  console.log(URL, credentials);
  const response = await http.post(URL, credentials);
  return response;
};
