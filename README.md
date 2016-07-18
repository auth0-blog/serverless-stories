# Serverless Stories
Serverless Stories is a static blog that is enhanced with Webtasks. It is a sample application showing how you can easily build serverless applications with [Webtask.io](https://webtask.io). Check out the blog post [here](https://auth0.com/blog/2016/06/28/building-serverless-apps-with-webtask/).

![Serverless Stories](https://cdn.auth0.com/blog/webtask/app.png)

## Running the App

1. Clone the repo
2. Install the http-server by running `npm intall http-server -g` (you will need Node and NPM)
3. Run `http-server` and navigate to `localhost:8080` to see the blog.
4. [Sign up](https://auth0.com/signup) for an Auth0 account and update the `app.js` file with your credentials.

## Deploying Webtasks

1. Install the Webtask CLI by running `npm install wt-cli -g`
2. Navigate to the `webtasks` directory
3. Run `wt init` to create your Webtask account
4. Run `wt create newsletter.js -s AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID -s AUTH0_CLIENT_SECRET=YOUR_AUTHO_CLIENT_SECRET -s AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN.auth0.com` to deploy the newsletter Webtask

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 account

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
