import crypto from 'crypto';

export default class Util {
    /**
     * Calculates the MD5 hash of a string.
     *
     * @param  {String} data - The string (or buffer).
     * @return {String}        - The MD5 hash.
     */
    static md5(data) {
        return crypto.createHash('md5').update(data).digest('hex');
    }

    /**
     * Evaluate a boolean string
     *
     * @param  {String} boolean - The boolean string.
     * @return {Boolean}        - Its boolean value.
     */
    static eval(boolean) {
        return boolean === 'true';
    }
}
