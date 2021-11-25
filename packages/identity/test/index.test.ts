import { ZkIdentity } from "@libsem/identity"
import createIdentity from "../src"

describe("InterRep identity", () => {
    function sign(message: string) {
        return Promise.resolve(message)
    }

    describe("Create identity", () => {
        it("Should not create an InterRep identity if the parameters do not have the right types", async () => {
            const web2Provider = "twitter"

            const fun1 = () => createIdentity(1 as any, web2Provider)
            const fun2 = () => createIdentity(sign, 1 as any)
            const fun3 = () => createIdentity(sign, web2Provider, "x" as any)
            const fun4 = () => createIdentity(sign, undefined as any)

            await expect(fun1).rejects.toThrow("Parameter 'sign' is not a function")
            await expect(fun2).rejects.toThrow("Parameter 'provider' is not a string")
            await expect(fun3).rejects.toThrow("Parameter 'nonce' is not a number")
            await expect(fun4).rejects.toThrow("Parameter 'provider' is not defined")
        })

        it("Should create an InterRep identity", async () => {
            const web2Provider = "twitter"

            const expectedValue = await createIdentity(sign, web2Provider)

            expect(expectedValue).toBeInstanceOf(ZkIdentity)
        })

        it("Should create an InterRep identity with a nonce", async () => {
            const web2Provider = "twitter"

            const expectedValue = await createIdentity(sign, web2Provider, 1)

            expect(expectedValue).toBeInstanceOf(ZkIdentity)
        })
    })
})
