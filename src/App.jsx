import { Box, ThemeProvider } from "@mui/material";
import router from "./router";
import TopBar from "./components/TopBar";
import { RouterProvider } from "react-router-dom";
import theme from "./theme";

const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <Box flex="1" display="flex" flexDirection="column" marginTop="4rem" marginBottom="2rem">
                <TopBar position="static"/>

                <RouterProvider router={router} />
            </Box>
        </ThemeProvider>
    );
}

export default App;
