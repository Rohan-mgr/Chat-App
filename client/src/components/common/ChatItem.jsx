import React from "react";

export default function ChatItem({ children, isSender }) {
  return (
    <div className={`chat__item ${isSender && "isSender"}`}>{children}</div>
  );
}
