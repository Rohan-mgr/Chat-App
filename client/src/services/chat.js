import { httpAuth } from "../utils/http";
import { chatEndpoints } from "../utils/endpoint";

export const fetchChats = async () => {
  const URL = chatEndpoints.chats;
  const response = await httpAuth.get(URL);
  return response;
};
