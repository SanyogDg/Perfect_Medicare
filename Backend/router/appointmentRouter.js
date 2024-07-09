import express from "express"
import { deleteAppointment, getAllAppointments, requestAppointment, updateAppointments } from "../controller/appointmentController.js";
import {patientAuthenticated,adminAuthenticated} from "../middlewares/auth.js"
const router = express();

router.post("/get-appointment", patientAuthenticated, requestAppointment);
router.get("/admin/see-all-appointments", adminAuthenticated, getAllAppointments);
router.put("/admin/update-appointment/:id", adminAuthenticated, updateAppointments);
router.delete("/admin/delete-appointment/:id", adminAuthenticated, deleteAppointment);

export default router;