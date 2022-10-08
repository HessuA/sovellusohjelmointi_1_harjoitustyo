import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Fab, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import UserForm from "./components/UserForm";
import Settings from "./components/Settings";
import FrontPage from "./components/FrontPage";
import AddNewTimer from "./components/AddNewTimer";
import Timer from "./components/Timer";
import DeleteItem from "./components/DeleteItem";
import DeleteUser from "./components/DeleteUser";
import Footer from "./components/Footer";

function App() {
  // Käyttäjän nimi ja paikkakunta
  const [user, setUser] = useState({ timers: [] });
  // Säätiedot
  const [weatherInfo, setWeatherInfo] = useState({});

  // Dark mode
  const darkTheme = createTheme({
    palette: {
      mode: !user.darkMode ? "light" : "dark",
    },
  });

  /*************************************************************************/

  // Tallennetaan käyttäjä localStorageen
  const saveUser = () => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Jos käyttäjä on jo aiemmin käynyt sivulla ja lisännyt tietonsa, haetaan käyttäjä localStoragesta.
  const getUser = () => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser({ ...user });
    }
  };
  /*************************************************************************/

  // Muutetaan paikkakunnan kirjaimet pieneksi sekä äåö -> aao
  const cityValidation = (city) => {
    if (!city) return;
    const letters = { ä: "a", ö: "o", å: "a" };
    return city.toLowerCase().replace(/[äåö]/g, (letter) => letters[letter]);
  };

  /*************************************************************************/

  // Haetaan säätiedot
  const getWeather = async () => {
    setWeatherInfo({ ...weatherInfo, response: false, error: false });
    try {
      const connection = await fetch(
        `https://xamkbit.herokuapp.com/saatilanne/${cityValidation(user.city)}`
      );
      const data = await connection.json();

      if (data.cod === "404") {
        setWeatherInfo({
          error: true,
        });
        return;
      }

      setWeatherInfo({ ...weatherInfo, response: true, data });
    } catch (error) {
      console.log(error);
    }
  };

  /**********************************************************************/

  useEffect(() => {
    getUser();
    getWeather();
  }, []);

  useEffect(() => {
    saveUser();
    getWeather();
  }, [user]);

  /**********************************************************************/

  /**********************************************************************/
  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <Header weather={weatherInfo} user={user} />
          {!user.name && !user.city ? (
            <UserForm setUser={setUser} user={user} />
          ) : (
            ""
          )}
          <Container maxWidth="sm" sx={{ mt: 2, mb: 15 }}>
            <Route exact path="/">
              <FrontPage user={user} timers={user.timers} />
            </Route>

            <Route path="/addnew">
              <AddNewTimer
                timers={user.timers}
                setTimers={setUser}
                user={user}
              />
            </Route>
            <Route path="/settings">
              <Settings user={user} setUser={setUser} />
            </Route>
            <Route path="/timer/:id">
              <Timer timers={user.timers} setTimers={setUser} user={user} />
            </Route>
            <Route path="/delete/:id">
              <DeleteItem user={user} setTimers={setUser} />
            </Route>
            <Route path="/deleteUser/">
              <DeleteUser setUser={setUser} />
            </Route>
          </Container>
          <Footer />
          <Fab
            color="primary"
            aria-label="add"
            sx={{ position: "fixed", bottom: 90, right: 20 }}
            component={Link}
            to="/addnew"
          >
            <AddIcon />
          </Fab>
        </CssBaseline>
      </ThemeProvider>
    </Router>
  );
}

export default App;
