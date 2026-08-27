// import User from "../models/User.js";

// //to search th student by roll no
// export async function searchStudentsByRoll(req, res) {
//     try {
//         const roll = String(req.query.roll || "").trim();
//         if (!roll) {
//             return res.status(200).json({ success: true, students: [] });

//         }
//         const rollRegex = new RegExp(roll, "i");
//         const students = await User.find({
//             role: "user",
//             isProfileComplete: true,
//             rollNo: { $regex: rollRegex }
//         })
//             .select("name email department stream semster year rollno")
//             .limit(12);

//         const mappedStudents = students.map((student) => ({
//             name: student.name,
//             email: student.email,
//             department: student.department || "",
//             stream: student.stream || "",
//             academicYear: student.year || "",
//             semester: student.semester || "",
//             rollNumber: student.rollNo || "",
//         }));

//         res.status(200).json({
//             success: true,
//             students: mappedStudents
//         });
//     }

//     catch (error) {
//         console.error("Error searching students by roll:", error);
//         res.status(500).json({
//             success: false,
//             message: "Error searching students by roll",
//             error: error.message
//         });
//     }
// }


// import User from "../models/User.js";

// // Search student by roll number
// export async function searchStudentsByRoll(req, res) {
//     try {
//         const roll = String(req.query.roll || "").trim();

//         if (!roll) {
//             return res.status(200).json({
//                 success: true,
//                 students: [],
//             });
//         }

//         const rollRegex = new RegExp(roll, "i");

//         const students = await User.find({
//             role: "user",
//             isProfileComplete: true,
//             rollNumber: { $regex: rollRegex },
//         })
//             .select(
//                 "name email department stream semester year rollNumber studentId"
//             )
//             .limit(12);

//         const mappedStudents = students.map((student) => ({
//             id: student._id,
//             _id: student._id,
//             name: student.name,
//             email: student.email,
//             department: student.department || "",
//             stream: student.stream || "",
//             academicYear: student.year || "",
//             semester: student.semester || "",
//             rollNumber: student.rollNumber || "",
//             studentId: student.studentId || "",
//         }));

//         return res.status(200).json({
//             success: true,
//             students: mappedStudents,
//         });

//     } catch (error) {
//         console.error("Error searching students by roll:", error);

//         return res.status(500).json({
//             success: false,
//             message: "Error searching students by roll",
//             students: [],
//             error: error.message,
//         });
//     }
// }


import User from "../models/User.js";

// Search student by roll number
export async function searchStudentsByRoll(req, res) {
    try {
        const roll = String(req.query.roll || "").trim();

        if (!roll) {
            return res.status(200).json({
                success: true,
                students: [],
            });
        }

        const rollRegex = new RegExp(roll, "i");

        const students = await User.find({
            role: "user",
            isProfileComplete: true,
            rollno: { $regex: rollRegex },
        })
            .select(
                "name email department stream semester year rollno studentId"
            )
            .limit(12);

        const mappedStudents = students.map((student) => ({
            id: student._id,
            _id: student._id,
            name: student.name,
            email: student.email,
            department: student.department || "",
            stream: student.stream || "",
            academicYear: student.year || "",
            semester: student.semester || "",
            rollNumber: student.rollno || "",
            rollno: student.rollno || "",
            studentId: student.studentId || "",
        }));

        return res.status(200).json({
            success: true,
            students: mappedStudents,
        });

    } catch (error) {
        console.error("Error searching students by roll:", error);

        return res.status(500).json({
            success: false,
            message: "Error searching students by roll",
            students: [],
            error: error.message,
        });
    }
}