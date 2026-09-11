import mongoose from "mongoose"

const productScheme = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true,
    },
    description : {
        type : String,
        trim : true
    },
    organization : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Organization",
        required : true
    },

},{timestamps : true})

const Project = mongoose.model("Product", productScheme)

export default Project