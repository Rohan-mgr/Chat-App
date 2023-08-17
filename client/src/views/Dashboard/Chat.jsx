import { useParams, useLocation } from "react-router-dom";

function Chat() {
  const { userId } = useParams();
  const { state } = useLocation();
  return (
    <div className="chat">
      <h2>Name: {state?.fullName}</h2>
      <p>User email: {state?.email}</p>
      <p>User Id: {userId}</p>
    </div>
  );
}

export default Chat;
