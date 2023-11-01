import {AuthProviderProps} from "react-oidc-context";


export function oidcConfig(): AuthProviderProps {
    const redirectUri: URL = new URL(window.location.href);
    const authority =  new URL(window.location.href);
    authority.protocol = 'https';
    authority.port = '8081';
    authority.pathname = '/realms/shangri-la/';
    authority.search = '';
    authority.hash = '';

    const config: AuthProviderProps = {
        authority: authority.toString(),
        client_id: 'shangri-la',
        client_secret: 'FkWEXFhXt293Vh9xyx19AsnqGWNb3Rv8',
        redirect_uri: redirectUri.toString()
    };
    console.log(config);
    return config;
}