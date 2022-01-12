import React, { useState } from "react";
import { Typography, Divider, TextField, Button } from "@material-ui/core";
import axios from "axios";
const CreateUser = ()=> {
    console.log("im in create user");
    const [username,setUsername] = useState("");
    const onSubmit = async(e) => {
    e.preventDefault();
    const user = {
      username: username
    };
    var result = await axios.post("https://my-exercise-tracker-app1.herokuapp.com/users/add", user)
    console.log("result",result); 
    if(result.data.success==true){
        alert("user created successfully");
        setUsername("");
    }else{
        alert("something went wrong..try again..")
    }
   
  };
return (
      <>
   
        <Typography>Enter Username</Typography>
        <Divider style={{ margin: "20px 0px" }} />
        <TextField
          name="username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          label="Username"
        />
        <br />
        <Button
          variant="contained"
           color="primary"
          style={{
            margin: "26px 0px",
            backgroundColor: "#6c7b95",
            color: "white"
          }}
          onClick={onSubmit}
        >
          Create
        </Button> 
      </>
    );
  }

  export default CreateUser;
