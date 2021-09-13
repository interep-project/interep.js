import getReputation from "../src"

describe("InterRep reputation criteria", () => {
    describe("Get reputation", () => {
        it("Should throw an error if the provider is not supported", () => {
            const fun = () => getReputation("facebook" as any, { posts: 100 } as any)

            expect(fun).toThrow("Provider 'facebook' is not supported")
        })

        it("Should throw an error if a parameter is not supported", () => {
            const fun = () => getReputation("twitter", { posts: 100 } as any)

            expect(fun).toThrow("Parameter 'posts' is not supported")
        })

        it("Should throw an error if a parameter type is not correct", () => {
            const fun = () => getReputation("twitter", { followers: true } as any)

            expect(fun).toThrow("Parameter 'followers' is not a number")
        })

        it("Should return a 'gold' reputation", () => {
            const expectedReputation = getReputation("twitter", { verifiedProfile: true })

            expect(expectedReputation).toBe("gold")
        })

        it("Should return a 'silver' reputation", () => {
            const expectedReputation = getReputation("twitter", { botometerOverallScore: 1.5 })

            expect(expectedReputation).toBe("silver")
        })

        it("Should return a 'bronze' reputation", () => {
            const expectedReputation = getReputation("twitter", { followers: 500 })

            expect(expectedReputation).toBe("bronze")
        })

        it("Should return 'not-sufficient' if it doesn't match any reputation", () => {
            const expectedReputation = getReputation("twitter", { followers: 1 })

            expect(expectedReputation).toBe("not-sufficient")
        })

        it("Should return 'gold' if at least one parameter match the gold reputation rules", () => {
            const expectedReputation = getReputation("twitter", { botometerOverallScore: 2, followers: 7000 })

            expect(expectedReputation).toBe("gold")
        })
    })
})
