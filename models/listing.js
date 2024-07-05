const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1509937991139-724301be9280?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDd8RnpvM3p1T0hONnd8fGVufDB8fHx8fA%3D%3D",
        set: (v)=>
            v===""?
            "https://images.unsplash.com/photo-1509937991139-724301be9280?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDd8RnpvM3p1T0hONnd8fGVufDB8fHx8fA%3D%3D":v,
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;