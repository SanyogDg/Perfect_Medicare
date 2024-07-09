import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js"



export const requestAppointment = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, appointment_date, department, doctor_firstName, doctor_lastName, hasVisited, address } = req.body;

  if (!firstName || !lastName || !email || !phone || !dob || !gender || !appointment_date || !department || !doctor_firstName || !doctor_lastName || !address) {
    return next(new ErrorHandler("Please Complete the Form!", 400));
  }

  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  // If no doctor is found with the requested Appointment then:--
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found", 404));
  }
  // If one or more doctor is found with the same name and department then it is better to take appointment through other medium:--
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email Or Phone!",
        400
      )
    );
  }


  const doctor = isConflict[0];

  if (!doctor || !doctor._id) {
    return next(new ErrorHandler("Doctor ID is missing", 400));
  }

  const patientId = req.user ? req.user._id : null;

  if (!patientId) {
    return next(new ErrorHandler("Patient ID is missing", 400));
  }

  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId: doctor._id,
    patientId,
  });
  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Requested Successfully!",
  });

}
)
export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});


export const updateAppointments = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  // Finding the Appointment by above ID:-
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }

  appointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({
    success: true,
    message: "Appointment Updated Successfully!",
    appointment
  })

})

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }

  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted Successfully!."
  })
})