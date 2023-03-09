import express from 'express'
import cors from 'cors'
import  mongo from 'mongoose';
import { addPostValidation } from './validations/OffersValidator.js';
import * as OfferControllers from './controllers/OfferController.js'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import { router } from './router/index.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js'
import bodyParser from 'body-parser';
import path from 'path';

dotenv.config()

mongo.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology : true,
    }).then(()=>{
    console.log("db ok");
}).catch((err)=>console.log(err))

const app = express();

app.use(express.json());
app.use(cors({
    credentials : true,
    origin : [ "http://localhost:5000", "http://localhost:5000/" , "https://inkfinder.azurewebsites.net/" , "https://inkfinder.azurewebsites.net" , "http://localhost:5173/" , "http://localhost:5173", "http://localhost:5001", "http://localhost:5001/" , process.env.CLIENT_URL]
}))
app.use(cookieParser())
app.use('/api',router)
app.use(errorMiddleware);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./client/csletmelearn/dist/'));


app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "csletmelearn" , "dist",     
    "index.html"));
 });

app.listen(process.env.PORT, (err) => {
    if (err){
        return console.log(err);
    }

    console.log("Server ok");
})