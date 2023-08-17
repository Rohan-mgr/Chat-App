import Button from "../../components/common/Button";
import { _remove } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import useFetchChats from "../../hooks/useFetchChats";
import NameInitials from "../../components/common/NameInitials";
import { useFormik } from "formik";
import { BsSearch } from "react-icons/bs";
import { searchUsers } from "../../services/user";

function SideNav() {
  const navigate = useNavigate();
  const { isLoading, chats } = useFetchChats();

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await searchUsers(values);
        console.log(response);
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
  });

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
      <div className="side__nav__search">
        <form onSubmit={formik.handleSubmit}>
          <BsSearch />
          <input
            type="text"
            placeholder="Search People"
            name="search"
            value={formik.values.search}
            onChange={formik.handleChange}
          />
        </form>
      </div>
      <div className="side__nav__users">
        {chats?.map((chat) => {
          return (
            <NameInitials
              handleClick={() =>
                navigate(`chat/${chat?.users[0]?._id}`, {
                  state: chat?.users[0],
                })
              }
              key={chat?.users[0]?._id}
              name={chat?.users[0]?.fullName}
              message={"This is a message."}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SideNav;
