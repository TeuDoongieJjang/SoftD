import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    ipAddress:{
        type: String,
    },
    fullName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minilength: 6
    },
    sport:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true,
        enum:["Male", "Female"]
    },
    level:{
        type: String,
        required: true,
        enum:["Freshmen", "Sophomore", "Junior", "Senior"]
    }
})

const Student = mongoose.model("Student", studentSchema)

export default Student