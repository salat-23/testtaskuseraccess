Test task with strapi and airtable;

To launch a project, the following env variables must be set:
```
HOST=
PORT=
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=
DATABASE_CLIENT=
DATABASE_FILENAME=
JWT_SECRET=
AIRTABLE_APIKEY=
AIRTABLE_APPID=
```
Where AIRTABLE_APIKEY is the key and AIRTABLE_APPID is an airtable app base

To start an application:
```
npm run develop
or
npm run start
```

To call a useraccess endpoint, make request to:
`localhost:1337/api/useraccess`
with body:
```json
{
    "email": "your@email.here"
}
```

The email must be present in airtable table with the name 'users.' Also, you should have a table with the name 'userAccounts.'

