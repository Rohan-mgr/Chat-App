import React from "react";

export default function ChatItem({ children, isSender }) {
  console.log(isSender);
  return (
    <div className={`chat__item ${isSender && "isSender"}`}>{children}</div>
  );
}
