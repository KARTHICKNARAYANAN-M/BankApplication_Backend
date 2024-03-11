const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema(
    {
        name : String,
        email : {type : String, unique : true},
        mobile  : String,
        JobPosition : String,
        password : String,
    },
    {
        collection : "RegisterUser"
    }
);

mongoose.model("UserInfo", UserDataSchema);