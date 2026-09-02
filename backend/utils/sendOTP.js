import { Resend } from "resend";

const sendOTP = async (email, otp) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
        from: "Library System <onboarding@resend.dev>",
        to: email,
        subject: "Your OTP Code",
        html: `<h2>Your OTP is ${otp}</h2><p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>`,
    });

    if (error) {
        console.error("Resend API error:", error);
        throw new Error(error.message || "Failed to send OTP email");
    }

    console.log("Email sent successfully, ID:", data.id);
    return data;
};

export default sendOTP;