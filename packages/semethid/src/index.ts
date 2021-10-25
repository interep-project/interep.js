import { ZkIdentity, Strategy } from "@libsem/identity"

/**
 * Create a Semaphore identity commitment by deriving it from a signed message.
 * The signed message should contain the Web2 provider and a nonce.
 * @param sign The function to sign the message.
 * @param web2Provider The InterRep Web2 provider of the message (e.g. twitter).
 * @param nonce The nonce of the message.
 * @returns A Semaphore identity commitment.
 */
export default async function semethid(
    sign: (message: string) => Promise<string>,
    web2Provider: string,
    nonce = 0
): Promise<string> {
    const message = await sign(
        `Sign this message to generate your ${web2Provider} Semaphore identity with key nonce: ${nonce}.`
    )
    const identity = new ZkIdentity(Strategy.MESSAGE, message)

    return identity.genIdentityCommitment().toString()
}
