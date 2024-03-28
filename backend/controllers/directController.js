import Student from "../models/studentModel.js";
import { format } from "date-fns";
import StudentTime from "../models/studentTimeModel.js";

export const home = async (req, res) => {
  try {
    const { id } = req.params;
    const students = await Student.find({}).sort({ fullName: 1 });
    const studentsData = [];

    for (const student of students) {
      const studentsTime = await StudentTime.findOne({
        studentId: student._id,
      }); // Use findOne instead of find

      const getStatus = (studentsTime) => {
        if (
          studentsTime &&
          Array.isArray(studentsTime.timeIn) &&
          Array.isArray(studentsTime.timeOut)
        ) {
          if (
            studentsTime.timeIn.length > 0 &&
            studentsTime.timeOut.length > 0
          ) {
            const lastTimeIn = new Date(
              studentsTime.timeIn[studentsTime.timeIn.length - 1]
            );
            const lastTimeOut = new Date(
              studentsTime.timeOut[studentsTime.timeOut.length - 1]
            );
            return lastTimeIn > lastTimeOut ? "IN" : "OUT";
          } else if (studentsTime.timeIn.length > studentsTime.timeOut.length) {
            return "IN";
          } else if (studentsTime.timeOut.length > studentsTime.timeIn.length) {
            return "OUT";
          }
        }
        return "";
      };

      studentsData.push({
        ...student._doc,
        studentsTime,
        status: getStatus(studentsTime),
      });
    }

    const male = studentsData.filter((student) => student.sex === "MALE");
    const female = studentsData.filter((student) => student.sex === "FEMALE");

    return res.status(200).json({
      Male: male,
      Female: female,
    });
  } catch (error) {
    return res.status(400).json({ error: `Error in Home Controller ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    const { fullName, password } = req.body;

    const studentName = await Student.findOne({ fullName: fullName.toUpperCase() });

    if (!studentName) {
      return res.status(400).json({ error: `Student Not Found` });
    }

    const isPasswordStudent = await Student.findOne({ password: password });

    if (!isPasswordStudent) {
      return res.status(400).json({ error: `Incorrect Password` });
    }

    return res.status(200).json({
      message: `Successfully Log In`,
      id: studentName._id,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Error in Log In Controller ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).json({ message: "Log Out Succesfully" });
  } catch {
    return res
      .status(400)
      .json({ error: `Error in Log Out Controller ${error}` });
  }
};

export const io = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({ _id: id });
    const studentTime = await StudentTime.findOne({ studentId: id });

    let statsIn = false;
    let statsOut = false;

    if (
      studentTime &&
      Array.isArray(studentTime.timeIn) &&
      Array.isArray(studentTime.timeOut)
    ) {
      if (studentTime.timeIn.length > 0 && studentTime.timeOut.length > 0) {
        const lastTimeIn = new Date(
          studentTime.timeIn[studentTime.timeIn.length - 1]
        );
        const lastTimeOut = new Date(
          studentTime.timeOut[studentTime.timeOut.length - 1]
        );
        statsIn = lastTimeIn > lastTimeOut;
        statsOut = !statsIn;
      } else if (studentTime.timeIn.length > studentTime.timeOut.length) {
        statsIn = true;
      } else if (studentTime.timeOut.length > studentTime.timeIn.length) {
        statsOut = true;
      }
    }

    if (!student) {
      return res.status(400).json({ error: `Student does not Exist` });
    }

    return res.status(200).json({
      message: `Successfully updated time for student ${student.fullName}`,
      name: student.fullName,
      statusIn: statsIn,
      statusOut: statsOut,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Error in Time In Out Controller ${error}` });
  }
};

