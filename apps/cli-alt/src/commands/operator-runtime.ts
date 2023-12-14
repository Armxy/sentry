import { getSignerFromPrivateKey, operatorRuntime } from "@sentry/core";


export async function bootOperator(walletKey: string) {
    let stopFunction: () => Promise<void>;

    console.log(getSignerFromPrivateKey, operatorRuntime, walletKey);

    if (!walletKey || walletKey.length < 1) {
        throw new Error("No private key passed in. Please provide a valid private key.")
    }

    const { signer } = getSignerFromPrivateKey(walletKey);

    stopFunction = await operatorRuntime(
        signer,
        undefined,
        (log:any) => process.stdout.write('\n'+log)
    );
}
