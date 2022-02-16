import { Chat, User } from "grammy/out/platform.node"
import showHelpMessage from "../src/commands/showHelpMessage"
import showStartMessage from "../src/commands/showStartMessage"
import sha256 from "../src/sha256"

describe("Interep Telegram bot", () => {
    describe("Show help message", () => {
        const bot = { api: { sendMessage: jest.fn() } }
        const user: User = { id: 1, is_bot: false, first_name: "User" }

        it("Should call the function to send a private message", async () => {
            const chat: Chat = { id: 1, type: "private", first_name: "Chat" }

            await showHelpMessage(bot as any, chat, user)

            expect(bot.api.sendMessage).toHaveBeenCalledTimes(1)
        })

        it("Should call the function to send a public message", async () => {
            const chat: Chat = { id: 1, type: "group", title: "Chat" }

            await showHelpMessage(bot as any, chat, user)

            expect(bot.api.sendMessage).toHaveBeenCalledTimes(2)
        })
    })

    describe("Show start message", () => {
        const bot = { api: { sendMessage: jest.fn() } }
        const user: User = { id: 1, is_bot: false, first_name: "User" }

        it("Should not call any function", async () => {
            const chat: Chat = { id: 1, type: "group", title: "Chat" }

            await showStartMessage(bot as any, chat, "connect", user)

            expect(bot.api.sendMessage).toHaveBeenCalledTimes(0)
        })

        it("Should call the function to send a confirm message", async () => {
            const chat: Chat = { id: 1, type: "private", first_name: "Chat" }

            await showStartMessage(bot as any, chat, "connect", user)

            expect(bot.api.sendMessage).toHaveBeenCalledTimes(1)
        })

        it("Should call the function to send a public message", async () => {
            const chat: Chat = { id: 1, type: "private", first_name: "Chat" }

            await showStartMessage(bot as any, chat, "", user)

            expect(bot.api.sendMessage).toHaveBeenCalledTimes(2)
        })
    })

    describe("SHA256", () => {
        it("Should return a hexadecimal hash", async () => {
            const expectedValue = sha256("hello world")

            expect(expectedValue).toBe("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9")
        })
    })
})
