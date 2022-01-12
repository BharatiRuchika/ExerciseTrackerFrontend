import React from "react";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import { Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Navbar from "./components/Navbar";
import EditExercise from "./components/EditExercise";
import ExercisesList from "./components/ExercisesList";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";
function App() {
  const useStyles = makeStyles({
    main: {
      marginTop: "85px",
      padding: "20px",
      height: "60vh"
    }
  });

  const classes = useStyles();
  return (
  
    <BrowserRouter>
   
 
    <Navbar/>
      <Container>
        <Paper className={classes.main} square>
          
          <Route path="/edit/:id" component={EditExercise} />
        
          <Route path="/" exact component={ExercisesList} />        
          <Route path="/create" component={CreateExercise} /> 
          <Route path="/user" component={CreateUser} />
        </Paper>
      </Container>
    </BrowserRouter>
  
  );
}

export default App;
