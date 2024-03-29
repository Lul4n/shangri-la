import {
    Box,
    Button,
    Grid,
    TextField,
    Container, Typography
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useAuth} from "react-oidc-context";


export default function Login() {
    const {t} = useTranslation();
    const auth = useAuth();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email: string = typeof data.get('email') === 'string' ? data.get('email')+'' : '';
        const password: string = typeof data.get('password') === 'string' ? data.get('password')+'' : '';
        auth.signinResourceOwnerCredentials({
           username: email,
           password: password
        });
    };
    if(auth.isAuthenticated) {
        return (
            <button onClick={() => void auth.removeUser()}>Log out</button>
        );
    }else{
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
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            {t('views.login.form.submit')}
                        </Button>
                    </Box>
                </Grid>
            </Container>
        );

    }
}