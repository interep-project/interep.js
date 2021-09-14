import { calculateReputation, getPlatforms, getReputationLevels, Platform } from "../src"

describe("InterRep reputation criteria", () => {
    describe("Get platforms", () => {
        it("Should return all the existing supported platforms", () => {
            const expectedPlatforms = getPlatforms()

            expect(expectedPlatforms).toStrictEqual(["twitter", "github"])
        })
    })

    describe("Get reputation levels", () => {
        it("Should return all the existing reputation levels", () => {
            const expectedReputationLevels = getReputationLevels()

            expect(expectedReputationLevels).toStrictEqual(["GOLD", "SILVER", "BRONZE", "NOT_SUFFICIENT"])
        })

        it("Should throw an error if the platform is not supported", () => {
            const fun = () => getReputationLevels("facebook" as any)

            expect(fun).toThrow("Platform 'facebook' is not supported")
        })

        it("Should return a list of all available reputation levels for a platform", () => {
            const expectedReputationLevels = getReputationLevels(Platform.TWITTER)

            expect(expectedReputationLevels).toStrictEqual(["GOLD", "SILVER", "BRONZE", "NOT_SUFFICIENT"])
        })
    })

    describe("Calculate reputation", () => {
        it("Should throw an error if the platform is not supported", () => {
            const fun = () => calculateReputation("facebook" as any, { posts: 100 } as any)

            expect(fun).toThrow("Platform 'facebook' is not supported")
        })

        it("Should throw an error if a parameter is not supported", () => {
            const fun = () => calculateReputation(Platform.TWITTER, { posts: 100 } as any)

            expect(fun).toThrow("Parameter 'posts' is not supported")
        })

        it("Should throw an error if a parameter type is not correct", () => {
            const fun = () => calculateReputation(Platform.TWITTER, { followers: true } as any)

            expect(fun).toThrow("Parameter 'followers' is not a number")
        })

        it("Should return a 'GOLD' Twitter reputation", () => {
            const expectedReputation = calculateReputation(Platform.TWITTER, { verifiedProfile: true })

            expect(expectedReputation).toBe("GOLD")
        })

        it("Should return a 'GOLD' Github reputation", () => {
            const expectedReputation = calculateReputation(Platform.GITHUB, { followers: 600 })

            expect(expectedReputation).toBe("GOLD")
        })

        it("Should return a 'SILVER' Twitter reputation", () => {
            const expectedReputation = calculateReputation(Platform.TWITTER, { botometerOverallScore: 1.5 })

            expect(expectedReputation).toBe("SILVER")
        })

        it("Should return a 'SILVER' Github reputation", () => {
            const expectedReputation = calculateReputation(Platform.GITHUB, { receivedStars: 80 })

            expect(expectedReputation).toBe("SILVER")
        })

        it("Should return a 'BRONZE' Twitter reputation", () => {
            const expectedReputation = calculateReputation(Platform.TWITTER, { followers: 500 })

            expect(expectedReputation).toBe("BRONZE")
        })

        it("Should return a 'BRONZE' Github reputation", () => {
            const expectedReputation = calculateReputation(Platform.GITHUB, { verifiedProfile: true })

            expect(expectedReputation).toBe("BRONZE")
        })

        it("Should return a 'NOT_SUFFICIENT' Twitter reputation", () => {
            const expectedReputation = calculateReputation(Platform.TWITTER, { followers: 1 })

            expect(expectedReputation).toBe("NOT_SUFFICIENT")
        })

        it("Should return a 'NOT_SUFFICIENT' Github reputation", () => {
            const expectedReputation = calculateReputation(Platform.GITHUB, { followers: 1 })

            expect(expectedReputation).toBe("NOT_SUFFICIENT")
        })

        it("Should return 'GOLD' if at least one parameter matches the gold reputation rules", () => {
            const expectedReputation = calculateReputation(Platform.TWITTER, {
                botometerOverallScore: 2,
                followers: 7000
            })

            expect(expectedReputation).toBe("GOLD")
        })
    })
})
