import { MongoMemoryServer } from "mongodb-memory-server"
import { connect, disconnect, drop, getState, clear, TelegramUser } from "../src"

describe("InterRep db", () => {
    let mms: MongoMemoryServer

    beforeAll(async () => {
        mms = await MongoMemoryServer.create()
    })

    afterAll(async () => {
        await mms.stop()
    })

    describe("Get state", () => {
        it("Should return a disconnected state", async () => {
            const expectedValue = getState()

            expect(expectedValue).toEqual(0)
        })
    })

    describe("Connect", () => {
        afterEach(async () => {
            await disconnect()
        })

        it("Should not connect a MongoDB instance with a wrong URI", async () => {
            const promise = connect("wrong")

            await expect(promise).rejects.toThrow()
        })

        it("Should connect a MongoDB instance", async () => {
            const expectedValue = await connect(mms.getUri())

            expect(expectedValue).toBeTruthy()
        })

        it("Should connect a MongoDB instance with an error listener", async () => {
            const expectedValue = await connect(mms.getUri(), (error) => {
                console.log(error)
            })

            expect(expectedValue).toBeTruthy()
        })
    })

    describe("Disconnect", () => {
        it("Should disconnect a MongoDB", async () => {
            await connect(mms.getUri())

            const expectedValue = await disconnect()

            expect(expectedValue).toBeTruthy()
        })
    })

    describe("Drop", () => {
        beforeAll(async () => {
            await connect(mms.getUri())
        })

        afterAll(async () => {
            await disconnect()
        })

        it("Should drop a db", async () => {
            await TelegramUser.create({ hashId: "hash", joined: false })
            await drop()

            const expectedValue = await TelegramUser.findOne({ hashId: "hash" })

            expect(expectedValue).toBeNull()
        })
    })

    describe("Clear", () => {
        beforeAll(async () => {
            await connect(mms.getUri())
        })

        afterAll(async () => {
            await disconnect()
        })

        it("Should clear all the db collections", async () => {
            await TelegramUser.create({ hashId: "hash", joined: false })
            await clear()

            const expectedValue = await TelegramUser.findOne({ hashId: "hash" })

            expect(expectedValue).toBeNull()
        })
    })
})
