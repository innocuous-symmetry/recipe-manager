import randomEmail from "../../helpers/randomEmail"

describe('randomEmail', () => {
    test('returns a string', () => {
        expect(typeof randomEmail() == 'string').toBeTruthy();
    })

    test('returns unique outputs', () => {
        const first = randomEmail();
        const second = randomEmail();

        expect(first).not.toEqual(second);
    })
})