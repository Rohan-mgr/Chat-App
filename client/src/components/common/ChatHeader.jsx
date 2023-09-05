import NameInitials from "./NameInitials";

export default function ChatHeader({ username }) {
  return (
    <div className="chat__header">
      <NameInitials name={username} />
    </div>
  );
}
