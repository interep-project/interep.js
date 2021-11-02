import mongoose from "mongoose"

export default function getState(): number {
    return mongoose.connection.readyState
}
