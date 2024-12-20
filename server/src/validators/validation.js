import {body , validationResult} from 'express-validator';
import ErrorHandler from '../errors/errorHandler.js';

export const addressValidation = () => {
    return [
        body('address').notEmpty().withMessage("Address is required").isLength({min : 3 , max : 100}).withMessage("Address must be contains at least 3 characters and at most 100 characters"),
        body('city').notEmpty().withMessage("City is required").isLength({min :3 , max : 30}).withMessage("City must be contains at least 3 characters and at most 30 characters"),
        body('state').notEmpty().withMessage("State is required").isLength({min : 3 , max : 30}).withMessage("State must be contains at least 3 characters and at most 30 characters"),
        body('district').notEmpty().withMessage("District is required").isLength({min : 3 , max : 30}).withMessage("District must be contains at least 3 characters and at most 30 characters"),
        body('pinCode').notEmpty().withMessage("Pincode is required").isLength({min : 6 , max : 6}).withMessage("Pincode must be contains at least 6 characters and at most 6 characters").isNumeric().withMessage("Pincode must be numeric"),
        body('mobileNumber').isLength({min : 10 , max : 10}).withMessage("Mobile number must be contains at least 10 characters and at most 10 characters").isNumeric().withMessage("Mobile number must be numeric"),
        body('country').isLength({min : 3 , max : '30'}).withMessage("Country must be contains at least 3 characters and at most 30 characters")
    ]
}


export const validateFunc = (req , res , next) => {
    try {
        const result = validationResult(req);

    const message = result.array().map((err) => err.msg)

    if(result.array().length > 0){
        return next(new ErrorHandler(message , 400))
    }else{
        return next();
    }
    } catch (error) {
        return next(new ErrorHandler("We get error during validate the error !",400))
    }
}