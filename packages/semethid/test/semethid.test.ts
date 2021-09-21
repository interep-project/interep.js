import semithid from "../src"

describe("Semaphore Ethereum identity", () => {
    describe("Create identity", () => {
        it("Should create a Semaphore identity", async () => {
            const web2Provider = "twitter"
            function sign(message: string) {
                return Promise.resolve(message)
            }

            const identity = await semithid(sign, web2Provider)

            expect(typeof identity).toEqual("object")
        })

        it("Should create a Semaphore identity with a nonce", async () => {
            const web2Provider = "twitter"
            function sign(message: string) {
                return Promise.resolve(message)
            }

            const identity = await semithid(sign, web2Provider, 1)

            expect(typeof identity).toEqual("object")
        })
    })
})
