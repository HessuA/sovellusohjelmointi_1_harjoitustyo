import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState, useRef } from "react";

function UserForm({ setUser, user }) {
  const [openDialog, setOpenDialog] = useState(true);
  const formInputs = useRef({});

  /**************************************************************************/

  // Dialogin sulkeminen
  const handleClose = () => {
    setOpenDialog(false);
  };

  /**************************************************************************/

  // Lomakekenttien käsittely
  const inputHandler = (e) => {
    formInputs.current[e.target.name] = e.target.value;
  };

  /**************************************************************************/

  // Lomakkeen käsittely
  const formHandler = () => {
    setUser({
      ...user,
      name: formInputs.current.name,
      city: formInputs.current.city,
    });
    setOpenDialog(false);
  };

  /**************************************************************************/

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle>Lisää tiedot</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Lisää nimesi ja paikkakuntasi niin tervehdimme sinua nimeltä ja
          tarjoamme säätiedot tältä päivältä. (Tietosi tallentuvat oman
          selaimesi localStorageen.)
        </DialogContentText>
        <TextField
          autoFocus
          name="name"
          margin="dense"
          label="Nimi"
          type="text"
          fullWidth
          variant="standard"
          onChange={inputHandler}
        />
        <TextField
          name="city"
          margin="dense"
          label="Paikkakunta"
          type="text"
          fullWidth
          variant="standard"
          onChange={inputHandler}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Peruuta</Button>
        <Button onClick={formHandler}>Lisää tiedot</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserForm;
