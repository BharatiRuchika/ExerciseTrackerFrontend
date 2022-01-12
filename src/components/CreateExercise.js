import React, { useState,useEffect } from "react";
import {
  Typography,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";
import axios from "axios";
const CreateExercise =({history})=> {
const [username,setUsername] = useState("");
const [description,setDescription] = useState("");
const [duration,setDuration] = useState("");
const [date,setDate] = useState("2019-01-01T10:30");
const [users,setUsers] = useState([]);
 useEffect(async() => {
    var res = await axios.get("https://my-exercise-tracker-app1.herokuapp.com/users/allUsers");
    console.log("res",res);
        if (res.data.length > 0) {
            setUsers(res.data);
            setUsername(res.data[0].username);
        }
    }, [])
   
const onSubmit = async(e) => {
    console.log("im in submit call");
    e.preventDefault();
    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date
    };

var result = await axios.post("https://my-exercise-tracker-app1.herokuapp.com/exercises/add", exercise);
     
console.log("result",result);
history.push("/");
  };

  
    return (
      <React.Fragment>
        <Typography>Enter Activity Details</Typography>
        <Divider style={{ margin: "20px 0px" }} />
        <FormControl>
          <InputLabel>User</InputLabel>
          <Select
            name="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          >
            {users.map(user => {
              return <MenuItem value={user}>{user.username}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <br />
        <TextField
          name="description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          label="Description"
          margin="normal"
        />
        <br />
        <TextField
          name="duration"
          value={duration}
          onChange={(e)=>setDuration(e.target.value)}
          label="Duration"
          margin="normal"
        />
        <br />
        <TextField
          name="date"
          type="datetime-local"
          defaultValue={date}
          onChange={(e)=>setDate(e.target.value)}
          margin="normal"
        />
        <br />
        <Button
          variant="contained"
          style={{ margin: "20px 0px", backgroundColor: '#6c7b95', color: 'white' }}
          onClick={onSubmit}
        >
          Create
        </Button>
      </React.Fragment>
    );
  }

  export default CreateExercise;