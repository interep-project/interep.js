import { OAuthProvider } from "@interrep/reputation"
import { MongoMemoryServer } from "mongodb-memory-server"
import {
    clear,
    connect,
    disconnect,
    drop,
    EmailUser,
    getState,
    MerkleTreeNode,
    MerkleTreeZero,
    OAuthAccount,
    TelegramUser,
    Token
} from "../src"

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

        it("Should not connect a MongoDB instance if it has already been connected", async () => {
            await connect(mms.getUri())
            const expectedValue = await connect(mms.getUri())

            expect(expectedValue).toBeFalsy()
        })

        it("Should connect a MongoDB instance", async () => {
            const expectedValue = await connect(mms.getUri())

            expect(expectedValue).toBeTruthy()
        })

        it("Should connect a MongoDB instance with an error listener", async () => {
            const expectedValue = await connect(mms.getUri(), (error) => error)

            expect(expectedValue).toBeTruthy()
        })
    })

    describe("Disconnect", () => {
        it("Should not disconnect a MongoDB instance if it has not yet been connected", async () => {
            const expectedValue = await disconnect()

            expect(expectedValue).toBeFalsy()
        })

        it("Should disconnect a MongoDB instance", async () => {
            await connect(mms.getUri())

            const expectedValue = await disconnect()

            expect(expectedValue).toBeTruthy()
        })
    })

    describe("Drop", () => {
        afterAll(async () => {
            await disconnect()
        })

        it("Should not drop any db if there is no connected db", async () => {
            const expectedValue = await drop()

            expect(expectedValue).toBeFalsy()
        })

        it("Should drop a db", async () => {
            await connect(mms.getUri())
            await TelegramUser.create({ hashId: "hash", hasJoined: false })
            await drop()

            const expectedValue = await TelegramUser.findOne({ hashId: "hash" })

            expect(expectedValue).toBeNull()
        })
    })

    describe("Clear", () => {
        afterAll(async () => {
            await disconnect()
        })

        it("Should not clear any db collection if there is no connected db", async () => {
            const expectedValue = await clear()

            expect(expectedValue).toBeFalsy()
        })

        it("Should clear all the db collections", async () => {
            await connect(mms.getUri())
            await TelegramUser.create({ hashId: "hash", hasJoined: false })
            await clear()

            const expectedValue = await TelegramUser.findOne({ hashId: "hash" })

            expect(expectedValue).toBeNull()
        })
    })

    describe("OAuthAccount", () => {
        beforeAll(async () => {
            await connect(mms.getUri())
        })

        afterAll(async () => {
            await clear()
            await disconnect()
        })

        it("Should create an OAuthAccount entity", async () => {
            await OAuthAccount.create({
                provider: OAuthProvider.TWITTER,
                providerAccountId: "12321",
                uniqueKey: `${OAuthProvider.TWITTER}:12321`,
                isLinkedToAddress: false,
                createdAt: Date.now()
            })

            const expectedValue = await OAuthAccount.countDocuments()

            expect(expectedValue).toBe(1)
        })

        it("Should find an OAuth account by provider and provider account id", async () => {
            const expectedValue = await OAuthAccount.findByProviderAccountId(OAuthProvider.TWITTER, "12321")

            expect(expectedValue).not.toBeNull()
        })
    })

    describe("MerkleTree", () => {
        beforeAll(async () => {
            await connect(mms.getUri())
        })

        afterAll(async () => {
            await clear()
            await disconnect()
        })

        it("Should create a MerkleTreeNode entity", async () => {
            await MerkleTreeNode.create({
                group: {
                    provider: OAuthProvider.TWITTER,
                    name: "GOLD"
                },
                level: 1,
                index: 1,
                hash: "hash"
            })

            const expectedValue = await MerkleTreeNode.countDocuments()

            expect(expectedValue).toBe(1)
        })

        it("Should create a MerkleTreeZero entity", async () => {
            await MerkleTreeZero.create({
                level: 1,
                hash: "hash"
            })

            const expectedValue = await MerkleTreeZero.countDocuments()

            expect(expectedValue).toBe(1)
        })

        it("Should get the number of nodes", async () => {
            const expectedValue = await MerkleTreeNode.getNumberOfNodes(
                { provider: OAuthProvider.TWITTER, name: "GOLD" },
                1
            )

            expect(expectedValue).toBe(1)
        })

        it("Should get the number of active leaves", async () => {
            await MerkleTreeNode.create({
                group: {
                    provider: OAuthProvider.TWITTER,
                    name: "GOLD"
                },
                level: 0,
                index: 0,
                hash: "1"
            })
            await MerkleTreeNode.create({
                group: {
                    provider: OAuthProvider.TWITTER,
                    name: "GOLD"
                },
                level: 0,
                index: 1,
                hash: "0"
            })

            const expectedValue = await MerkleTreeNode.getNumberOfActiveLeaves({
                provider: OAuthProvider.TWITTER,
                name: "GOLD"
            })

            expect(expectedValue).toBe(1)
        })

        it("Should get group names by provider", async () => {
            const expectedValue = await MerkleTreeNode.getGroupNamesByProvider(OAuthProvider.TWITTER)

            expect(expectedValue).toEqual(["GOLD"])
        })

        it("Should find a node by group provider and hash", async () => {
            const expectedValue = await MerkleTreeNode.findByGroupProviderAndHash(OAuthProvider.TWITTER, "hash")

            expect(expectedValue).not.toBeNull()
        })

        it("Should find a node by group and hash", async () => {
            const expectedValue = await MerkleTreeNode.findByGroupAndHash(
                { provider: OAuthProvider.TWITTER, name: "GOLD" },
                "hash"
            )

            expect(expectedValue).not.toBeNull()
        })

        it("Should find a node by group, level and index", async () => {
            const expectedValue = await MerkleTreeNode.findByGroupAndLevelAndIndex(
                {
                    provider: OAuthProvider.TWITTER,
                    name: "GOLD"
                },
                1,
                1
            )

            expect(expectedValue).not.toBeNull()
        })
    })

    describe("TelegramUser", () => {
        beforeAll(async () => {
            await connect(mms.getUri())
        })

        afterAll(async () => {
            await clear()
            await disconnect()
        })

        it("Should create a TelegramUser entity", async () => {
            await TelegramUser.create({
                hashId: "hashId",
                hasJoined: true
            })

            const expectedValue = await TelegramUser.countDocuments()

            expect(expectedValue).toBe(1)
        })

        it("Should find a Telegram user by hash id", async () => {
            const expectedValue = await TelegramUser.findByHashId("hashId")

            expect(expectedValue).not.toBeNull()
        })
    })

    describe("EmailUser", () => {
        beforeAll(async () => {
            await connect(mms.getUri())
        })

        afterAll(async () => {
            await clear()
            await disconnect()
        })

        it("Should create a EmailUser entity", async () => {
            await EmailUser.create({
                hashId: "hashId",
                hasJoined: true,
                verificationToken: "token"
            })

            const expectedValue = await EmailUser.countDocuments()

            expect(expectedValue).toBe(1)
        })

        it("Should find a Email user by hash id", async () => {
            const expectedValue = await EmailUser.findByHashId("hashId")

            expect(expectedValue).not.toBeNull()
        })
    })

    describe("Token", () => {
        beforeAll(async () => {
            await connect(mms.getUri())
        })

        afterAll(async () => {
            await clear()
            await disconnect()
        })

        it("Should create a Token entity", async () => {
            await Token.create({
                tokenId: "tokenId",
                provider: OAuthProvider.TWITTER,
                userAddress: "userAddress",
                encryptedAttestation: "encryptedAttestation"
            })

            const expectedValue = await Token.countDocuments()

            expect(expectedValue).toBe(1)
        })

        it("Should find a Token by user address", async () => {
            const expectedValue = await Token.findByUserAddress("userAddress")

            expect(expectedValue).not.toBeNull()
        })
    })
})
