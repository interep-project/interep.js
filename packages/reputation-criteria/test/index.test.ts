import { calculateReputation, getProviders, getReputationLevels, Web2Provider, Web3Provider } from "../src"

describe("InterRep reputation criteria", () => {
    describe("Get all providers", () => {
        it("Should return all the existing supported providers", () => {
            const expectedValue = getProviders()

            expect(expectedValue).toStrictEqual(["twitter", "github", "reddit", "poap"])
        })
    })

    describe("Get reputation levels", () => {
        it("Should return all the existing reputation levels", () => {
            const expectedvalue = getReputationLevels()

            expect(expectedvalue).toStrictEqual(["GOLD", "SILVER", "BRONZE", "NOT_SUFFICIENT"])
        })

        it("Should throw an error if the provider is not supported", () => {
            const fun = () => getReputationLevels("facebook" as any)

            expect(fun).toThrow("Provider 'facebook' is not supported")
        })

        it("Should return a list of all available reputation levels for a Web2 provider", () => {
            const expectedValue = getReputationLevels(Web2Provider.TWITTER)

            expect(expectedValue).toStrictEqual(["GOLD", "SILVER", "BRONZE", "NOT_SUFFICIENT"])
        })

        it("Should return a list of all available reputation levels for a Web3 provider", () => {
            const expectedValue = getReputationLevels(Web3Provider.POAP)

            expect(expectedValue).toStrictEqual(["GOLD", "SILVER", "BRONZE", "NOT_SUFFICIENT"])
        })
    })

    describe("Calculate reputation", () => {
        it("Should throw an error if the provider is not supported", () => {
            const fun = () => calculateReputation("facebook" as any, { posts: 100 } as any)

            expect(fun).toThrow("Provider 'facebook' is not supported")
        })

        it("Should throw an error if a parameter is not supported", () => {
            const fun = () => calculateReputation(Web2Provider.TWITTER, { posts: 100 } as any)

            expect(fun).toThrow("Parameter 'posts' is not supported")
        })

        it("Should throw an error if a parameter type is not correct", () => {
            const fun = () => calculateReputation(Web2Provider.TWITTER, { followers: true } as any)

            expect(fun).toThrow("Parameter 'followers' is not a number")
        })

        it("Should return a 'GOLD' Twitter reputation", () => {
            const expectedValue = calculateReputation(Web2Provider.TWITTER, { verifiedProfile: true })

            expect(expectedValue).toBe("GOLD")
        })

        it("Should return a 'GOLD' Github reputation", () => {
            const expectedValue = calculateReputation(Web2Provider.GITHUB, { followers: 600 })

            expect(expectedValue).toBe("GOLD")
        })

        it("Should return a 'GOLD' Reddit reputation", () => {
            const expectedValue = calculateReputation(Web2Provider.REDDIT, { premiumSubscription: true })

            expect(expectedValue).toBe("GOLD")
        })

        it("Should return a 'GOLD' Poap reputation", () => {
            const expectedValue = calculateReputation(Web3Provider.POAP, { tokens: 6 })

            expect(expectedValue).toBe("GOLD")
        })

        it("Should return a 'SILVER' Twitter reputation", () => {
            const expectedValue = calculateReputation(Web2Provider.TWITTER, { botometerOverallScore: 1.5 })

            expect(expectedValue).toBe("SILVER")
        })

        it("Should return a 'SILVER' Github reputation", () => {
            const expectedValue = calculateReputation(Web2Provider.GITHUB, { receivedStars: 80 })

            expect(expectedValue).toBe("SILVER")
        })

        it("Should return a 'SILVER' Reddit reputation", () => {
            const expectedValue = calculateReputation(Web2Provider.REDDIT, { linkedIdentities: 2 })

            expect(expectedValue).toBe("SILVER")
        })

        it("Should return a 'SILVER' Poap reputation", () => {
            const expectedValue = calculateReputation(Web3Provider.POAP, { tokens: 4 })

            expect(expectedValue).toBe("SILVER")
        })

        it("Should return a 'BRONZE' Twitter reputation", () => {
            const expectedValue = calculateReputation(Web2Provider.TWITTER, { followers: 500 })

            expect(expectedValue).toBe("BRONZE")
        })

        it("Should return a 'BRONZE' Github reputation", () => {
            const expectedValue = calculateReputation(Web2Provider.GITHUB, { proPlan: true })

            expect(expectedValue).toBe("BRONZE")
        })

        it("Should return a 'BRONZE' Reddit reputation", () => {
            const expectedValue = calculateReputation(Web2Provider.REDDIT, { coins: 500 })

            expect(expectedValue).toBe("BRONZE")
        })

        it("Should return a 'BRONZE' Poap reputation", () => {
            const expectedValue = calculateReputation(Web3Provider.POAP, { tokens: 1 })

            expect(expectedValue).toBe("BRONZE")
        })

        it("Should return a 'NOT_SUFFICIENT' Twitter reputation", () => {
            const expectedValue = calculateReputation(Web2Provider.TWITTER, { followers: 1 })

            expect(expectedValue).toBe("NOT_SUFFICIENT")
        })

        it("Should return a 'NOT_SUFFICIENT' Github reputation", () => {
            const expectedValue = calculateReputation(Web2Provider.GITHUB, { followers: 1 })

            expect(expectedValue).toBe("NOT_SUFFICIENT")
        })

        it("Should return a 'NOT_SUFFICIENT' Reddit reputation", () => {
            const expectedValue = calculateReputation(Web2Provider.REDDIT, { karma: 100 })

            expect(expectedValue).toBe("NOT_SUFFICIENT")
        })

        it("Should return a 'NOT_SUFFICIENT' Poap reputation", () => {
            const expectedValue = calculateReputation(Web3Provider.POAP, { tokens: 0 })

            expect(expectedValue).toBe("NOT_SUFFICIENT")
        })

        it("Should return 'GOLD' if at least one parameter matches the gold reputation rules", () => {
            const expectedValue = calculateReputation(Web2Provider.TWITTER, {
                botometerOverallScore: 2,
                followers: 7000
            })

            expect(expectedValue).toBe("GOLD")
        })
    })
})
