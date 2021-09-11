import semithid from "../src"

describe("Semaphore Ethereum identity", () => {
    describe("Create identity", () => {
        it("Should create a Semaphore identity", async () => {
            const groupId = "groupId"
            function sign(message: string) {
                return Promise.resolve(message)
            }

            const identity = await semithid(sign, groupId)

            expect(typeof identity).toEqual("object")
        })

        it("Should create a Semaphore identity with a nonce", async () => {
            const groupId = "groupId"
            function sign(message: string) {
                return Promise.resolve(message)
            }

            const identity = await semithid(sign, groupId, 1)

            expect(typeof identity).toEqual("object")
        })
    })
})
