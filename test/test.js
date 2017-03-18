const assert = require('assert');
const {pipe, promisePipe} = require('..');

describe('test', () => {
    it('pipe', () => {

        let addOne = (it) => it + 1;
        let addTwo = (it) => it + 2;

        let xpipe = pipe(addOne, addTwo);

        assert.equal(xpipe('hello'), 'hello12');
        assert.equal(xpipe(5), 8);
    });

    it('pipe / array constructor', () => {

        let addOne = (it) => it + 1;
        let addTwo = (it) => it + 2;

        let xpipe = pipe([addOne, addTwo], addOne, [addTwo, addTwo]);

        assert.equal(xpipe('hello'), 'hello12122');
        assert.equal(xpipe(10), 18);
    });

    it('promise pipe', () => {

        let timeout = (time) => new Promise((resolve, reject) => setTimeout(resolve, time));

        let addOne = (it) => Promise.resolve()
            .then(() => timeout(1))
            .then(() => it + 1);

        let addTwo = (it) => it + 2;

        let xpipe = promisePipe(addOne, addTwo);

        return xpipe('hello')
            .then((result) => assert.equal(result, 'hello12'))
            .then(() => xpipe(10))
            .then((result) => assert.equal(result, 13))
            .then(() => xpipe('done'))
            .then((result) => assert.equal(result, 'done12'));
    })

    it('promise pipe / with array constructor', () => {
        let addOne = (it) => it + 1;
        let addTwo = (it) => it + 2;

        let xpipe = promisePipe(addOne, addTwo, [addOne, addTwo, addTwo]);

        return xpipe('hello')
            .then((result) => assert.equal(result, 'hello12122'))
            .then(() => xpipe(10))
            .then((result) => assert.equal(result, 18))
    })
});