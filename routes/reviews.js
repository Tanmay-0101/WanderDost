const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const Review=require("../models/reviews.js");
const {validateReview, isLoggedIn, isReviewOwner}=require("../middleware.js");

const reviewController = require("../controller/review.js");

//POST ROUTE FOR REVIEWS
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.postReview));

//DELETE REVIEW ROUTE
router.delete("/:reviewId",isLoggedIn,isReviewOwner,wrapAsync(reviewController.delReview));

module.exports= router;