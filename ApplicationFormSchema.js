const mongoose = require("mongoose");

const PersonalDetailsSchema = new mongoose.Schema
(
    {
        name : String,
        MemberShipSlipNo : {type : String},
        DOB : String,
        Age : String,
        BloodGroup : String,
        EducationalQualify :  String,
        PanNo : String,
        AAdharNo  : String,
        DateOfEntryService : String,
    }
)


const ResidentialAddressSchema = new mongoose.Schema
(
    {
        HouseAddress : String,
        HouseNo : String,
        LandMark : String,
        PO : String,
        PinCode : String,
        Village : String,
        District : String,
        Mobile : String,
        MobileRes : String

    }
)

const OfficeDetailsSchema = new mongoose.Schema
(
    {
        Branch : String,
        DPCode : String,
        OfficeAddress : String,
        OfficePO : String,
        OfficePinCode : String,
        OfficeTelephone : String,
    }
)


const familyMembersSchema = new mongoose.Schema
(
    {
        name : String,
        age : String,
        occupation : String,
        relationship : String,

    }
)

const OfficialSchema = new mongoose.Schema
(
    {
        PresidentName : String,
        SecretaryName : String,
        TreasurerName  : String,
        AppraiserName : String,
    }
)
const ApplicationFormSchema = new mongoose.Schema
(
    {
        MembershipSlipNo : {type : String, required : true},
        PersonalDetails : PersonalDetailsSchema,
        ResidentialAddress : ResidentialAddressSchema,
        OfficeDetails :  OfficeDetailsSchema,
        familyMembers : [familyMembersSchema],
        ProfileImage : String,
        SignatureImage : String,
        Officials  : OfficialSchema,
       

    },
    {
        collection : "ApplicationForm"
    }
  
)



mongoose.model("ApplicationForm", ApplicationFormSchema);