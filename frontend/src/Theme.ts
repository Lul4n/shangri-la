import {createTheme} from "@mui/material";
import {amber, cyan} from "@mui/material/colors";
import {deDE} from "@mui/material/locale";

export const shangriLaTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: amber[800]
        },
        secondary: {
            main: cyan[300],
        }
    },
}, deDE);