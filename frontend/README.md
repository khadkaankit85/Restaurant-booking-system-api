Contexts defined in src/Contexts.tsx
UserInformationContext provides the general information about the user, including the user's name, email, and user ID.
AccessTokenContext provides the access token for authenticated users if no access token is available, a post request to /users/loginwithcookie is made to obtain one and in case of failure, user shall be sent to login page
