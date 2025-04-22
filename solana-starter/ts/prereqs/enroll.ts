import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, Turbin3Prereq, RustIDLPrereq, RustIDL } from "./programs/Turbin3_prereq";
import wallet from "../../../dev-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const connection = new Connection("https://api.devnet.solana.com");

const github = Buffer.from("jimoh-sodiq", "utf-8");

const provider = new AnchorProvider(connection, new Wallet(keypair),{});

// create our program
const program : Program<RustIDLPrereq> = new Program(RustIDL, keypair.publicKey, provider);

// Create the PDA fro our enrollment
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);

// Execute our enrollment transaction
(async () => {
    try {
        const txhash = await program.methods
        .complete(github)
        .accounts({
            signer: keypair.publicKey,
            
        })
        .signers([
            keypair
        ]).rpc();

        program.methods.complete()
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);

    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();