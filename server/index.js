import express from 'express'
import cors from 'cors'
import  mongo from 'mongoose';
import { addPostValidation } from './validations/OffersValidator.js';
import * as OfferControllers from './controllers/OfferController.js'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import { router } from './router/index.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

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
app.use(cors())
app.use(cookieParser())
app.use('/api',router)
app.use(errorMiddleware);

app.get('/',(req,res) => {
    res.send("<b>fdfd</b>");
});

app.post("/create", addPostValidation , OfferControllers.create)

app.listen(4444, (err) => {
    if (err){
        return console.log(err);
    }

    console.log("Server ok");
})