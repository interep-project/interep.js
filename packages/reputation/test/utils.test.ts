import getBin from "../src/utils"

describe("getBin", () => {
    const bins: [number, number][] = [
        [0, 100],
        [100, 1000],
        [1000, 10000],
        [10000, 100000]
    ]

    it("should return the index of the bin that the value belongs to", () => {
        ;[50, 150, 1500, 50000, 200000].forEach((x, i) => {
            expect(getBin(x, bins)).toBe(i)
        })
    })

    it("should return the bins length if the value is greater than the last bin", () => {
        expect(getBin(150000, bins)).toBe(4)
    })

    it("should return 0 if the value is 0", () => {
        expect(getBin(0, bins)).toBe(0)
    })

    it("should throw if the value is negative", () => {
        expect(() => getBin(-1, bins)).toThrowErrorMatchingInlineSnapshot(`"only accept positive numbers"`)
    })
})
