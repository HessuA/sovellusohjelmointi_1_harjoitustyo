import { Typography, Stack, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

function DeleteUser({ setUser }) {
  const navigate = useHistory();

  const handleDeleteUser = () => {
    setUser({ timers: [] });
    navigate.push("/");
  };

  return (
    <Stack spacing={2}>
      <Typography>
        Haluatko varmasti poistaa kaikki käyttäjätiedot? Tämä poistaa kaikki
        ajastimet, nimen ja paikkakunnan sekä teeman asetukset.
      </Typography>
      <Button variant="contained" color="error" onClick={handleDeleteUser}>
        Kyllä, poista tiedot
      </Button>
    </Stack>
  );
}

export default DeleteUser;
