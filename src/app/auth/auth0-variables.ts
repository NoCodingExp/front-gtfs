interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'j7eqr4Virx7PJUmFFvRZ4JhOZqw7Sqza',
  domain: 'asap.eu.auth0.com',
  callbackURL: 'http://localhost:4200/dashboard'
};
