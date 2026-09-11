import mongoose from "mongoose"

const organizationSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true,
    },
    slug : {
        type : String,
        trim : true,
        required : true,
        unique : true,
    }
},{
    timestamps : true,
    createdAt : true,
}
)

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
