import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMessages } from "../../services/chat";
import { _getSecureLs } from "../../utils/storage";
import ChatItem from "./ChatItem";
import openSocket from "socket.io-client";
// import { isLastMessage } from "../../helper/chat";

export default function ChatBody() {
  // const { selectedChat } = useContext(ChatContext);
  const { user } = _getSecureLs("auth");
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await fetchMessages(chatId);
        setMessages(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChatMessages();
    const socket = openSocket(import.meta.env.VITE_APP_BASE_URL);
    socket.on("save-messsage", (data) => {
      if (data?.action === "create") {
        console.log(data, "socket chat body");
        addMessage(data);
      }
    });
  }, [chatId]);

  const addMessage = (data) => {
    console.log(
      typeof chatId,
      chatId,
      typeof data?.message?.chat?._id,
      data?.message?.chat?._id
    );
    if (!chatId || chatId === data?.message?.chat?._id) {
      setMessages((prevState) => [...prevState, data?.message]);
    } else {
      return null;
    }
  };

  return (
    <div className="chat__body">
      {messages?.length > 0 ? (
        messages
          .slice()
          .reverse()
          .map((m) => (
            <ChatItem
              key={m?._id}
              isSender={user?._id === m?.sender?._id ? true : false}
            >
              {m?.content}
            </ChatItem>
          ))
      ) : (
        <p style={{ textAlign: "center" }}>Say hi 🖐</p>
      )}
    </div>
  );
}
