export default function getBin(x: number, bins: [number, number][]): number {
    if (x < 0) throw new Error("only accept positive numbers");

    let i = 0;
    while (i < bins.length && !(bins[i][0] <= x && x < bins[i][1])) {
        i += 1;
    }
    return i
}
