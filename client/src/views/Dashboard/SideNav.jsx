import Button from "../../components/common/Button";
import { _remove } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

function SideNav() {
  const navigate = useNavigate();

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
    </div>
  );
}

export default SideNav;
