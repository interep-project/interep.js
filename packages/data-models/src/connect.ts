import mongoose from "mongoose"
import getState from "./getState"

export default async function connect(mongoUrl: string, errorListener?: (...args: any[]) => void): Promise<boolean> {
    if (getState() !== 0) {
        return false
    }

    return new Promise((resolve, rejects) => {
        mongoose
            .connect(mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
                autoIndex: true
            })
            .catch(rejects)

        mongoose.connection.once("open", () => resolve(true))

        if (errorListener) {
            mongoose.connection.on("error", errorListener)
        }
    })
}
