import mongoose from "mongoose";

const fineSettingSchema = new mongoose.Schema({
    account: {
        type: Number,
        default: 10
    },
    interval: {
        type: String,
        default: "day"
    },

}, {
    timestamps: true
});

export default mongoose.model("fineSetting", fineSettingSchema);
