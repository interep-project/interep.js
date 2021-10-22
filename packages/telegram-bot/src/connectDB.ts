import mongoose from "mongoose"

export default async function connectDB(mongodbUrl: string): Promise<void> {
    if (mongoose.connection.readyState >= 1) {
        return
    }

    await mongoose.connect(mongodbUrl)
}
