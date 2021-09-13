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

        it("Should return a 'TWITTER_GOLD' reputation", () => {
            const expectedReputation = getReputation("twitter", { verifiedProfile: true })

            expect(expectedReputation).toBe("TWITTER_GOLD")
        })

        it("Should return a 'TWITTER_SILVER' reputation", () => {
            const expectedReputation = getReputation("twitter", { botometerOverallScore: 1.5 })

            expect(expectedReputation).toBe("TWITTER_SILVER")
        })

        it("Should return a 'TWITTER_BRONZE' reputation", () => {
            const expectedReputation = getReputation("twitter", { followers: 500 })

            expect(expectedReputation).toBe("TWITTER_BRONZE")
        })

        it("Should return 'TWITTER_NOT_SUFFICIENT' if it doesn't match any reputation", () => {
            const expectedReputation = getReputation("twitter", { followers: 1 })

            expect(expectedReputation).toBe("TWITTER_NOT_SUFFICIENT")
        })

        it("Should return 'TWITTER_GOLD' if at least one parameter match the gold reputation rules", () => {
            const expectedReputation = getReputation("twitter", { botometerOverallScore: 2, followers: 7000 })

            expect(expectedReputation).toBe("TWITTER_GOLD")
        })
    })

    describe("Get all reputations", () => {
        it("Should throw an error if the provider is not supported", () => {
            const fun = () => getAllReputations("facebook" as any)

            expect(fun).toThrow("Provider 'facebook' is not supported")
        })

        it("Should return a list of all the available reputations for a provider", () => {
            const expectedReputations = getAllReputations("twitter")

            expect(expectedReputations).toStrictEqual([
                "TWITTER_GOLD",
                "TWITTER_SILVER",
                "TWITTER_BRONZE",
                "TWITTER_NOT_SUFFICIENT"
            ])
        })
    })
})
