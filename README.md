# <a href="https://inkfinder.vercel.app/" target="_blank">InkFinder</a>
### Project for 'Web Technology' course in Ivan Franko National University of Lviv
The main idea of the project is to make it easy for avarage user to use a power of AI to create a good tattoo.<br/>

# Stack

### Tech stack

Node.js 18, Express.js, React.js, MongoDB, Redux toolkit, Tailwind, Jest

### Resources

Vercel, Mongo Cluster

### Architecture diagram

![Architecture diagram](https://github.com/fdsssawe/inkfinder/assets/92380415/5d40f760-7e0f-4a8d-b780-3f510c8ba9d3)

# How to run a project on localhost 
### Dependencies recovery
Since node_modules are not in repository , you need to recover node_module for both client and server. You can do it with `npm i` in root and client/csletmelearn folders
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
* CLOUDINARY_API_KEY : key that you can find in cloudinary dashboard
* CLOUDINARY_API_SECRET : secret string that you can find in cloudinary dashboard
* CLOUDINARY_CLOUD_NAME : name of your cloudinary account
### Scripts availible
build - to make a build of frontend from root directory
### <a href="https://inkfinder-five.vercel.app/api-docs/" target="_blank">Swagger UI for some of the end points</a>
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
    
    - [x] DALL-E 2 (changed to pollinations AI due to lack of Open AI credits)
    - [x] Cloudinary 

3. ### Main functionality
    
    - [x] Storage for images
    - [x] Design generation
    - [x] Cloudinary usage
    - [x] Upload page/functionality
    - [x] Favorite post page/functionality
    - [x] Recomendation algorithm
    - [x] Tags
    - [x] Account page

4. ### Database
    
    - [x] Mongoose schemas
    - [x] MongoDB Cluster for development
    - [x] CosmosDB deployment
    
5. ### Tests
    
    - [x] Jest
    - [x] Auth service tests
    - [x] Database connection tests
    - [x] Database request tests
    - [x] Posts tests

# Contacts :<br/>
<a href="mailto:zhovanukolexander@gmail.com">Email</a><br/>
<a href="https://t.me/sashazhov" target="_blank">Telegram</a>

