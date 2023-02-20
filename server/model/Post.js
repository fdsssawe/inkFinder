import  mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    exchange: {
        type: String,
    },
    social:{
        type : String,
        required: true,
    }
} , {
    timestamps: true,
})

export default mongoose.model("Offer",PostSchema);