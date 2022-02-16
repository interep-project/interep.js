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

            expect(expectedvalue).toStrictEqual(["gold", "silver", "bronze", "not_sufficient"])
        })

        it("Should throw an error if the provider is not supported", () => {
            const fun = () => getReputationLevels("facebook" as any)

            expect(fun).toThrow("Provider 'facebook' is not supported")
        })

        it("Should return a list of all available Twitter reputation levels", () => {
            const expectedValue = getReputationLevels(OAuthProvider.TWITTER)

            expect(expectedValue).toStrictEqual(["gold", "silver", "bronze", "not_sufficient"])
        })

        it("Should return a list of all available Github reputation levels", () => {
            const expectedValue = getReputationLevels(OAuthProvider.GITHUB)

            expect(expectedValue).toStrictEqual(["gold", "silver", "bronze", "not_sufficient"])
        })

        it("Should return a list of all available Reddit reputation levels", () => {
            const expectedValue = getReputationLevels(OAuthProvider.REDDIT)

            expect(expectedValue).toStrictEqual(["gold", "silver", "bronze", "not_sufficient"])
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
            const expectedValue = calculateReputation(OAuthProvider.REDDIT, { premiumSubscription: true })

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

        it("Should return a 'not_sufficient' Twitter reputation", () => {
            const expectedValue = calculateReputation(OAuthProvider.TWITTER, { followers: 1 })

            expect(expectedValue).toBe("not_sufficient")
        })

        it("Should return a 'not_sufficient' Github reputation", () => {
            const expectedValue = calculateReputation(OAuthProvider.GITHUB, { followers: 1 })

            expect(expectedValue).toBe("not_sufficient")
        })

        it("Should return a 'not_sufficient' Reddit reputation", () => {
            const expectedValue = calculateReputation(OAuthProvider.REDDIT, { karma: 100 })

            expect(expectedValue).toBe("not_sufficient")
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
