# InkFinder
### Project for 'Web Technology' course in Lviv National University of Ivan Franko 
The main idea of the project is providing interesting designes for new tattoos and sharing your sketches.<br/>
by Zhovanuk Oleksandr

Contacts :<br/>
<a href="mailto:zhovanukolexander@gmail.com">Email</a><br/>
<a href="https://t.me/sashazhov" target="_blank">Telegram</a>

## Stack

Tech stack

Node.js 18 - environment for working with serverside.<br/>
Express.js - web-framework for creating api and web app in general.<br/>
React.js - for UI/UX.<br/>
MongoDB - NoSQL DataBase for saving tokens , users , designes , etc.<br/>
Redux/Redux toolkit - state manager to hande token check and other states.<br/>
Mongoose - ODM for comfortable work with MongoDB schemas and other data.<br/>
Tailwind - CSS framework for comfortable work with styles.<br/>
bcrypt - for encrypting passwords , liml , etc.<br/>
jsonwebtoken - for creating tokens in TokenService.<br/>
nodemailer - for sendint verification mails.<br/>

Resources

Azure Web App
Azure Cosmos DB

<a href="https://inkfinder2.azurewebsites.net/" target="_blank">Deployed project</a>

## How to run a project on localhost 
### Dependencies recovery
Since node_modules are not in repository , you need to recover node_module for both client and server. You can do it with `npm ci` in root and client/csletmelearn folders
### To start server
Start with `npm run start:dev` or `npm run dev`
### To start client
Open client folder `cd client` and then vite project directory `cd csletmelearn`. Start it using vite or use `npm run dev`
### Environment variable that you have to provide
* PORT : port where server will locate
* MONGO_URL : url for your mongoDB cluster
* JWT_ACCESS_SECRET : secret word for your access token
* JWT_REFRESH_SECRET : secret word for your refresh token
* SMTP_HOST= host for node mailer (for example its "smtp.gmail.com" if using gmail)
* SMTP_PORT = port for node mailre (find it in imap setting in your account)
* SMTP_USER = email that will send activation links
* SMTP_PASSWORD = password for this email (if using gmail better turn on 2FA and use app password)
* API_URL = full link for your server (for example http://localhost:5000)
* CLIENT_URL = full link for your client
### Scripts availible
build - to make a build of frontend from root directory
### Progress of project development
- [x] Project set up
- [x] Auth system implementation
- [x] Project deployment using Azure
- [x] 'About' page
- [ ] Providing store for design uploading
- [ ] Unique algorithm implementation
- [ ] Dall-e api implementation
