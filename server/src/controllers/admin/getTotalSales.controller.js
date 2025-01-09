import { asyncHandler } from "../../errors/asynHandler.js";
import { ordersModel } from "../../models/order.model.js";

export const getTotalSales = asyncHandler(async (req , res , next) => {
    const totalSalesProducts = await ordersModel.find({orderStatus : 'delivered'});

    const totalSalesAmount = totalSalesProducts.reduce((acc, cur) => {
        return acc + cur.totalPrice;
    } , 0);

    res.status(200).json({
        success : true,
        message : "You get total sales successfully",
        data : {
            totalSalesProducts,
            totalSalesAmount
        }
    });
})