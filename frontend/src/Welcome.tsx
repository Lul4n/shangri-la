import {Button, Container, Grid, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export default function Welcome() {
    const {t} = useTranslation();
    return (
            <Container maxWidth="md">
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>{t('views.welcome.title')}</Typography>
                <Typography variant="h5" align="center" color="textSecondary"
                            paragraph>{t('views.welcome.introduction')}</Typography>
                <Grid container spacing={2} justifyContent="center" sx={{mt:4}}>
                    <Grid item>
                        <Link to="/create-account">
                            <Button variant="contained" color="primary">{t('navigation.createAccount')}</Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/login">
                            <Button variant="outlined" color="secondary">{t('navigation.login')}</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
    );
}