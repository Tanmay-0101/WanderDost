const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controller/listing.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

router.route("/")
    .get(wrapAsync(listingController.index)) //INDEX ROUTE TO SHOW ALL LISTINGS
    .post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.postNewListing)); //NEW ROUTE TO ADD A NEW LISTING
    

router.get("/new",isLoggedIn,listingController.renderNewForm);

//SEARCH RELATED ROUTE(S)
router.get("/search",wrapAsync(listingController.searchListings));

//PRIVACY 
router.get("/privacy",listingController.renderPrivacyPage);

//PRIVACY 
router.get("/terms",listingController.renderTermsPage);

router.route("/:id")
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.editListing))//update
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing)) //DELETE ROUTE TO DELETE A PARTICULAR LISTING
    .get(wrapAsync(listingController.showListing)); //SHOW ROUTE TO SHOW PARTICULAR LISTING

//EDIT ROUTE TO EDIT ANY LISTING
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

//FILTER RELATED ROUTE(S)
router.get("/filter/:category",wrapAsync(listingController.filterListings));

module.exports=router;

