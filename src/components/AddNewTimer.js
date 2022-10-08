import { Typography, TextField, Paper, Button, Box } from "@mui/material";
import { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";

function AddNewTimer({ timers, setTimers, user }) {
  const navigate = useHistory();
  // Errors
  const [formErrors, setFormErrors] = useState({});
  const inputs = useRef({});

  /**************************************************************************/

  const inputHandler = (e) => {
    inputs.current[e.target.name] = e.target.value;
  };

  /**************************************************************************/

  const formHandler = (e) => {
    e.preventDefault();

    let errors = {};

    if (!inputs.current.name)
      errors = { ...errors, name: "Tehtävän nimi on pakollinen tieto!" };

    if (Object.entries(errors).length > 0) {
      setFormErrors({ ...errors });
    } else {
      setFormErrors({});
      setTimers({
        ...user,
        timers: [...timers, { id: uuid(), timerName: inputs.current.name }],
      });
      navigate.push("/");
    }
  };

  /**************************************************************************/

  return (
    <>
      <Typography variant="h5" component="h1" align="center" mb={2}>
        Lisää uusi seurattava
      </Typography>
      <Box component="form" onSubmit={formHandler}>
        <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
          <TextField
            label="Seurattavan tehtävän nimi"
            name="name"
            fullWidth
            onChange={inputHandler}
            error={Boolean(formErrors.name)}
            helperText={formErrors.name}
          />
        </Paper>
        <Button type="submit" fullWidth variant="contained">
          Lisää
        </Button>
      </Box>
    </>
  );
}
export default AddNewTimer;
