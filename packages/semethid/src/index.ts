import { sha256 as _sha256 } from "js-sha256"
import { eddsa } from "circomlib"

/**
 * Returns an hexadecimal sha256 hash of the message passed as parameter.
 * @param message Message to hash.
 * @returns The hexadecimal hash of the message.
 */
function sha256(message: string): string {
    const hash = _sha256.create()

    hash.update(message)

    return hash.hex()
}

/**
 * Converts a hexadecimal string to a big number.
 * @param hex The hexadecimal string.
 * @returns The big number.
 */
function hexToBigInt(hex: string) {
    return BigInt(`0x${hex}`)
}

/**
 * Creates a Semaphore identity by deriving the EdDSA keys from a signed message.
 * @param sign The function to sign the message.
 * @param web2Provider The InterRep Web2 provider of the message (e.g. twitter).
 * @param nonce The nonce of the message.
 * @returns A Semaphore identity.
 */
export default async function semethid(
    sign: (message: string) => Promise<string>,
    web2Provider: string,
    nonce = 0
): Promise<any> {
    const message = await sign(
        `Sign this message to generate your ${web2Provider} Semaphore identity with key nonce: ${nonce}.`
    )
    const messageHash = sha256(message)
    const privKey = Buffer.from(messageHash, "hex")
    const pubKey = eddsa.prv2pub(privKey)
    const identityNullifier = hexToBigInt(sha256(`${messageHash}identity_nullifier`))
    const identityTrapdoor = hexToBigInt(sha256(`${messageHash}identity_trapdoor`))

    return {
        keypair: { pubKey, privKey },
        identityTrapdoor,
        identityNullifier
    }
}
