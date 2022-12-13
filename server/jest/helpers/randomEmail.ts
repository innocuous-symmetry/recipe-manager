import alphanumeric from "../../util/alphanumeric";

export default function randomEmail() {
    let randomName = ''
    for (let i = 0; i < 20; i++) {
        const char = Math.floor(Math.random() * alphanumeric.length);
        randomName += alphanumeric[char];
    }

    return randomName + '@testemail.com';
}