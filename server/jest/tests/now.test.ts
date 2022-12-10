import now from "../../util/now";

describe('now utility', () => {
    it('returns a string', () => {
        expect(typeof now == 'string').toBeTruthy();
    })

    it('is equal to current datetime', () => {
        const expected = Date.now();
        const formatter = Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'long' });
        expect(formatter.format(expected)).toEqual(now);
    })
})