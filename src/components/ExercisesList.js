import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import axios from "axios";
const ExercisesList =()=> {
//   constructor(props) {
//     super(props);
//     this.state = {
//       exercises: []
//     };
//     this.deleteExercise = this.deleteExercise.bind(this);
//   }
const [exercises,setExercises] = useState([]);
useEffect(async() => {
    var result = await axios.get("https://my-exercise-tracker-app1.herokuapp.com/exercises/");
    console.log("result",result);
    setExercises(result.data);
}, [])


  const deleteExercise=async(id)=> {
    console.log(id);
    await axios
      .delete(`https://my-exercise-tracker-app1.herokuapp.com/exercises/delete/${id}`)
     setExercises(exercises.filter(el=>el._id!==id));
    // this.setState({
    //   exercises: this.state.exercises.filter(el => el._id !== id)
    // });
  }

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exercises.map(exercise => {
            return (
              <TableRow>
                <TableCell>{exercise.username}</TableCell>
                <TableCell>{exercise.description}</TableCell>
                <TableCell>{exercise.duration}</TableCell>
                <TableCell>{exercise.date.substring(0, 10)}</TableCell>
                <TableCell>
                  <Link
                    to={"/edit/" + exercise._id}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="outlined" style={{ margin: "10px" }}>
                      Edit
                    </Button>
                  </Link>
                  <Button onClick={() => deleteExercise(exercise._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
}

export default ExercisesList;