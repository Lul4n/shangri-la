import {Link} from "react-router-dom";
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {
    LoginTwoTone as LoginTwoToneIcon,
    PersonAddAltTwoTone as PersonAddAltTwoToneIcon,
    RocketLaunchTwoTone as RocketLaunchTwoToneIcon
} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

export default function Navigation() {
    const {t} = useTranslation();

    return (
        <List component="nav">
            <ListItemButton component={Link} to="/">
                <ListItemIcon>
                    <RocketLaunchTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary={t('navigation.welcome')} />
            </ListItemButton>
            <ListItemButton component={Link} to="/create-account">
                <ListItemIcon>
                    <PersonAddAltTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary={t('navigation.createAccount')} />
            </ListItemButton>
            <ListItemButton component={Link} to="/login">
                <ListItemIcon>
                    <LoginTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary={t('navigation.login')} />
            </ListItemButton>
        </List>
    );
}