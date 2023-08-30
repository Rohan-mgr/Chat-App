export const isLastMessage = (messages, index, userId) => {
  return (
    index === messages.length - 1 &&
    messages[messages.length - 1].sender?._id !== userId &&
    messages[messages.length - 1].sender?._id
  );
};
