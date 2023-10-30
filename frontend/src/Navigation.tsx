import {Link, useLocation} from "react-router-dom";
import {List, ListItemButton, ListItemIcon, ListItemText, useTheme} from "@mui/material";
import {
    LoginTwoTone as LoginTwoToneIcon,
    PersonAddAltTwoTone as PersonAddAltTwoToneIcon,
    RocketLaunchTwoTone as RocketLaunchTwoToneIcon
} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

function NavigationListItem(props: {i18nKey: string, route: string, icon: any}) {
    const { i18nKey, route, icon } = props;
    const { t } = useTranslation();
    const location = useLocation();
    const theme = useTheme();
    return (
        <ListItemButton component={Link} to={route} sx={{...(location.pathname === route && {color: theme.palette.primary.main})}}>
            <ListItemIcon sx={{...(location.pathname === route && {color: theme.palette.primary.main})}}>
                {icon}
            </ListItemIcon>
            <ListItemText primary={t(i18nKey)} />
        </ListItemButton>
    );
}

export default function Navigation() {
    return (
        <List component="nav">
            <NavigationListItem i18nKey="navigation.welcome" route="/" icon={<RocketLaunchTwoToneIcon/>} />
            <NavigationListItem i18nKey="navigation.createAccount" route="/create-account" icon={<PersonAddAltTwoToneIcon/>} />
            <NavigationListItem i18nKey="navigation.login" route="/login" icon={<LoginTwoToneIcon/>} />
        </List>
    );
}