export const ioOp = async (req, res) => {
  try {
    const { id, action } = req.params;

    const student = await Student.findOne({ _id: id });

    if (!student) {
      return res.status(400).json({ error: `Student does not Exist` });
    }

    let studentsTime = await StudentTime.findOne({ studentId: id });

    if (!studentsTime) {
      studentsTime = new StudentTime({
        studentId: id,
        timeIn: action === "in" ? [new Date()] : [],
        timeOut: action === "out" ? [new Date()] : [],
      });
      await studentsTime.save();
    } else {
      if (action === "in") {
        studentsTime.timeIn.push(new Date());
      } else if (action === "out") {
        studentsTime.timeOut.push(new Date());
      }
      await studentsTime.save();
    }

    return res.status(200).json({
      message: `Successfully updated time for student ${student.fullName}`,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Error in In Out Operation ${error}` });
  }
};

export const signup = async (req, res) => {
  try {
    const { fullName, password, sport, sex, level, email, birthdate} = req.body;

    if (!fullName || !password || !sport || !sex || !level || !email || !birthdate) {
      return res.status(400).json({ error: "Incomplete Information" });
    }

    const student = await Student.findOne({ fullName: fullName });

    if (student) {
      return res.status(400).json({ error: `${fullName} Already Exist` });
    }

    const newStudent = new Student({
      fullName: fullName.toUpperCase(),
      password: password,
      sport: sport,
      sex: sex,
      level: level,
      email: email,
      birthdate: birthdate,
    });

    await newStudent.save();

    return res.status(200).json({
      id: newStudent._id,
      fullName: newStudent.fullName,
      sport: newStudent.sport,
      sex: newStudent.sex,
      level: newStudent.level,
      email: newStudent.email,
      birthdate: newStudent.birthdate,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Error in Sign Up Controller ${error}` });
  }
};

export const view = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({ _id: id });

    if (!student) {
      return res.status(400).json({ error: `Student Does Not Exist` });
    }

    const date = format(student.birthdate, "MM/dd/yyyy")

    const studentTime = await StudentTime.findOne({ studentId: id });

    if (!studentTime) {
      return res.status(200).json({
        error: `No Time Table`,
        studentData: {
          id: student._id,
          fullName: student.fullName,
          email: student.email,
          level: student.level,
          sport: student.sport,
          sex: student.sex,
          birthdate: date,
        },
      });
    }

    const formattedTimesIn = studentTime.timeIn.map((time) => {
      const formattedTimeIn = format(time, "yyyy-MM-dd hh:mm:ss a");
      return formattedTimeIn;
    });

    const formattedTimesOut = studentTime.timeOut.map((time) => {
      const formattedTimeOut = format(time, "yyyy-MM-dd hh:mm:ss a");
      return formattedTimeOut;
    });

    return res.status(200).json({
      studentData: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        level: student.level,
        sport: student.sport,
        sex: student.sex,
        birthdate: date,
      },
      studentTimeIn: formattedTimesIn,
      studentTimeOut: formattedTimesOut,
    });
  } catch (error) {
    return res.status(400).json({ error: `Error in View Controller ${error}` });
  }
};

export const userEdit = async (req, res) => {
  try {
    const { fullName, password, sport, sex, level, email, birthdate } = req.body;
    const { id } = req.params;

    if (!fullName || !password || !sport || !sex || !level|| !email || !birthdate) {
      return res.status(400).json({ error: "Incomplete Information" });
    }

    const student = await Student.findOne({ _id: id });

    if (!student) {
      return res.status(400).json({ error: "Student Do Not Exist" });
    }

    student.fullName = fullName.toUpperCase();
    student.password = password;
    student.sport = sport;
    student.sex = sex;
    student.level = level;
    student.email = email;
    student.birthdate = birthdate;
    await student.save();

    const date = format(student.birthdate, "MM/dd/yyyy")

    const responseStudent = {
      _id: student._id,
      fullName: student.fullName,
      sport: student.sport,
      sex: student.sex,
      level: student.level,
      email: student.email,
      birthdate: date,
    };

    return res.status(200).json({ student: responseStudent });
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Error in User Edit Controller ${error}` });
  }
};

export const userView = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findOne({ _id: id });

    if (!student) {
      return res.status(400).json({ error: "Student Do Not Exist" });
    }

    const studentTime = await StudentTime.findOne({ studentId: id });

    if (!studentTime) {
      return res.status(200).json({ 
        error: `No Time Table`,
        student: student,
      });
    }

    const formattedTimesIn = studentTime.timeIn.map((time) => {
      const formattedTimeIn = format(time, "yyyy-MM-dd hh:mm:ss a");
      return formattedTimeIn;
    });

    const formattedTimesOut = studentTime.timeOut.map((time) => {
      const formattedTimeOut = format(time, "yyyy-MM-dd hh:mm:ss a");
      return formattedTimeOut;
    });


    return res.status(200).json({
      student: student,
      studentTimeIn: formattedTimesIn,
      studentTimeOut: formattedTimesOut,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Error in User Edit Controller ${error}` });
  }
};
