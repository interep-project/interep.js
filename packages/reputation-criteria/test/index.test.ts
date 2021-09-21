import { calculateReputation, getWeb2Providers, getReputationLevels, Web2Provider } from "../src"

describe("InterRep reputation criteria", () => {
    describe("Get Web2 providers", () => {
        it("Should return all the existing supported Web2 providers", () => {
            const expectedValue = getWeb2Providers()

            expect(expectedValue).toStrictEqual(["twitter", "github"])
        })
    })

    describe("Get reputation levels", () => {
        it("Should return all the existing reputation levels", () => {
            const expectedvalue = getReputationLevels()

            expect(expectedvalue).toStrictEqual(["GOLD", "SILVER", "BRONZE", "NOT_SUFFICIENT"])
        })

        it("Should throw an error if the Web2 provider is not supported", () => {
            const fun = () => getReputationLevels("facebook" as any)

            expect(fun).toThrow("Web2 provider 'facebook' is not supported")
        })

        it("Should return a list of all available reputation levels for a Web2 provider", () => {
            const expectedValue = getReputationLevels(Web2Provider.TWITTER)

            expect(expectedValue).toStrictEqual(["GOLD", "SILVER", "BRONZE", "NOT_SUFFICIENT"])
        })
    })

    describe("Calculate reputation", () => {
        it("Should throw an error if the Web2 provider is not supported", () => {
            const fun = () => calculateReputation("facebook" as any, { posts: 100 } as any)

            expect(fun).toThrow("Web2 provider 'facebook' is not supported")
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

        it("Should return a 'SILVER' Twitter reputation", () => {
            const expectedValue = calculateReputation(Web2Provider.TWITTER, { botometerOverallScore: 1.5 })

            expect(expectedValue).toBe("SILVER")
        })

        it("Should return a 'SILVER' Github reputation", () => {
            const expectedValue = calculateReputation(Web2Provider.GITHUB, { receivedStars: 80 })

            expect(expectedValue).toBe("SILVER")
        })

        it("Should return a 'BRONZE' Twitter reputation", () => {
            const expectedValue = calculateReputation(Web2Provider.TWITTER, { followers: 500 })

            expect(expectedValue).toBe("BRONZE")
        })

        it("Should return a 'BRONZE' Github reputation", () => {
            const expectedValue = calculateReputation(Web2Provider.GITHUB, { verifiedProfile: true })

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

        it("Should return 'GOLD' if at least one parameter matches the gold reputation rules", () => {
            const expectedValue = calculateReputation(Web2Provider.TWITTER, {
                botometerOverallScore: 2,
                followers: 7000
            })

            expect(expectedValue).toBe("GOLD")
        })
    })
})
