# Intruduction
this projects uses `postgres` for DB, `sequelize` as ORM and `express` as web server in BACKEND

# SETUP
to setup you have to follow this instructions

### env
At first copy and paste the .env.example file and rename it to .env

set you postgres credentials in the .env file in these fields:
```env
DB_USERNAME=<your value>
DB_PASSWORD=<your value>
DB_DATABASE=<your value>
DB_HOST=<your value>
DB_PORT=5432
DB_DIALECT=postgres
```
then lets install dependencies of client and server:
```bash
# in project's root dir run
npm ci
```
this command installs projects dependencies

### DB initial
if the credentials are correct, by run the following commands the initial data in database will insert:
```bash
# in server dir (app/server)
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

then go back in the root dir (out of apps dir) and run this command to start both client and server sides
```bash
# root dir
# I was using node v22 so in the turbo.json is set npm version you need is 10.9.2;
# by install node v22.15.1 through NVM you can set you npm version
npm run dev
```
this command runs both server and client projects, the server port is 3001 and client port 5173 (vite default port)

## Usage
now you can open your browser and get to this address: ``https://localhost:5173/auth/login``


thats it! :)