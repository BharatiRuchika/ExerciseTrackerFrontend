import React, { useState,useEffect} from "react";
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
const EditExercise = ({match,history})=> {
const [username,setUsername] = useState("");
const [description,setDescription] = useState("");
const [duration,setDuration] = useState("");
const [date,setDate] = useState("2019-01-01T10:30");
const [users,setUsers] = useState([]);

useEffect(async()=>{
    console.log("id",match.params.id);
    var res = await axios.get(`https://my-exercise-tracker-app1.herokuapp.com/exercises/${match.params.id}`);
    console.log("res",res);
    setUsername(res.data[0].username);
    setDescription(res.data[0].description);
    setDuration(res.data[0].duration);
    setDate(res.data[0].date);
    var users = await axios.get("https://my-exercise-tracker-app1.herokuapp.com/users/allUsers");
    console.log("users",users);
    if (users.data.length > 0) {
        setUsers(users.data.map(user => user.username))
    }
  
},[])
  const onSubmit = async(e) => {
    e.preventDefault();
    const exercise_data = {
      username: username,
      description: description,
      duration: duration,
      date: date
    };
   var exercise = await axios.put(
        `https://my-exercise-tracker-app1.herokuapp.com/exercises/update/${match.params.id}`,
        exercise_data
      )
    console.log("exerciseData",exercise);
if(exercise.data.success === true){
    alert("exercise updated successfully")
    history.push("/")
}
  }
    // window.location = "/"
  
  return (
      <React.Fragment>
        <Typography>Edit Activity Details</Typography>
        <Divider style={{ margin: "20px 0px" }} />
        <FormControl>
          <InputLabel>User</InputLabel>
          <Select
            name="username"
            value={username}
            onChange={(e)=>setUsername(username)}
          >
            {users.map(user => {
              return <MenuItem value={user}>{user}</MenuItem>;
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
          color="primary"
          style={{
            margin: "20px 0px",
            backgroundColor: "#6c7b95",
            color: "white"
          }}
          onClick={onSubmit}
        >
          Update
        </Button>
      </React.Fragment>
    );
  
}


export default EditExercise;