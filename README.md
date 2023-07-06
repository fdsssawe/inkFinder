# <a href="https://inkfinder2.azurewebsites.net/" target="_blank">InkFinder</a>
### Project for 'Web Technology' course in Ivan Franko National University of Lviv
The main idea of the project is providing interesting designes for new tattoos and sharing your sketches.<br/>
by Zhovanuk Oleksandr

Contacts :<br/>
<a href="mailto:zhovanukolexander@gmail.com">Email</a><br/>
<a href="https://t.me/sashazhov" target="_blank">Telegram</a>

# Stack

Tech stack

Node.js 18 - environment for working with serverside.<br/>
Express.js - web-framework for creating api and web app in general.<br/>
React.js - for UI/UX.<br/>
MongoDB - NoSQL DataBase for saving tokens , users , designes , etc.<br/>
Redux toolkit - state manager to hande token check and other states.<br/>
Tailwind - CSS framework for comfortable work with styles.<br/>
Jest - Testing Framework.<br/>

Resources

Azure App Service
Azure Cosmos DB

### Architecture diagram

![Architecture diagram](https://github.com/fdsssawe/inkfinder/assets/92380415/ea666f2e-2d67-4f59-9702-9587e21cbdda)

### Infrastracture diagram

![infrastracture](https://github.com/fdsssawe/inkfinder/assets/92380415/e0537730-7e18-458b-bd88-3121cab18f2f)

# How to run a project on localhost 
### Dependencies recovery
Since node_modules are not in repository , you need to recover node_module for both client and server. You can do it with `npm ci` in root and client/csletmelearn folders
### To start server
Start with `npm run start:dev`
### To start client
Open client folder `cd client` and then vite project directory `cd csletmelearn`. Start it using vite or use `npm run dev`
### Environment variable that you have to provide
* PORT : port where server will locate
* MONGO_URL : url for your mongoDB cluster
* JWT_ACCESS_SECRET : secret word for your access token
* JWT_REFRESH_SECRET : secret word for your refresh token
* SMTP_HOST : host for node mailer (for example its "smtp.gmail.com" if using gmail)
* SMTP_PORT : port for node mailre (find it in imap setting in your account)
* SMTP_USER : email that will send activation links
* SMTP_PASSWORD : password for this email (if using gmail better turn on 2FA and use app password)
* API_URL : full link for your server (for example http://localhost:5000)
* CLIENT_URL : full link for your client
* OPENAI_API_KEY : you api key for dalle(openai). You can get it in official openai webpage in api->api key->new api key. Copy it (you will not be able to see it after you close the window) , and past it to your .env file.
* CLOUDINARY_API_KEY : key that you can find in cloudinary dashboard
* CLOUDINARY_API_SECRET : secret string that you can find in cloudinary dashboard
* CLOUDINARY_CLOUD_NAME : name of your cloudinary account
### Scripts availible
build - to make a build of frontend from root directory
# Project decomposition
1.  ### Authorization
    
    - [x] Backend auth service setup
    - Backend token service
      - [x] Refresh token generator
      - [x] Access token generator
    - [x] Backend mail service setup
    - [x] Registration , login , logout functionality in auth service
    - [x] Activation functionality in auth service and mail services
    - [x] Auth routes on server
    - [x] Frontend auth handle
    - [ ] Unactivated account handle
    - [ ] Unactivated account limitation
    - [x] OAuth

2.  ### API implementation
    
    - [x] Backend OpenAI service setup
    - [x] Dall-e functionality usage
    - [x] New route for Dall-e features
    - [x] Frontend page for design generator using Dell-e
    - [x] Cloudinary 
    - [x] FileReader API
    - [x] New api implementation

3. ### Main functionality
    
    - [x] Storage for images
    - [x] Design generation
    - [x] Cloudinary usage
    - [x] Upload page/functionality
    - [x] Favorite post page/functionality
    - [ ] Interests form after registration
    - [x] Recomendation algorithm
    - [x] Tags
    - [x] Account page

4. ### Frontend
    
    - [x] Temporary design for pages
    - [x] Home page design
    - [ ] Collection page design
    - [ ] Account page design
    - [ ] Upload and Generator pages design
    - [ ] Parallax for home page

5. ### Database
    
    - [x] User schema
    - [x] MongoDB Cluster for development
    - [x] CosmosDB
    - [x] Cloudinary SDK implementation
    - [x] New schema for images 
    
6. ### Tests
    
    - [x] Jest
    - [x] Auth service tests
    - [x] Database connection tests
    - [x] Database request tests
    - [x] OpenAI API tests
    - [x] Posts tests


