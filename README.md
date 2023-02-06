# Supabase Auth Demo

Highlighting a slight anomaly found during login.

## Setup

Create a project on https://supabase.com and populate your local .env file with the
corresponding URL and public key.

``` dotenv
SUPABASE_URL="https://[YOUR-URL].supabase.co"
SUPABASE_KEY="[YOUR-KEY]"
```

Enable email and password if it isn't already (it is currently the default setting)

For this demo you may want to disable the requirement to verify emails. 

## Install

Then install using yarn, npm etc... I think you know the drill!

```bash
yarn install
```

## Try it

```bash
yarn dev
```

Now you have an amazing demo running on http://localhost:3000

If you visit the site you should see options to visit Home, Secret, Login and Register. 

For now, let's Register a user. Go to Register a new user (and verify the email if you didn't disable that requirement)

You should now be redirected to the Home page, with a dump of the user object in plain view. (Not recommended for production)

## The anomaly (finally)

Logout so we can see the anomaly in action. Turn on the console using your developer tools, also retain logging in the console so that we don't lose the flow.

Click on the "Secret" menu item. This is a protected page, therefore you are taken to the Login page, with a redirect in the URL back to the secret page...

Watch the console. Login using your brand new credentials

You should see 

```console
[Log] No user (auth.ts, line 10)
[Log] No auth session (auth.ts, line 17)
[Log] Auth State changed – Proxy {access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6Ik ... …} (app.vue, line 19)
[Log] No user (auth.ts, line 10)
[Log] Got Auth session, user =  – {id: "b0a83c5b-4ffd-400d-b751-61ffc2490d72",  …} (auth.ts, line 14)
```

So the first `No user` and `No auth session` are expected, as this is us hitting the login page.

Then the `Auth State changed`, this is us hitting Login.

There is however no user in the `useSupabaseUser` composite. Which there should be, since we just logged in. This is in `auth.ts` on line 10.

The next log line shows us we have an `auth session`, which contains the user. Question is, why is this not in the `useSupabaseUser` composite?

p.s. If we remove the check for the auth session, then the user has to press Login twice in order to log in.
