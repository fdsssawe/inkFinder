import  mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min : 1,
        max : 30,
    },
    surname: {
        type: String,
        required: true,
        min : 1,
        max : 30,
    },
    mail:{
        type : String,
        required: true,
        unique : true,
    },
    password:{
        type : String,
        required: true,
        min : 4,
        max : 20,
    },
    picture: {
        type: String,
        default: "",
    },
    impressions: {
        type: Number,
    },
} , {
    timestamps: true,
})

export default mongoose.model("User",UserSchema);