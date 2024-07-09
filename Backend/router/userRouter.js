import express from "express"
import { addNewDoctor, adminLoggout, getAllDoctors, getUserDetails, newAdmin, patientLoggout, patientRegister, userLogin } from "../controller/userController.js"
import { adminAuthenticated, patientAuthenticated } from "../middlewares/auth.js";


const router = express()

router.post("/register/patient", patientRegister);
router.post("/login", userLogin);
router.post("/admin/register",adminAuthenticated, newAdmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", adminAuthenticated, getUserDetails);
router.get("/patient/me", patientAuthenticated, getUserDetails);
router.get("/admin/logout",adminAuthenticated, adminLoggout);
router.get("/patient/logout",patientAuthenticated, patientLoggout);
router.post("/admin/doctor/register",adminAuthenticated,   addNewDoctor);

export default router;