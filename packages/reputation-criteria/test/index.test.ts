import { getReputation, getAllReputations } from "../src"

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

        it("Should return a 'GOLD' reputation", () => {
            const expectedReputation = getReputation("twitter", { verifiedProfile: true })

            expect(expectedReputation).toBe("GOLD")
        })

        it("Should return a 'SILVER' reputation", () => {
            const expectedReputation = getReputation("twitter", { botometerOverallScore: 1.5 })

            expect(expectedReputation).toBe("SILVER")
        })

        it("Should return a 'BRONZE' reputation", () => {
            const expectedReputation = getReputation("twitter", { followers: 500 })

            expect(expectedReputation).toBe("BRONZE")
        })

        it("Should return 'NOT_SUFFICIENT' if it doesn't match any reputation", () => {
            const expectedReputation = getReputation("twitter", { followers: 1 })

            expect(expectedReputation).toBe("NOT_SUFFICIENT")
        })

        it("Should return 'GOLD' if at least one parameter match the gold reputation rules", () => {
            const expectedReputation = getReputation("twitter", { botometerOverallScore: 2, followers: 7000 })

            expect(expectedReputation).toBe("GOLD")
        })
    })

    describe("Get all reputations", () => {
        it("Should throw an error if the provider is not supported", () => {
            const fun = () => getAllReputations("facebook" as any)

            expect(fun).toThrow("Provider 'facebook' is not supported")
        })

        it("Should return a list of all the available reputations for a provider", () => {
            const expectedReputations = getAllReputations("twitter")

            expect(expectedReputations).toStrictEqual(["GOLD", "SILVER", "BRONZE", "NOT_SUFFICIENT"])
        })
    })
})
