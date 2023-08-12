import Button from "../../components/common/Button";
import { _remove } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import useFetchUsers from "../../hooks/useFetchUsers";
import NameInitials from "../../components/common/NameInitials";

function SideNav() {
  const navigate = useNavigate();
  const { isLoading, users } = useFetchUsers();

  const handleLogout = () => {
    _remove("auth");
    navigate("/");
  };
  return (
    <div className="side__nav">
      SideNav{" "}
      <Button type="button" handleClick={handleLogout}>
        Logout
      </Button>
      {users.map((user) => {
        return (
          <NameInitials
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
