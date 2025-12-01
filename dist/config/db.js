import mongoose from "mongoose";
export async function connectDB() {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error("FATAL ERROR: MONGO_URI environment variable is not defined.");
        process.exit(1);
    }
    try {
        await mongoose.connect(mongoUri);
        console.log("DB Connected");
    }
    catch (error) {
        console.log("Error While Connecting DB", error);
        process.exit(1);
    }
}
;
//# sourceMappingURL=db.js.map