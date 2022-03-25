import { calculateReputation, getOAuthProviders, getReputationLevels, OAuthProvider } from "../src"

describe("Interep reputation criteria", () => {
    describe("Get all providers", () => {
        it("Should return all the existing supported providers", () => {
            const expectedValue = getOAuthProviders()

            expect(expectedValue).toStrictEqual(["twitter", "github", "reddit"])
        })
    })

    describe("Get reputation levels", () => {
        it("Should return all the existing reputation levels", () => {
            const expectedvalue = getReputationLevels()

            expect(expectedvalue).toStrictEqual(["gold", "silver", "bronze"])
        })
    })

    describe("Calculate reputation", () => {
        it("Should throw an error if the provider is not supported", () => {
            const fun = () => calculateReputation("facebook" as any, { posts: 100 } as any)

            expect(fun).toThrow("Provider 'facebook' is not supported")
        })

        it("Should throw an error if a parameter is not supported", () => {
            const fun = () => calculateReputation(OAuthProvider.TWITTER, { posts: 100 } as any)

            expect(fun).toThrow("Parameter 'posts' is not supported")
        })

        it("Should throw an error if a parameter type is not correct", () => {
            const fun = () => calculateReputation(OAuthProvider.TWITTER, { followers: true } as any)

            expect(fun).toThrow("Parameter 'followers' is not a number")
        })

        it("Should return a 'gold' Twitter reputation", () => {
            const expectedValue = calculateReputation(OAuthProvider.TWITTER, { verifiedProfile: true })

            expect(expectedValue).toBe("gold")
        })

        it("Should return a 'gold' Github reputation", () => {
            const expectedValue = calculateReputation(OAuthProvider.GITHUB, { followers: 600 })

            expect(expectedValue).toBe("gold")
        })

        it("Should return a 'gold' Reddit reputation", () => {
            const expectedValue = calculateReputation(OAuthProvider.REDDIT, { karma: 10000 })

            expect(expectedValue).toBe("gold")
        })

        it("Should return a 'silver' Twitter reputation", () => {
            const expectedValue = calculateReputation(OAuthProvider.TWITTER, { botometerOverallScore: 1.5 })

            expect(expectedValue).toBe("silver")
        })

        it("Should return a 'silver' Github reputation", () => {
            const expectedValue = calculateReputation(OAuthProvider.GITHUB, { receivedStars: 80 })

            expect(expectedValue).toBe("silver")
        })

        it("Should return a 'silver' Reddit reputation", () => {
            const expectedValue = calculateReputation(OAuthProvider.REDDIT, { linkedIdentities: 2 })

            expect(expectedValue).toBe("silver")
        })

        it("Should return a 'bronze' Twitter reputation", () => {
            const expectedValue = calculateReputation(OAuthProvider.TWITTER, { followers: 500 })

            expect(expectedValue).toBe("bronze")
        })

        it("Should return a 'bronze' Github reputation", () => {
            const expectedValue = calculateReputation(OAuthProvider.GITHUB, { proPlan: true })

            expect(expectedValue).toBe("bronze")
        })

        it("Should return a 'bronze' Reddit reputation", () => {
            const expectedValue = calculateReputation(OAuthProvider.REDDIT, { coins: 500 })

            expect(expectedValue).toBe("bronze")
        })

        it("Should fail if no parameter meet any reputation criteria", () => {
            const fun = () => calculateReputation(OAuthProvider.REDDIT, { coins: 0 })

            expect(fun).toThrow("Parameters do not meet any reputation criteria")
        })

        it("Should return 'gold' if at least one parameter matches the gold reputation rules", () => {
            const expectedValue = calculateReputation(OAuthProvider.TWITTER, {
                botometerOverallScore: 2,
                followers: 7000
            })

            expect(expectedValue).toBe("gold")
        })
    })
})
