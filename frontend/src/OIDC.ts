import {AuthProviderProps} from "react-oidc-context";


export function oidcConfig(): AuthProviderProps {
    const redirectUri: URL = new URL(window.location.href);
    const authority: URL =  new URL(`https://${redirectUri.host}:8081/realms/shangri-la/`);
    return {
        authority: authority.toString(),
        client_id: 'shangri-la',
        client_secret: 'FkWEXFhXt293Vh9xyx19AsnqGWNb3Rv8',
        redirect_uri: redirectUri.toString()
    };
}