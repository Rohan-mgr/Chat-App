import { useEffect, useState } from "react";
import nameInitials from "name-initials";

function NameInitials({ name, message, handleClick }) {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    setMsg(message);
  }, [msg]);
  return (
    <div className="name__initials" onClick={handleClick || null}>
      <div className="name__initials__wrapper">
        <span>{nameInitials(name)}</span>
      </div>
      <div className="name__initials__content">
        <p>{name}</p>
        {msg && <span>{msg}</span>}
      </div>
    </div>
  );
}

export default NameInitials;
