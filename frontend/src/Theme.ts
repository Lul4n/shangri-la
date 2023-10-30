import {createTheme} from "@mui/material";
import {amber, cyan} from "@mui/material/colors";
import {deDE} from "@mui/material/locale";

export const shangriLaTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: cyan[500],
        },
        secondary: {
            main: amber[800]
        }
    },
}, deDE);