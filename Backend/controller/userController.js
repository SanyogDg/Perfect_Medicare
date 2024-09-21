// import { createSlice } from '@reduxjs/toolkit';
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import ErrrorHandler from "../middlewares/errorMiddleware.js"
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/generateToken.js"
import cloudinary from "cloudinary"



// ****************PATIENT REGISTRATION:-*****************************
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, gender, password, dob, role, address } = req.body;

    if (!firstName || !lastName || !email || !phone || !gender ||
        !password || !dob || !role || !address
    ) {
        return next(new ErrrorHandler("Please Complete the form.", 400));
    }


    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler("Email already in Use.", 400));
    }

    const user = await User.create({
        firstName, lastName, email, phone, address, gender, password, dob, role: "Patient"
    })
    generateToken(user, "Patient is Registered", 200, res);
})

// **************PATIENT OR ADMIN LOGGIN:-****************
export const userLogin = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return next(new ErrorHandler("Please Provide all Details", 400));
    }

  

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password!", 400));
    }

    const isPasswordMatched = await user.comparePasswords(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password!", 400));
    }

    if (role != user.role) {
        return next(new ErrorHandler("User not found with this Role.", 400));
    }
    generateToken(user, "User is Logged In", 200, res);
})

// *********REGISTER NEW ADMIN:-*******************
export const newAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, gender, password, dob } = req.body;

    if (!firstName || !lastName || !email || !phone || !gender ||
        !password || !dob
    ) {
        return next(new ErrrorHandler("Please Complete the form to Register as Admin.", 400));
    }

    const adminAlreadyExist = await User.findOne({ email });
    if (adminAlreadyExist) {
        return next(new ErrorHandler("Admin already exists with this Email!"));
    }

    const admin = await User.create({
        firstName, lastName, email, phone, gender, dob, password, role: "Admin", address: "Perfect Medicare Services Ltd."
    })
    res.status(200).json({
        success: true,
        message: "Admin Registered Successfully!",
        admin
    })

})


// *******************GET ALL DOCTORS LIST:-*******************
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors,
    });
});

// *********GET USER DETAILS:-*************
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});


//********Admin Logg Out:-***********
export const adminLoggout = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json
        ({
            success: true,
            message: "Admin Logged Out Successfully."
        })
})


// ***********PATIENT LOGG OUT:-*******
export const patientLoggout = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json
        ({
            success: true,
            message: "Patient Logged Out Successfully."
        })
})



// ***********ADD NEW DOCTOR:-*************
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar is requied!", 400));
    }

    const { docAvatar } = req.files;
    const fileTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!fileTypes.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("Provided Image Format is not Supported."));
    }

    const { firstName, lastName, email, phone, gender, password, dob, doctorDepartment } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !dob ||
        !gender ||
        !password ||
        !doctorDepartment ||
        !docAvatar
    ) {
        return next(new ErrorHandler("Please Complete the Form!", 400));
    }


    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(
            new ErrorHandler("Doctor With This Email Already Exists!", 400)
        );
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary Response.")
    }

    const doctor = await User.create({
        firstName, lastName, email, phone, gender, password, dob, doctorDepartment, address:"Perfect Medicare Ltd.", role: "Doctor", docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    })
    res.status(200)
        .json({
            success: true,
            message: "New Doctor Registered Successfully!",
            doctor
        })
})