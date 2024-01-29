import express from 'express'
import cors from 'cors'
import  mongo, { version } from 'mongoose';
import { addPostValidation } from './validations/OffersValidator.js';
import * as OfferControllers from './controllers/OfferController.js'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import { router } from './router/index.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js'
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from "swagger-ui-express"

dotenv.config()


const options = {
    withCredentials: true, // enable cookies
    definition : {
        openapi : '3.0.0',
        info : {
            title : "InkFinder",
            version : "1.0.0",
        },
        components: {
            securitySchemas: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
              },
            },
          },
        servers : [
            {
                url : "https://inkfinder.vercel.app/api/"
            }
        ]
    },
    apis: ["./router/index.js"],
    requestInterceptor: (req) => {
        console.log("fdfd")
        const cookies = document.cookie
        req.headers = {
          ...req.headers,
          'Cookie': cookies
        };
        return req;
    },
}

const swaggerSpec = swaggerJSDoc(options)

mongo.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology : true,
    }).then(()=>{
    console.log("db ok");
}).catch((err)=>console.log(err))

mongo.set('strictQuery', true);

const app = express();


app.use(cors({
    credentials : true,
    origin : "*",
    // [ "https://inkfinder2.azurewebsites.net","http://localhost:17579","http://localhost:4444","http://localhost:4000","http://localhost:3000","http://localhost:8080" ,"http://localhost:8181" ,"http://localhost:5000", "http://localhost:5000/" , "https://inkfinder.azurewebsites.net/" , "https://inkfinder.vercel.app/", "https://inkfinder.vercel.app", "https://inkfinder.azurewebsites.net" , "http://localhost:5173/" , "http://localhost:5173/dalle" , "http://localhost:5173", "http://localhost:5001", "http://localhost:5001/" , process.env.CLIENT_URL]
}))

app.use(cookieParser())
app.use(errorMiddleware);
app.use(express.json({ limit: '50mb' }));
app.use('/api',router)
app.use(express.static('./client/csletmelearn/dist/'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api-docs', swaggerui.serve , swaggerui.setup(swaggerSpec))



app.get("/*", (req, res) => {
    res.sendFile("/home/site/wwwroot/client/csletmelearn/dist/index.html");
 });

app.listen(process.env.PORT, (err) => {
    if (err){
        return console.log(err);
    }

    console.log("Server ok");
})