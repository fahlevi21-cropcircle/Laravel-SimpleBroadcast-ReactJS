import React from "react";
import ReactDOM from "react-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@mui/material";

export default function CustomAppBar(props) {
    function Actions() {
        const isLoggedIn = props.auth;
        if (isLoggedIn) {
            return <Button color="inherit">Logout</Button>;
        }

        return (
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Button color="inherit">Login</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button color="inherit">Register</Button>
                </Grid>
            </Grid>
        );
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Alien
                    </Typography>
                    <Actions />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

if (document.getElementById("appbar")) {
    var auth = document.getElementById("appbar").getAttribute("auth");
    ReactDOM.render(
        <CustomAppBar auth={auth} />,
        document.getElementById("appbar")
    );
}
