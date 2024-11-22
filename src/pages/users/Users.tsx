import { Box, TextField } from "@mui/material";
import "./Users.css";
import CustomButton from "../../components/customButton/CustomButton";
import CustomTable from "../../components/customTable/CustomTable";
import { config } from "../../config/config";
import { getData } from "../../services/apiService";
import { useState, useEffect } from "react";
import axios from "axios";
import UsersModal from "./UsersModal";
import CustomDialog from "../../components/customDialog/CustomDialog";
import { useToast } from "../../contexts/toastifyContext/ToastContext";

const Users = () => {
  console.log(config, "config");
  const { SERVER_URL, API_BASE_URL } = config;
  // Define the data type
  interface RowData {
    id: number;
    name: string;
    age: number;
    country: string;
  }

  interface ColumnData {
    id: string;
    label: string;
  }

  interface usersinfo {
    id: number;
    name: string;
    value: number;
    country: string;
  }

  interface newUserInfo {
    id?: number;
    name: string;
    value: number;
    country: string;
  }
  const [users, setUsers] = useState<usersinfo[]>([]);
  const [title, setTitle] = useState("Add New User");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
  const [newUser, setNewUser] = useState<newUserInfo>({
    name: "",
    value: 0,
    country: "",
  });
  const { notifySuccess, notifyError, notifyInfo } = useToast();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}userinfo`);
      setUsers(response?.data);
      console.log(response, "response");
    } catch (err) {
      console.log(err, "err");
    }
  };

  const column = [
    { id: "name", label: "Name" },
    { id: "age", label: "Age" },
    { id: "country", label: "Country" },
    { id: "action", label: "Action" },
  ];

  const handleAddUser = () => {
    setTitle("Add New User");
    setNewUser({
      name: "",
      value: 0,
      country: "",
    });
    setIsDialogOpen(true); // Open the dialog when Add User is clicked
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === "") {
      getUsers();
    } else {
      const filteredData = users.filter((obj) =>
        Object.values(obj)
          .join("")
          .toLocaleLowerCase()
          .includes(value.toLowerCase())
      );
      setUsers(filteredData);
      console.log(filteredData, "filteredData");
    }
  };

  const handleDialogConfirm = async () => {
    try {
      let payload = newUser.id ?{newUser}:{ id: users.length + 1, newUser };
      if(newUser.id ){
        const response = await axios.put(`${API_BASE_URL}/userinfo/${newUser.id}`, payload.newUser);
        if (response.status === 200 || 201) {
          notifySuccess("New user added successfully");
          getUsers();
          setIsDialogOpen(false);
        }
        console.log(response, "putresponse");
      }else{
        const response = await axios.post(`${API_BASE_URL}userinfo`, payload.newUser);
        console.log(response, "postresponse");
        if (response.status === 200 || 201) {
          notifySuccess("New user added successfully");
          getUsers();
          setIsDialogOpen(false);
        }
      }
 
    } catch (err) {
      notifyInfo("New user failed! ");
      setIsDialogOpen(true);
    }

  };

  const handleUserEdit = async (row: any) => {
    setTitle("Edit User");
    console.log(row, "rowdata");
    setIsDialogOpen(true);
    const { id, name, value, country } = row;
    setNewUser({
      id: id,
      name: name,
      value: value,
      country: country,
    });

  };


  const handleDeleteUser = async (row: any) => {
try{
  const response = await axios.delete(`${API_BASE_URL}userinfo/${row.id}`);
  if (response.status === 200 || 201) {
    notifySuccess(" User deleted successfully");
    getUsers();
  }}catch(err){
  console.log(err)
}
  };

  return (
    <>
      <Box
        className="container"
        sx={{
          margin: "2px 2px 5px 2px",
          padding: "3px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "2px 2px 5px 2px",
            padding: "3px",
          }}
        >
          {/* search */}
          <TextField
            id="search"
            label="Search"
            variant="standard"
            onChange={handleSearch}
          />
          {/* add new button */}
          <CustomButton
            size="large"
            variant="contained"
            onClick={handleAddUser}
            color="info"
            sx={{
              backgroundColor: "#0d47a1",
            }}
          >
            Add User
          </CustomButton>
        </Box>
        <Box sx={{ margin: "10px 0px 2px 0px" }}>
          <CustomTable
            rows={users}
            columns={column}
            handleUserEdit={handleUserEdit}
            handleDeleteUser={handleDeleteUser}
          />
        </Box>
      </Box>

      {/* CustomDialog for adding a user */}
      <CustomDialog
        open={isDialogOpen}
        title={title}
        content={<UsersModal newUser={newUser} setNewUser={setNewUser} />}
        onClose={handleDialogClose}
        onConfirm={handleDialogConfirm}
        confirmText="Save"
        cancelText="Cancel"
      />
    </>
  );
};

export default Users;
