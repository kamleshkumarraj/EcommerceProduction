import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { productsModel } from "../../models/products.model.js";

export const validateAvailability = asyncHandler(async (req , res , next) => {
    const {orderItems} = req.body;

    const checkAvailability = async (item , product) =>{
        if(item.quantity <= product.stock) return 'true';
        else return {msg : `stock not available this ${item.name}`} 
    }
    
    const arr = await orderItems.map(async (item) => {
        const product = await productsModel.findById(item.productId);
        
        if(product) {
            return await (checkAvailability(item , product))
        }
        else return next(new ErrorHandler("Products not found please send correct id for all products !"))
        })

        const giveResponse =  (flag , msg , arr) => {
            if(flag == arr.length) return next()
            else return next(new ErrorHandler(msg , 403 ))
       }
        let flag = 0;
        let ms = ""
        await arr.forEach((res , idx) => {
            res.then((data) => {
                if(data == 'true') flag ++;
                else ms += data.msg+' ';
                if(idx+1 == arr.length) giveResponse(flag , ms , arr)
            })
            
        })
})