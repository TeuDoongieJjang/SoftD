import mongoose from "mongoose";

const studentTimeSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  timeIn: {
    type: [Date],
  },
  timeOut: {
    type: [Date],
  },
});

const StudentTime = mongoose.model("StudentTime", studentTimeSchema);

export default StudentTime;
