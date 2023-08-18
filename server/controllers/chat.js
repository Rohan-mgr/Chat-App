const Chat = require("../models/chat");

exports.handleChat = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "User does not Exists" });
  }

  try {
    let isChat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: id } } },
        { users: { $elemMatch: { $eq: req?.userId } } },
      ],
    }).populate("users", "-password");

    if (isChat.length > 0) {
      throw new Error("Chat already exists");
    } else {
      const chatData = {
        groupName: "one to one chat",
        users: [id, req?.userId],
      };

      const createChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createChat?._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(fullChat);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.fetchChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req?.userId } },
    })
      .populate("users", "-password")
      .sort({ updatedAt: -1 });
    res.status(200).send(chats);
  } catch (error) {
    res.status(200).json({ message: "Internal Server Error" });
  }
};
