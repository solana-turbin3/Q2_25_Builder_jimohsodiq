import { Keypair, Connection, Commitment, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../wba-wallet.json"


// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);


(async () => {
    try {
        // Start here
        const txhash = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
        const mint = createMint(connection, keypair, keypair.publicKey, keypair.publicKey, 6)
        console.log("mint address: ", mint)
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
