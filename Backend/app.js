import express from 'express'
import { config } from 'dotenv';
import cors from "cors";
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbConnection } from './database/dbConnection.js';
import messageRouter from "./router/messageRouter.js"
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import patientRouter from "../Backend/router/userRouter.js"
import appointmentRouter from "../Backend/router/appointmentRouter.js"




const app = express();
config({ path:"./config/config.env" });

app.use(
    cors(
        {
            origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
            allowedHeaders: ["Content-Type", "Authorization"]
        }
    )
)

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
  }));
  
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", patientRouter);
app.use("/api/v1/appointment",appointmentRouter)


dbConnection()

app.use(errorMiddleware)
export default app;


// {
//     "firstName":"Appointment",
//     "lastName":"Appointment",
//     "email":"appointment@gmail.com",
//     "phone":"1234567891",
//     "dob":"2004-01-01",
//     "gender":"Male",
//     "appointment_date":"2008-02-02",
//  "department":"Radiology",
//     "address":"akjfhas;lkjff",
//     "doctor_firstName":"Doctor",
//     "doctor_lastName":"Doctor"
// }