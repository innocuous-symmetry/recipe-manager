import randomHandle from "../../helpers/randomHandle"

describe('randomHandle', () => {
    test('returns a string', () => {
        expect(typeof randomHandle() == 'string').toBeTruthy();
    })

    test('returns unique outputs', () => {
        const first = randomHandle();
        const second = randomHandle();

        expect(first).not.toEqual(second);
    })
})