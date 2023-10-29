import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

export const SxContainer : SxProps<Theme> = {
    padding: theme => theme.spacing(8,0, 6),
    backgroundColor: theme => theme.palette.background.paper
};