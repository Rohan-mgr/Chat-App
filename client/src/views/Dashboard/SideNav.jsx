import { useState } from "react";
import Button from "../../components/common/Button";
import { _remove } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import useFetchChats from "../../hooks/useFetchChats";
import NameInitials from "../../components/common/NameInitials";
import { useFormik } from "formik";
import { BsSearch } from "react-icons/bs";
import { startChat } from "../../services/chat";
import { searchUsers } from "../../services/user";
import ScaleLoader from "react-spinners/ScaleLoader";

function SideNav() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const { isLoading, chats, setChats } = useFetchChats();

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (_, { resetForm }) => {
      resetForm();
      console.log("submitted");
      setShowSearch(false);
    },
  });

  const handleInputChange = async (e) => {
    e.preventDefault();
    const searchValue = e.target.value;
    if (searchValue.length > 0) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
    try {
      const response = await searchUsers(searchValue);
      setSearchedUsers(response?.data?.users);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const handleSearchedUserClick = async (userId) => {
    try {
      const response = await startChat(userId);
      setChats((prevState) => {
        return [response?.data, ...prevState];
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

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
            autoComplete="off"
            value={formik.values.search}
            onChange={(e) => {
              formik.handleChange(e);
              handleInputChange(e);
            }}
          />
        </form>
      </div>
      {!showSearch ? (
        <div className="side__nav__users">
          {isLoading ? (
            <ScaleLoader color="#0D6EFD" style={{ textAlign: "center" }} />
          ) : chats?.length > 0 ? (
            chats?.map((chat) => {
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
            })
          ) : (
            <p>No Chats Found!</p>
          )}
        </div>
      ) : (
        <div className="side__nav__searchedUsers">
          {searchedUsers?.map((user) => {
            return (
              <NameInitials
                handleClick={() => {
                  handleSearchedUserClick(user?._id);
                  formik.values.search = "";
                  navigate(`/chat/${user?._id}`, {
                    state: user,
                  });
                  setShowSearch(false);
                }}
                key={user?._id}
                name={user?.fullName}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SideNav;
