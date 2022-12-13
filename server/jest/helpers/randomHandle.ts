import alphanumeric from "../../util/alphanumeric";

export default function randomHandle() {
    let randomHandle = '';
    for (let i = 0; i < 20; i++) {
        const char = Math.floor(Math.random() * alphanumeric.length);
        randomHandle += alphanumeric[char];
    }

    return randomHandle;
}