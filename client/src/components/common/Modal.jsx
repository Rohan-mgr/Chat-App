import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { BsSearch } from "react-icons/bs";
import { searchUsers } from "../../services/user";
import { SocketContext } from "../../context/socket.context";
import { createGroupChat } from "../../services/chat";
import { AiFillCloseCircle } from "react-icons/ai";
import useFetchChats from "../../hooks/useFetchChats";

export default function RoomModal({ show, handleClose }) {
  const { socket } = useContext(SocketContext);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [roomName, setRoomName] = useState("");
  const { chats, setChats } = useFetchChats();

  console.log(chats);
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

  useEffect(() => {
    setSearchedUsers([]);
    setSelectedUsers([]);
    setRoomName("");
  }, []);

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
      console.log(response);
      setSearchedUsers(response?.data?.users);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUsers((prevState) => {
      return [...prevState, user];
    });
    formik.values.search = "";
    setShowSearch(false);
  };

  const handleCreateRoom = async () => {
    try {
      const response = await createGroupChat(roomName, selectedUsers);
      console.log(response);
      setChats((prevState) => {
        return [response?.data, ...prevState];
      });
    } catch (error) {
      console.log(error);
    }
    socket.emit("create", roomName);
    handleClose();
  };

  const handleUserRemove = (userId) => {
    const updatedUserList = selectedUsers.filter(
      (user) => user?._id !== userId
    );
    setSelectedUsers(updatedUserList);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          required
          className="mb-2"
          type="text"
          placeholder="Room Name"
          name="roomName"
          autoComplete="off"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <div className="selected__users">
          {selectedUsers.length > 0 &&
            selectedUsers.map((user) => (
              <React.Fragment key={user?._id}>
                <p>{user?.fullName}</p>{" "}
                <AiFillCloseCircle
                  onClick={() => handleUserRemove(user?._id)}
                  style={{ marginTop: "-17px", cursor: "pointer" }}
                />
              </React.Fragment>
            ))}
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

        {showSearch && searchedUsers.length > 0 && (
          <div className="searched__users">
            {searchedUsers.map((user) => (
              <p
                key={user?._id}
                style={{ cursor: "pointer" }}
                onClick={() => handleUserClick(user)}
              >
                {user?.fullName}
              </p>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleCreateRoom}>
          Create Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
