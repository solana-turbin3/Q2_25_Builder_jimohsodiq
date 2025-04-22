import { Keypair } from '@solana/web3.js';

//Generate a new keypair
let kp = Keypair.generate();
console.log(`You've generated a new solana wallet: ${kp.publicKey.toBase58()}`);
console.log(`[${kp.secretKey}]`);