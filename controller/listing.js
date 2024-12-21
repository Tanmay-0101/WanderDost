const { response } = require("express");
const Listing=require("../models/listing.js");
const mbxGeocoding=require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient=mbxGeocoding({accessToken:mapToken});

module.exports.index=async (req,res)=>{
    const myListings=await Listing.find({});
    const allListings=myListings.map((listing)=>{
        const taxAmount=Math.round(listing.price*0.18);
        return {...listing.toObject(),taxAmount};
    })
    res.render("index.ejs",{allListings, activeCategory:" "});
}

module.exports.renderNewForm=(req,res)=>{
    res.render("new.ejs");
}

module.exports.postNewListing=async(req,res)=>{
    let response=await geocodingClient
                 .forwardGeocode({
                    query: req.body.listing.location,
                    limit : 1,
                 })
                 .send();           

    const newListing= new Listing(req.body.listing);
    let url=req.file.path;
    let filename=req.file.filename;
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.categories = req.body.listing.categories || [];
    
    newListing.geometry=response.body.features[0].geometry;
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
}

module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    const edtListing=await Listing.findById(id);
    if(!edtListing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }

    let ogImageUrl=edtListing.image.url;
    ogImageUrl=ogImageUrl.replace("/upload","/upload/h_200,w_250");
    res.render("edit.ejs",{edtListing,ogImageUrl});
}

module.exports.editListing=async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid listing");
    }
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file!="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",
        populate:{
            path:"author",
        },
    }).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("show.ejs",{ listing });
}

module.exports.filterListings=async(req,res)=>{
    const category=req.params.category;
    const myListings=await Listing.find({categories:category});
    const filteredListings=myListings.map((listing)=>{
        const taxAmount=Math.round(listing.price*0.18);
        return {...listing.toObject(),taxAmount};
    })
    res.render('index.ejs',{allListings:filteredListings, activeCategory:category});
}

module.exports.searchListings=async(req,res)=>{
    const {q}=req.query;
    const regex=new RegExp(q,'i');

    const myListings= await Listing.find({
        $or: [
            {title : regex},
            {description : regex},
            { location: regex },
            { country: regex },
            { categories: { $in: [regex] } }
        ]
    });

    const searchRes=myListings.map((listing)=>{
        const taxAmount=Math.round(listing.price*0.18);
        return {...listing.toObject(),taxAmount};
    })

    res.render("index.ejs",{allListings:searchRes, activeCategory:""});
}

module.exports.renderPrivacyPage=(req,res)=>{
    res.render("privacy.ejs");
}

module.exports.renderTermsPage=(req,res)=>{
    res.render("terms.ejs");
}