import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Typography,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import logo from "../images/logo.png";

function Header({ weather, user }) {
  // Valikon avaus
  const [openMenu, setOpenMenu] = useState(false);

  // Valikon linkit
  const menu = [
    {
      linkName: "Etusivu",
      link: "/",
      icon: <HomeIcon />,
    },
    {
      linkName: "Lisää uusi",
      link: "/addnew",
      icon: <AddCircleOutlineIcon />,
    },
    {
      linkName: "Asetukset",
      link: "/settings",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          aria-label="menu"
          onClick={() => setOpenMenu(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={openMenu} onClose={() => setOpenMenu(false)}>
          <List
            onClick={() => setOpenMenu(false)}
            sx={{
              p: 1,
            }}
          >
            {menu.map((menuItem) => {
              return (
                <ListItem key={menuItem.link}>
                  <ListItemButton component={Link} to={menuItem.link}>
                    <ListItemIcon>{menuItem.icon}</ListItemIcon>
                    <ListItemText primary={menuItem.linkName} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        <img src={logo} alt="Logo" />
        <>
          {user.weather && weather.response ? (
            <Stack direction="row" alignItems="center">
              <Stack>
                <Typography variant="body2">{`${weather.data.name}`}</Typography>
                <Typography
                  sx={{ textAlign: "right", fontWeight: "bold" }}
                  variant="body2"
                >
                  {`${Math.round(weather.data.main.temp)}°`}
                </Typography>
              </Stack>
              <img
                src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}.png`}
              />
            </Stack>
          ) : weather.error ? (
            <Typography>Säätietoa ei löydy</Typography>
          ) : (
            <Stack></Stack>
          )}
        </>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
