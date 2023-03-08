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

app.set('port', process.env.PORT || 5000);
console.log("++++++++++++++++" + app.get('port'));
app.use(express.static('./client/csletmelearn/dist'))
app.use(express.json());
app.use(cors({
    credentials : true,
    origin : "http://localhost:5000"
}))
app.use(cookieParser())
app.use('/api',router)
app.use(errorMiddleware);


app.get('/',(req,res) => {
    res.send("<b>fdfd</b>");
});

app.post("/create", addPostValidation , OfferControllers.create)

app.get("*", (req, res) => {
    res.sendFile(path("./client/csletmelearn/dist/index.html"));
 });

app.listen(process.env.PORT, (err) => {
    if (err){
        return console.log(err);
    }

    console.log("Server ok");
})