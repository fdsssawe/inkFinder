import express from 'express'
import cors from 'cors'
import  mongo from 'mongoose';
import { addPostValidation } from './validations/OffersValidator.js';
import * as OfferControllers from './controllers/OfferController.js'
import { url } from './mongo.js';

mongo.connect(url,).then(()=>{
    console.log("db ok");
}).catch((err)=>console.log(err))

const app = express();

app.use(express.json());
app.use(cors())

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