import nameInitials from "name-initials";

function NameInitials({ name, message }) {
  return (
    <div className="name__initials">
      <div className="name__initials__wrapper">
        <span>{nameInitials(name)}</span>
      </div>
      <div className="name__initials__content">
        <p>{name}</p>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default NameInitials;
