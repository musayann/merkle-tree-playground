import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";

export function generate() {
    const values = [
        ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8"],
        ["0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"],
        ["0x90F79bf6EB2c4f870365E785982E1f101E93b906"],
    ]

    const tree = StandardMerkleTree.of(values, ["address"])

    console.log("Merkle Root:", tree.root)

    fs.writeFileSync("../tree.json", JSON.stringify(tree.dump()))
}

export function verify(address: string) {
    const tree = StandardMerkleTree.load(JSON.parse(fs.readFileSync("../tree.json", "utf8")));
    console.log(tree.entries());

    // (2)
    for (const [i, v] of tree.entries()) {
        console.log(i, v);
        if (v[0] === address) {
            // (3)
            const proof = tree.getProof(i);
            console.log('Value:', v);
            console.log('Proof:', proof);
        }
    }
}
