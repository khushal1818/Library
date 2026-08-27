// import { generate } from "otp-generator";
// import User from "../models/User.js";
// import sendOTP from "../utils/sendOTP.js";
// import bcrypt from "bcryptjs";
// import { v4 as uuidv4 } from "uuid";
// import jwt from "jsonwebtoken";

// //register  of a student step 1: register user and send otp

// export async function registerUser(req, res) {
//     try {
//         const { name, email, phone, password } = req.body;
//         if (!email) return res.status(400).json({ message: "Email is required" });

//         const cleanPhone = phone ? phone.toString().replace(/\D/g, '') : "";
//         if (cleanPhone.length !== 10) {
//             return res.status(400).json({ message: "Mobile number must be exactly of 10 digits" });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             if (existingUser.isVerified)
//                 return res.status(400).json({ message: "User already exists" });
//             await User.deleteOne({ email });

//         }

//         const otp = generate(6, { upperCaseAlpabates: false, LowerCaseAlphabets: false, specialChars: false });
//         //to send otp
//         try {
//             await sendOTP(email, otp);
//         } catch (EmailError) {
//             console.error("Error sending OTP email:", EmailError);
//             return res.status(500).json({
//                 message: "Failed to send OTP email. Please try again later."
//             });

//             const hashedPassword = await bcrypt.hash(password, 10);
//             const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
//             const studentId = `ST-${uuidv4().slice(0, 8).toUpperCase()}`; // Generate a unique student ID

//             const user = await User.create({

//                 name,
//                 email,
//                 phone: cleanPhone,
//                 password: hashedPassword,
//                 otp,
//                 otpExpiry,
//                 studentId,
//             });
//             res.status(201).json({ message: "User registered successfully. Please check your email for the OTP." });

//         }


//     }
//     catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).json({ message: "Error registering user", error: error.message });
//     }
// }


// // step : 2

// export async function verifyotp(req, res) {
//     try {
//         const { email, otp } = req.body;
//         if (!email)
//             return res.status(400).json({ message: "Email is required" });

//         const usr = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "User not found" });
//         if (user.otp !== otp || new Date() > new Date(user.otpExpiry)) {
//             return res.status(400).json({ message: "Invalid or expired OTP" });
//         }

//         object.assign(user, { isVerified: true, otp: null, otpExpiry: null });
//         await user.save();
//         res.status(200).json({ message: "OTP verified successfully" })

//     } catch (error) {
//         console.error("Error verifying OTP:", error);
//         res.status(500).json({ message: "Error verifying OTP", error: error.message });
//     }
// }


// // step: 3 complete profile
// export async function completeProfile(req, res) {
//     try {
//         const { email, department, stream, semester, year, rollno } = req.body;
//         if (!email) return res.status(400).json({ message: "Email is required" });

//         const usr = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "User not found" });

//        if (!user.isVerified) return res.status(400).json({ message: "User is not verified" });

//        Object.assign(user, { department, stream, semester, year, rollNo, isProfileComplete: true });
//        await user.save();
//        res.status(200).json({ message: "Profile completed successfully" });

//     } 
//     catch (error) {
//         console.error("Error completing profile:", error);
//         res.status(500).json({ message: "Error completing profile", error: error.message });
//     }
// }


// // Login as a student
// export async function loginUser(req, res) {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({ 
//                 success: false,
//                 message: "Email and password are required" });
//         }

//         const user = await User.findOne({ email });
//         if (!user) 
//             return res.status(400).json({ 
//                 success: false,
//                 message: "User not found" });
//         if (!user.isVerified) {
//             return res.status(400).json({ 
//                 success: false,
//                 message: "Please verify your email with OTP before logging in" });
//         }

//         if(!(await bcrypt.compare(password, user.password))) {
//             return res.status(400).json({ 
//                 success: false,
//                 message: "Invalid credentials" });
//         }

//         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
//         const { password: _, ...userResponse } = user.toObject(); // Exclude password from response
//         res.status(200).json({ 
//             success: true,
//             token,
//             user: userResponse
//         });
//     }
//     catch (error) {
//         console.error("Error during login:", error);
//         res.status(500).json({
//             success: false,
//             message: error.message
//             });
//     }
// }


// //get current user profile (me)
// export async function getProfile(req, res) {
//     try {
//         const user = await User.findById(req.user.id).select("-password");
//         if (!user) return res.status(404).json({ message: "User not found" });

//         res.status(200).json({ success: true, user });
//     } 
//     catch (error) {
//         console.error("Error fetching user profile:", error);
//         res.status(500).json({message: "Error fetching user profile", error: error.message });
//     }
// }

