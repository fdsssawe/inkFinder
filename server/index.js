import express from 'express'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())

app.get('/',(req,res) => {
    res.send("<b>fdfd</b>");
});

app.listen(4444, (err) => {
    if (err){
        return console.log(err);
    }

    console.log("Server ok");
})