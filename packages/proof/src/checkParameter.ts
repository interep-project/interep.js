export default function checkParameter(value: any, name: string, types: string | string[]) {
    if (value === undefined) {
        throw new TypeError(`Parameter '${name}' is not defined`)
    }

    if (Array.isArray(types)) {
        if (!types.includes(typeof value)) {
            throw new TypeError(`Parameter '${name}' is none of the following types: ${types}`)
        }
    } else if (typeof value !== types) {
        throw new TypeError(`Parameter '${name}' is not a ${types === "object" ? "an" : "a"} ${types}`)
    }
}
