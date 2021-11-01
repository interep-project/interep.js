import mongoose from "mongoose"
import getState from "./getState"

export default async function drop(): Promise<boolean> {
    if (getState() !== 1) {
        return false
    }

    await mongoose.connection.dropDatabase()

    return true
}
