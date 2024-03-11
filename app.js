const express = require("express");
const app = express();

app.use(express.json());

//var cors = require('cors');
//app.use(cors());

const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const mongourl = "mongodb+srv://mkarthick3:Karthick3@project1.rgqrjz0.mongodb.net/BankApplication?retryWrites=true&w=majority"

const bcrypt = require("bcrypt");

const JWT_SECRET =  "nWKEngefmekmfkmfel455"
mongoose
   .connect(mongourl)
   .then(() => {
     console.log("Database Connected");
   })
   .catch((e) =>{
      console.log(e);
   })


require('./UserDetails');
const User = mongoose.model("UserInfo");

require('./ApplicationFormSchema')
const ApplicationForm = mongoose.model("ApplicationForm");

app.get("/", (req, res)=>{
    res.send({status : "Started"});
})


app.post('/register', async(req, res) =>{
     const {name, email, mobile, JobPosition, password} = req.body;

     const oldUser = await User.findOne({email : email});

     if(oldUser)
     {
        return res.send({data : "User already exists"});
     }

     const encryptedpassword  = await bcrypt.hash(password, 10);
     try{
        await User.create({
            name,
            email,
            mobile,
            JobPosition,
            password : encryptedpassword,
        });
        res.send({status : "Ok", data : "User Created"});
     }
     catch(error){
        res.send({status : "error", data : error})
     }
});



app.post("/loginuser", async(req,res)=>
{

   const {mobile, password} = req.body;


   console.log(mobile);
   
   const oldUser = await User.findOne({mobile: mobile});


  if(!oldUser)
   {
      const olduser = await User.findOne({email : mobile});
      if(!olduser)
      {
         return res.send({data : "User doesn't exists"});
      }
   }
   

   if(await bcrypt.compare(password, oldUser.password))
   {
      const token = jwt.sign({email : oldUser.mobile}, JWT_SECRET);

      if(res.status(201))
      {
         res.send({status : "ok", data : token});
      }
      else{
         return res.send({error : "error"});
      }
   }
   else
   {
      return res.send({error : "error"});
   }
})

app.post("/uploadimage", async(req,res)=>
{
   console.log(req.body);
    return res.send("file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FBankApplication-4eddd8cd-d8a2-48fa-a282-68d357fd3c70/ImagePicker/9175b692-26cd-49a7-9df3-e660c8530156.jpeg")
})

app.post("/SubmitForm", async(req,res)=>
{
    const {PersonalDetails, ResidentialAddress, OfficeDetails, familyMembers,ProfileImage, SignatureImage, Officials} = req.body;

   const oldUser = await ApplicationForm.findOne({MembershipSlipNo : PersonalDetails.MemberShipSlipNo});

   if(oldUser)
   {
      return res.send({status : "created", data : "Membership No already exists"});
      return;
   }

   const AppForm = await ApplicationForm.create(
      {
         MembershipSlipNo : PersonalDetails.MemberShipSlipNo,
         PersonalDetails : PersonalDetails,
         ResidentialAddress : ResidentialAddress,
         OfficeDetails : OfficeDetails,
         familyMembers : familyMembers,
         ProfileImage : ProfileImage,
         SignatureImage : SignatureImage,
         Officials : Officials,
      }

   )

   const Member = await ApplicationForm.findOne({MembershipSlipNo : PersonalDetails.MemberShipSlipNo})
   const data = {
        MemberShipSlipNo : Member.MembershipSlipNo,
        ProfileImage : Member.ProfileImage,
        Name : Member.PersonalDetails.name,

   }

   return res.send({
      status : "ok",
      data : data
   })




})


app.listen(5003, ()=>{
    console.log("Node js Server Started");
})

