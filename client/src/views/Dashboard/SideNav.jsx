import Button from "../../components/common/Button";
import { _remove } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import useFetchUsers from "../../hooks/useFetchUsers";

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
          <div key={user?._id}>
            <h2>{user?.fullName}</h2>
            <p>{user?.email}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SideNav;
