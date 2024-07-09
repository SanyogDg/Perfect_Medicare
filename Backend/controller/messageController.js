import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {Message} from "../models/messageSchema.js"

export const deliverMessage = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName,email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
        return next(new ErrorHandler("Please Complete the Form",400))
    }
    
    await Message.create({ firstName, lastName, email, phone, message }),
        res.status(200).json({
            success: true,
            message:"Message is Delivered."
        })

})


export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages =await Message.find();
    res.status(200).json({
        success: true,
        message: "Fetched All Messages!",
        messages,
    })
})