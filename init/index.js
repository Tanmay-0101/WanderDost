const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const initData=require("./data.js");

main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderdost");
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({...obj,owner:"66d60a914c46ba5f36244cb4"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();