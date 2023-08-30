import { useState } from "react";
import ChatContext from "./ChatContext";

const ChatState = (props) => {
  const [selectedChat, setSelectedChat] = useState({});

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
