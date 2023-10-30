import {Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

export default function CreateAccount(){
    const {t} = useTranslation();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            passwordRepetition: data.get('password_repetition')
        });
    };
    return (

        <Container maxWidth="sm">
            <Grid container spacing={2} justifyContent="center" sx={{mt:4}}>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <Typography variant="h2" align="center" color="textPrimary" gutterBottom>{t('views.createAccount.title')}</Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={t('views.createAccount.form.email')}
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('views.createAccount.form.password')}
                        type="password"
                        id="password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password_repetition"
                        label={t('views.createAccount.form.password_repetition')}
                        type="password"
                        id="password_repetition"
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        {t('views.createAccount.form.submit')}
                    </Button>
                </Box>
            </Grid>
        </Container>
    );
}