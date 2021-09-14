import { calculateReputation, getProviders, getReputationLevels, Provider } from "../src"

describe("InterRep reputation criteria", () => {
    describe("Calculate reputation", () => {
        it("Should throw an error if the provider is not supported", () => {
            const fun = () => calculateReputation("facebook" as any, { posts: 100 } as any)

            expect(fun).toThrow("Provider 'facebook' is not supported")
        })

        it("Should throw an error if a parameter is not supported", () => {
            const fun = () => calculateReputation(Provider.TWITTER, { posts: 100 } as any)

            expect(fun).toThrow("Parameter 'posts' is not supported")
        })

        it("Should throw an error if a parameter type is not correct", () => {
            const fun = () => calculateReputation(Provider.TWITTER, { followers: true } as any)

            expect(fun).toThrow("Parameter 'followers' is not a number")
        })

        it("Should return a 'GOLD' reputation", () => {
            const expectedReputation = calculateReputation(Provider.TWITTER, { verifiedProfile: true })

            expect(expectedReputation).toBe("GOLD")
        })

        it("Should return a 'SILVER' reputation", () => {
            const expectedReputation = calculateReputation(Provider.TWITTER, { botometerOverallScore: 1.5 })

            expect(expectedReputation).toBe("SILVER")
        })

        it("Should return a 'BRONZE' reputation", () => {
            const expectedReputation = calculateReputation(Provider.TWITTER, { followers: 500 })

            expect(expectedReputation).toBe("BRONZE")
        })

        it("Should return 'NOT_SUFFICIENT' if it doesn't match any reputation", () => {
            const expectedReputation = calculateReputation(Provider.TWITTER, { followers: 1 })

            expect(expectedReputation).toBe("NOT_SUFFICIENT")
        })

        it("Should return 'GOLD' if at least one parameter matches the gold reputation rules", () => {
            const expectedReputation = calculateReputation(Provider.TWITTER, {
                botometerOverallScore: 2,
                followers: 7000
            })

            expect(expectedReputation).toBe("GOLD")
        })
    })

    describe("Get reputation levels", () => {
        it("Should return all the existing reputation levels", () => {
            const expectedReputationLevels = getReputationLevels()

            expect(expectedReputationLevels).toStrictEqual(["GOLD", "SILVER", "BRONZE", "NOT_SUFFICIENT"])
        })

        it("Should throw an error if the provider is not supported", () => {
            const fun = () => getReputationLevels("facebook" as any)

            expect(fun).toThrow("Provider 'facebook' is not supported")
        })

        it("Should return a list of all the available reputation levels for a provider", () => {
            const expectedReputationLevels = getReputationLevels(Provider.TWITTER)

            expect(expectedReputationLevels).toStrictEqual(["GOLD", "SILVER", "BRONZE", "NOT_SUFFICIENT"])
        })
    })

    describe("Get providers", () => {
        it("Should return all the existing providers", () => {
            const expectedProviders = getProviders()

            expect(expectedProviders).toStrictEqual(["twitter"])
        })
    })
})
