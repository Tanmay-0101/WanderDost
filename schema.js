const Joi=require("joi");

module.exports.listingSchema=Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description:Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("",null),
        categories: Joi.array()
        .items(Joi.string().valid('mountains','swimming_pool', 'beach', 'river_side', 'iconic_cities', 'camping', 'farms'))
        .required(),
    }).required()
});

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number(),
        comment:Joi.string().required(),
    }).required()
})