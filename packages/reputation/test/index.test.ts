import { calculateReputation, getOAuthProviders, getReputationLevels, OAuthProvider, ReputationLevel } from "../src"

describe("Interep reputation criteria", () => {
    describe("Get all providers", () => {
        it("Should return all the existing supported providers", () => {
            const expectedValue = getOAuthProviders()

            expect(expectedValue).toStrictEqual(["twitter", "github", "reddit"])
        })
    })

    describe("Get reputation levels", () => {
        it("Should return all the existing reputation levels", () => {
            const expectedValue = getReputationLevels()

            expect(expectedValue).toStrictEqual(["commoner", "up-and-coming", "established", "star", "icon"])
        })
    })

    describe("Calculate reputation", () => {
        it("Should throw an error if the provider is not supported", () => {
            const fun = () => calculateReputation("facebook" as any, { posts: 100 } as any)

            expect(fun).toThrowErrorMatchingInlineSnapshot(`"Provider 'facebook' is not supported"`)
        })

        describe("Twitter", () => {
            it("Should throw an error if a parameter is not supported", () => {
                const fun = () => calculateReputation(OAuthProvider.TWITTER, { posts: 100 } as any)

                expect(fun).toThrowErrorMatchingInlineSnapshot(
                    `"At path: followers -- Expected a number, but received: undefined"`
                )
            })

            it("Should throw an error if a parameter type is not correct", () => {
                const fun = () => calculateReputation(OAuthProvider.TWITTER, { followers: true } as any)

                expect(fun).toThrowErrorMatchingInlineSnapshot(
                    `"At path: followers -- Expected a number, but received: true"`
                )
            })

            it.each([
                { followers: 1, verifiedProfile: false, botometerOverallScore: 0.7, level: ReputationLevel.Commoner },
                {
                    followers: 200,
                    verifiedProfile: false,
                    botometerOverallScore: 0.7,
                    level: ReputationLevel.UpAndComing
                },
                {
                    followers: 2_000,
                    verifiedProfile: false,
                    botometerOverallScore: 0.7,
                    level: ReputationLevel.Established
                },
                { followers: 20_000, verifiedProfile: false, botometerOverallScore: 0.7, level: ReputationLevel.Star },
                { followers: 200_000, verifiedProfile: false, botometerOverallScore: 0.7, level: ReputationLevel.Icon }
            ])(
                "should return a(n) $level Twitter reputation",
                ({ followers, verifiedProfile, botometerOverallScore, level }) => {
                    expect(
                        calculateReputation(OAuthProvider.TWITTER, {
                            followers,
                            verifiedProfile,
                            botometerOverallScore
                        })
                    ).toBe(level)
                }
            )

            it("verified accounts have at least established reputation", () => {
                expect(
                    calculateReputation(OAuthProvider.TWITTER, {
                        followers: 1,
                        verifiedProfile: true,
                        botometerOverallScore: 0.7
                    })
                ).toBe(ReputationLevel.Established)
            })

            it("throws if botometerOverallScore (cap universal) is higher than 0.95", () => {
                const fun = () =>
                    calculateReputation(OAuthProvider.TWITTER, {
                        followers: 1,
                        verifiedProfile: false,
                        botometerOverallScore: 0.96
                    })

                expect(fun).toThrowErrorMatchingInlineSnapshot(`"You are a bot!"`)
            })
        })

        describe("Github", () => {
            it("Should throw an error if a parameter is not supported", () => {
                const fun = () => calculateReputation(OAuthProvider.GITHUB, { posts: 100 } as any)

                expect(fun).toThrowErrorMatchingInlineSnapshot(
                    `"At path: receivedStars -- Expected a number, but received: undefined"`
                )
            })

            it("Should throw an error if a parameter type is not correct", () => {
                const fun = () => calculateReputation(OAuthProvider.GITHUB, { receivedStars: true } as any)

                expect(fun).toThrowErrorMatchingInlineSnapshot(
                    `"At path: receivedStars -- Expected a number, but received: true"`
                )
            })

            it.each([
                { receivedStars: 0, sponsorsCount: 0, sponsoringCount: 0, level: ReputationLevel.Commoner },
                { receivedStars: 2, sponsorsCount: 0, sponsoringCount: 0, level: ReputationLevel.UpAndComing },
                { receivedStars: 20, sponsorsCount: 0, sponsoringCount: 0, level: ReputationLevel.Established },
                { receivedStars: 200, sponsorsCount: 0, sponsoringCount: 0, level: ReputationLevel.Star },
                { receivedStars: 2_000, sponsorsCount: 0, sponsoringCount: 0, level: ReputationLevel.Icon }
            ])(
                "should return a(n) $level Github reputation",
                ({ receivedStars, sponsorsCount, sponsoringCount, level }) => {
                    expect(
                        calculateReputation(OAuthProvider.GITHUB, {
                            receivedStars,
                            sponsorsCount,
                            sponsoringCount
                        })
                    ).toBe(level)
                }
            )

            it("sponsoring or being sponsored grants at least established reputation", () => {
                expect(
                    calculateReputation(OAuthProvider.GITHUB, {
                        receivedStars: 0,
                        sponsorsCount: 1,
                        sponsoringCount: 0
                    })
                ).toBe(ReputationLevel.Established)

                expect(
                    calculateReputation(OAuthProvider.GITHUB, {
                        receivedStars: 0,
                        sponsorsCount: 0,
                        sponsoringCount: 1
                    })
                ).toBe(ReputationLevel.Established)
            })
        })

        describe("Reddit", () => {
            it("Should throw an error if a parameter is not supported", () => {
                const fun = () => calculateReputation(OAuthProvider.REDDIT, { posts: 100 } as any)

                expect(fun).toThrowErrorMatchingInlineSnapshot(
                    `"At path: totalKarma -- Expected a number, but received: undefined"`
                )
            })

            it("Should throw an error if a parameter type is not correct", () => {
                const fun = () => calculateReputation(OAuthProvider.REDDIT, { totalKarma: true } as any)

                expect(fun).toThrowErrorMatchingInlineSnapshot(
                    `"At path: totalKarma -- Expected a number, but received: true"`
                )
            })

            it.each([
                { totalKarma: 200, isGold: false, level: ReputationLevel.Commoner },
                { totalKarma: 5_000, isGold: false, level: ReputationLevel.UpAndComing },
                { totalKarma: 30_000, isGold: false, level: ReputationLevel.Established },
                { totalKarma: 110_000, isGold: false, level: ReputationLevel.Star },
                { totalKarma: 300_000, isGold: false, level: ReputationLevel.Icon }
            ])("should return a(n) $level Reddit reputation", ({ totalKarma, isGold, level }) => {
                expect(
                    calculateReputation(OAuthProvider.REDDIT, {
                        totalKarma,
                        isGold
                    })
                ).toBe(level)
            })

            it("gold users have at least up-and-coming reputation", () => {
                expect(
                    calculateReputation(OAuthProvider.REDDIT, {
                        totalKarma: 200,
                        isGold: true
                    })
                ).toBe(ReputationLevel.UpAndComing)
            })
        })
    })
})
