import mongoose from "mongoose";

const studentTimeSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  timeIn: {
    type: [String],
  },
  timeOut: {
    type: [String],
  },
});

const StudentTime = mongoose.model("StudentTime", studentTimeSchema);

export default StudentTime;
