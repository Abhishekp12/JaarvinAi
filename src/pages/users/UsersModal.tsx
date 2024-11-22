import React from "react";
import { Box, TextField } from "@mui/material";

// Define the type for newUser
interface NewUser {
  id?:number;
  name: string;
  value:number;
  country: string;
}

interface userMOdalProps{
  newUser : NewUser,
  setNewUser:React.Dispatch<React.SetStateAction<NewUser>>,
}

const UsersModal:React.FC<userMOdalProps>=({
  newUser,
  setNewUser
})=>{

return(
    <>
      <Box>
            <TextField
              fullWidth
              label="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Age"
              value={newUser.value}
              onChange={(e) => setNewUser({ ...newUser, value:Number(e.target.value) || 0 } )}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Country"
              value={newUser.country}
              onChange={(e) =>
                setNewUser({ ...newUser, country: e.target.value })
              }
              margin="normal"
            />
          </Box>
    </>
)
}

export default UsersModal