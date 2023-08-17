const Chat = require("../models/chat");

exports.handleChat = async (req, res) => {
  const { id } = req.params;
  console.log(id, req?.userId, "chat user & login user");

  if (!id) {
    return res.status(404).json({ message: "User does not Exists" });
  }

  try {
    let isChat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: req?.userID } } },
        { users: { $elemMatch: { $eq: req?.id } } },
      ],
    }).populate("users", "-password");

    if (isChat.length > 0) {
      return res.status(200).send(isChat[0]);
    } else {
      const chatData = {
        groupName: "group chat",
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
