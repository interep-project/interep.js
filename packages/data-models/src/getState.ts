import mongoose from "mongoose"

export default function getState() {
    return mongoose.connection.readyState
}
