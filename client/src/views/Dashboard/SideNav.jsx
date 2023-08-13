import Button from "../../components/common/Button";
import { _remove } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import useFetchUsers from "../../hooks/useFetchUsers";
import NameInitials from "../../components/common/NameInitials";
import { BiLogOutCircle } from "react-icons/bi";

function SideNav() {
  const navigate = useNavigate();
  const { isLoading, users } = useFetchUsers();

  const handleLogout = () => {
    _remove("auth");
    navigate("/");
  };
  return (
    <div className="side__nav">
      <div className="side__nav__header">
        <h3>Chats</h3>
        <div className="side__nav__header__button__wrapper">
          <Button type="button" handleClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
      {users.map((user) => {
        return (
          <NameInitials
            handleClick={() => navigate(`chat/${user?._id}`, { state: user })}
            key={user?._id}
            name={user?.fullName}
            message={"This is a message."}
          />
        );
      })}
    </div>
  );
}

export default SideNav;
