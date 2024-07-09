// This file is created to ensure only an Admin can access the admin functionality {add or remove other admin};
import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import jwt from 'jsonwebtoken';
import ErrorHandler from "./errorMiddleware.js";
import { User } from "../models/userSchema.js";

export const adminAuthenticated = catchAsyncErrors(async (req, res, next) =>
{
    const token = req.cookies.adminToken;
    if (!token) {
      return next(
        new ErrorHandler("Dashboard User is not authenticated!", 400)
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Admin") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }
    next();
})


export const patientAuthenticated = catchAsyncErrors(async (req, res, next) =>
    {
        const token = req.cookies.patientToken;
        if (!token) {
            return next(new ErrorHandler("Patient is not Authenticated!", 400));
        }
        // Below checks whether the token is generated from the same website.
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        if (req.user.role != "Patient") {
            return next(new ErrorHandler(`${req.user.role} not Authorised for this Role.`, 403));
        }
        next();
    })