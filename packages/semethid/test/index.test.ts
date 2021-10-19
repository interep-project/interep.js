import semethid from "../src"

describe("Semaphore Ethereum identity", () => {
    function sign(message: string) {
        return Promise.resolve(message)
    }

    describe("Create identity", () => {
        it("Should create a Semaphore identity commitment", async () => {
            const web2Provider = "twitter"

            const expectedValue = await semethid(sign, web2Provider)

            expect(typeof expectedValue).toEqual("string")
        })

        it("Should create a Semaphore identity commitment with a nonce", async () => {
            const web2Provider = "twitter"

            const expectedValue = await semethid(sign, web2Provider, 1)

            expect(typeof expectedValue).toEqual("string")
        })
    })
})
