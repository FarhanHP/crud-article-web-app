import { Toolbar, Typography, AppBar, useScrollTrigger } from "@mui/material";
import { blue } from "@mui/material/colors";

const TopBar = (props) => {

    const trigger = useScrollTrigger();

    return (
        <AppBar {...props} elevation={trigger ? 4 : 0} style={{background: trigger ? blue[500] : "white"}} position="fixed">
            <Toolbar>
                <Typography variant="h6" component="a" color={trigger ? "white" : blue[500]} margin="auto" href="/" style={{
                    fontSize: "1.5rem",
                    textDecoration: "none",
                    fontWeight: 1000
                }}>
                    CRUD Article
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
