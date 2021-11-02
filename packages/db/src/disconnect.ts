import mongoose from "mongoose"
import getState from "./getState"

export default async function disconnect(): Promise<boolean> {
    if (getState() !== 1) {
        return false
    }

    await mongoose.disconnect()

    return true
}
