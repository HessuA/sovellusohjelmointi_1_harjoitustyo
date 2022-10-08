import { useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  Divider,
  Switch,
  Tooltip,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function Settings({ user, setUser }) {
  // DarkMode tarkastus
  const [darkModeCheck, setDarkModeCheck] = useState(user.darkMode);

  // Säätiedot asetus
  const [weather, setWeather] = useState(user.weather);

  // Asetuskenttien arvot
  const inputs = useRef({ name: user.name, city: user.city });

  // Errors
  const [formErrors, setFormErrors] = useState({});

  /**************************************************************************/

  const inputHandler = (e) => {
    inputs.current[e.target.name] = e.target.value;
  };

  /**************************************************************************/

  // Lomakkeen lähetys
  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};

    if (weather && !inputs.current.city)
      errors = {
        ...errors,
        city: "Jos haluat näyttää säätiedot, on paikkakunnan valinta pakollinen.",
      };

    if (Object.entries(errors).length > 0) {
      setFormErrors({ ...errors });
    } else {
      setFormErrors({});
      setUser({
        ...user,
        name: inputs.current.name,
        city: inputs.current.city,
        darkMode: darkModeCheck,
        weather: weather,
      });
    }
  };

  /**************************************************************************/

  return (
    <>
      <Typography variant="h5" component="h1" align="center" mb={2}>
        Asetukset
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Box>
            <Typography ml={2} variant="subtitle2">
              Yleiset
            </Typography>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                }}
              >
                <Typography>
                  Tumma teema
                  <Tooltip title="Voit valita haluatko käyttää tummaa teemaa">
                    <InfoOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
                  </Tooltip>
                </Typography>
                <Switch
                  name="darkMode"
                  checked={darkModeCheck ?? false}
                  onChange={(e) => setDarkModeCheck(e.target.checked)}
                />
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                }}
              >
                <Typography>
                  Säätiedot
                  <Tooltip title="Halutko paikkakuntasi säätiedot sivun yläpalkkiin?">
                    <InfoOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
                  </Tooltip>
                </Typography>
                <Switch
                  name="weather"
                  checked={weather ?? false}
                  onChange={(e) => setWeather(e.target.checked)}
                />
              </Box>
            </Paper>
          </Box>

          <Box>
            <Typography ml={2} variant="subtitle2">
              Käyttäjätiedot
              <Tooltip title="Muokkaa tietojasi">
                <InfoOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
              </Tooltip>
            </Typography>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
              <Stack spacing={2}>
                <TextField
                  name="name"
                  label="Nimi"
                  defaultValue={user.name}
                  onChange={inputHandler}
                />
                <TextField
                  name="city"
                  label="Paikkakunta"
                  defaultValue={user.city}
                  onChange={inputHandler}
                  error={Boolean(formErrors.city)}
                  helperText={formErrors.city}
                />
              </Stack>
            </Paper>
          </Box>

          <Button type="submit" fullWidth variant="contained">
            Tallenna
          </Button>
        </Stack>
        <Button
          variant="contained"
          fullWidth
          color="error"
          sx={{ mt: 2 }}
          component={Link}
          to="/deleteUser"
        >
          Poista kaikki tietosi
        </Button>
      </Box>
    </>
  );
}

export default Settings;