// // update user profile
// export async function updateProfile(req, res) {
//   try {
//     const { name, email, phone, department, stream, semester, academicYear, rollNumber } = req.body;
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (email) {
//       const normalizedEmail = email.trim().toLowerCase();
//       if (normalizedEmail !== user.email.toLowerCase()) {
//         if (user.role === "user") {
//           return res.status(400).json({ message: "Students are not allowed to change their email address" });
//         }
//         if (await User.findOne({ email: normalizedEmail, _id: { $ne: user._id } })) {
//           return res.status(400).json({ message: "Email already in use" });
//         }
//         user.email = normalizedEmail;
//       }
//     }
//     if (phone) {
//       const cleanPhone = phone.toString().replace(/\D/g, "");
//       if (cleanPhone.length !== 10) {
//         return res.status(400).json({ message: "Mobile number must be exactly 10 digits" });
//       }
//       user.phone = cleanPhone;
//     }

//     if (name) user.name = name;
//     if (department) user.department = department;
//     if (stream) user.stream = stream;
//     if (semester) user.semester = semester;
//     if (academicYear) user.year = academicYear;
//     if (rollNumber) user.rollNo = rollNumber;

//     await user.save(); //update profile
//     res.status(200).json({ success: true, message: "Profile updated successfully", user });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).json({ message: "Error updating profile", error: error.message });
//   }
// }


// //to get all students accounts (admin)
// export async function getUsers(req, res) {
//     try {
//         const users = await User.find({ role: "user", isVerified: true, isProfileComplete: true }).select("-password");
//         res.status(200).json({ success: true, users });
//     }

//     catch (error) {
//         console.error("Error fetching students:", error);
//         res.status(500).json({ message: "Error fetching students", error: error.message });
//     }
// }


// //for admin registeration 
// export async function registerAdmin(req, res) {
//     try {
//         const { name, email, phone, password } = req.body;
//         if(!name || !email || !phone || !password) {
//             return res.status(400).json({ message: "Please enter all required fields" });
//         }

//         if(await User.findOne({ email })) {
//             return res.status(400).json({ message: "User already exists with this email" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({
//             name,
//             email: email.trim().toLowerCase(),
//             phone,
//             password: hashedPassword,
//             role: "admin",
//             isVerified: true,
//         });

//         const {password: _, ...userResponse} = user.toObject(); // Exclude password from response
//         res.status(201).json({ success: true, message: "Admin registered successfully", user: userResponse });
//     }
//     catch (error) {
//         console.error("Error registering admin:", error);
//         res.status(500).json({ message: "Error registering admin", error: error.message });
//     }
// }




import { generate } from "otp-generator";
import User from "../models/User.js";
import sendOTP from "../utils/sendOTP.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

// ======================================================
// STEP 1: Register Student + Send OTP
// ======================================================

export async function registerUser(req, res) {
    try {
        const { name, email, phone, password } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        if (!name || !password) {
            return res.status(400).json({
                message: "Name and password are required",
            });
        }

        const cleanPhone = phone
            ? phone.toString().replace(/\D/g, "")
            : "";

        if (cleanPhone.length !== 10) {
            return res.status(400).json({
                message: "Mobile number must be exactly 10 digits",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            if (existingUser.isVerified) {
                return res.status(400).json({
                    message: "User already exists",
                });
            }

            await User.deleteOne({
                email: normalizedEmail,
            });
        }

        const otp = generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // Send OTP
        try {
            await sendOTP(normalizedEmail, otp);
        } catch (emailError) {
            console.error("Error sending OTP email:", emailError);

            return res.status(500).json({
                message: "Failed to send OTP email. Please try again later.",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // OTP expires after 5 minutes
        const otpExpiry = new Date(
            Date.now() + 5 * 60 * 1000
        );

        // Generate Student ID
        const studentId = `ST-${uuidv4()
            .slice(0, 8)
            .toUpperCase()}`;

        // Create user
        const user = await User.create({
            name,
            email: normalizedEmail,
            phone: cleanPhone,
            password: hashedPassword,
            otp,
            otpExpiry,
            studentId,
        });

        return res.status(201).json({
            message:
                "User registered successfully. Please check your email for the OTP.",
            studentId,
        });
    } catch (error) {
        console.error("Error registering user:", error);

        return res.status(500).json({
            message: "Error registering user",
            error: error.message,
        });
    }
}

// ======================================================
// STEP 2: Verify OTP
// ======================================================

export async function verifyOTP(req, res) {
    try {
        const { email, otp } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        if (!otp) {
            return res.status(400).json({
                message: "OTP is required",
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase(),
        });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                message: "OTP not found or already verified",
            });
        }

        if (
            user.otp !== otp ||
            new Date() > new Date(user.otpExpiry)
        ) {
            return res.status(400).json({
                message: "Invalid or expired OTP",
            });
        }

        Object.assign(user, {
            isVerified: true,
            otp: null,
            otpExpiry: null,
        });

        await user.save();

        return res.status(200).json({
            message: "OTP verified successfully",
        });
    } catch (error) {
        console.error("Error verifying OTP:", error);

        return res.status(500).json({
            message: "Error verifying OTP",
            error: error.message,
        });
    }
}

// ======================================================
// STEP 3: Complete Student Profile
// ======================================================

export async function completeProfile(req, res) {
    try {
        const {
            email,
            department,
            stream,
            semester,
            year,
            rollNo,
        } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase(),
        });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        if (!user.isVerified) {
            return res.status(400).json({
                message: "User is not verified",
            });
        }

        Object.assign(user, {
            department,
            stream,
            semester,
            year,
            rollNo,
            isProfileComplete: true,
        });

        await user.save();

        return res.status(200).json({
            message: "Profile completed successfully",
        });
    } catch (error) {
        console.error("Error completing profile:", error);

        return res.status(500).json({
            message: "Error completing profile",
            error: error.message,
        });
    }
}

// ======================================================
// LOGIN STUDENT
// ======================================================

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase(),
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                message:
                    "Please verify your email with OTP before logging in",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        const { password: _, ...userResponse } = user.toObject();

        return res.status(200).json({
            success: true,
            token,
            user: userResponse,
        });
    } catch (error) {
        console.error("Error during login:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// ======================================================
// GET CURRENT USER PROFILE
// ======================================================

export async function getProfile(req, res) {
    try {
        const user = await User.findById(req.user._id).select(
            "-password"
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);

        return res.status(500).json({
            message: "Error fetching user profile",
            error: error.message,
        });
    }
}

// ======================================================
// UPDATE USER PROFILE
// ======================================================

export async function updateProfile(req, res) {
    try {
        const {
            name,
            email,
            phone,
            department,
            stream,
            semester,
            academicYear,
            rollNumber,
        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (email) {
            const normalizedEmail = email.trim().toLowerCase();

            if (
                normalizedEmail !== user.email.toLowerCase()
            ) {
                if (user.role === "user") {
                    return res.status(400).json({
                        message:
                            "Students are not allowed to change their email address",
                    });
                }

                const existingEmail = await User.findOne({
                    email: normalizedEmail,
                    _id: { $ne: user._id },
                });

                if (existingEmail) {
                    return res.status(400).json({
                        message: "Email already in use",
                    });
                }

                user.email = normalizedEmail;
            }
        }

        if (phone) {
            const cleanPhone = phone
                .toString()
                .replace(/\D/g, "");

            if (cleanPhone.length !== 10) {
                return res.status(400).json({
                    message:
                        "Mobile number must be exactly 10 digits",
                });
            }

            user.phone = cleanPhone;
        }

        if (name) user.name = name;
        if (department) user.department = department;
        if (stream) user.stream = stream;
        if (semester) user.semester = semester;
        if (academicYear) user.year = academicYear;
        if (rollNumber) user.rollNo = rollNumber;

        await user.save();

        const { password: _, ...userResponse } =
            user.toObject();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: userResponse,
        });
    } catch (error) {
        console.error("Error updating profile:", error);

        return res.status(500).json({
            message: "Error updating profile",
            error: error.message,
        });
    }
}

// ======================================================
// GET ALL STUDENTS - ADMIN
// ======================================================

export async function getUsers(req, res) {
    try {
        const users = await User.find({
            role: "user",
            isVerified: true,
            isProfileComplete: true,
        }).select("-password");

        return res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.error("Error fetching students:", error);

        return res.status(500).json({
            message: "Error fetching students",
            error: error.message,
        });
    }
}

// ======================================================
// REGISTER ADMIN
// ======================================================

export async function registerAdmin(req, res) {
    try {
        const {
            name,
            email,
            phone,
            password,
        } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                message: "Please enter all required fields",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
            });
        }

        const cleanPhone = phone
            .toString()
            .replace(/\D/g, "");

        if (cleanPhone.length !== 10) {
            return res.status(400).json({
                message: "Mobile number must be exactly 10 digits",
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = await User.create({
            name,
            email: normalizedEmail,
            phone: cleanPhone,
            password: hashedPassword,
            role: "admin",
            isVerified: true,
        });

        const { password: _, ...userResponse } =
            user.toObject();

        return res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            user: userResponse,
        });
    } catch (error) {
        console.error("Error registering admin:", error);

        return res.status(500).json({
            message: "Error registering admin",
            error: error.message,
        });
    }
}