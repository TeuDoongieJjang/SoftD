import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minilength: 6,
  },
  sport: {
    type: String,
    required: true,
    enum: ["BASKETBALL", "VOLLEYBALL", "FOOTBALL"]
  },
  sex: {
    type: String,
    required: true,
    enum: ["MALE", "FEMALE"],
  },
  level: {
    type: String,
    required: true,
    enum: ["FRESHMEN", "SOPHOMORE", "JUNIOR", "SENIOR"],
  },
  email: { 
    type: String,
    required: true,
    match: /^[\w-]+(\.[\w-]+)*@rtu\.edu\.ph$/, // Regular expression to match emails ending with "@rtu.edu.ph"
 },
 birthdate: {
  type: Date,
  required: true,
 }
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
