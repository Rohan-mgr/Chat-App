const Message = require("../models/Message");
const User = require("../models/user");
const Chat = require("../models/chat");
const io = require("../socket");

exports.sendMessages = async (req, res) => {
  const { message, chatId } = req.body;

  if (!message || !chatId) {
    return res.status(400).send({ message: "Cannot send the message" });
  }

  const newMessage = {
    sender: req?.userId,
    content: message,
    chat: chatId,
  };
  try {
    let saveMessage = await Message.create(newMessage);
    saveMessage = await saveMessage.populate("sender");
    saveMessage = await saveMessage.populate("chat");
    saveMessage = await User.populate(saveMessage, {
      path: "chat.users",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: saveMessage,
    });
    io.getIO().emit("save-messsage", {
      action: "create",
      message: saveMessage,
    });
    res.status(200).json(saveMessage);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  const message = await Message.find({ chat: chatId })
    .populate("sender")
    .populate("chat");
  res.status(200).send(message);
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
