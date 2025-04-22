import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFile } from "fs/promises";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

const filename = "generug.png";

(async () => {
  try {
    //1. Load image
    const file = await readFile("./generug.png");
    //2. Convert image to generic file.
    const genericImage = createGenericFile(file, filename, {
      contentType: "image/png",
    });

    //3. Upload image
    const [myUri] = await umi.uploader.upload([genericImage]);

    const irysURI = myUri.replace(
      "https://arweave.net/",
      "https://devnet.irys.xyz/"
    );
    console.log("Your image URI: ", irysURI);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();


// generated image: https://devnet.irys.xyz/68b8yuFBLwdEPBdjy7dCUkyau1KExZCm1x7LRwiFNFY6