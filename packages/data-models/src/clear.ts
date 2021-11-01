import mongoose from "mongoose"
import getState from "./getState"

export default async function clear(): Promise<boolean> {
    if (getState() !== 1) {
        return false
    }

    const { collections } = mongoose.connection
    const promises: Promise<any>[] = []

    for (const key in collections) {
        if (Object.prototype.hasOwnProperty.call(collections, key)) {
            const collection = collections[key]

            promises.push(collection.deleteMany({}))
        }
    }

    await Promise.all(promises)

    return true
}
