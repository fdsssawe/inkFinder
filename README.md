# InkFinder
### Project for 'Web Technology' course in Lviv National University of Ivan Franko 
The main idea of the project is providing interesting designes for new tattoos and sharing your sketches
## Hot to run a project on localhost 
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
