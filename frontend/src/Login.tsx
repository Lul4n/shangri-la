import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    Container, Typography
} from "@mui/material";
import {useTranslation} from "react-i18next";


export default function Login() {
    const {t} = useTranslation();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            remember: data.get('remember') === 'remember',
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Container maxWidth="sm">
            <Grid container spacing={2} justifyContent="center" sx={{mt:4}}>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
                    <Typography variant="h2" align="center" color="textPrimary" gutterBottom>{t('views.login.title')}</Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={t('views.login.form.email')}
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('views.login.form.password')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" id="remember" name="remember" />}
                        label={t('views.login.form.rememberMe')}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        {t('views.login.form.submit')}
                    </Button>
                </Box>
            </Grid>
        </Container>
    );
}