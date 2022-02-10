var nlp = require("compromise")

module.exports = {
    /**
     * Remove all non digit characters from str
     * @param {String} str 
     * @returns String
     */
    removeNonDigitChars: function (str) {
        return str.replace(/\D/g, '')
    },
    /**
     * Return first matched string in str from regex.
     * If doesNotContain is defined avoid matches that contain that string
     * @param {String} str 
     * @returns String
     */
    matchRegex: function (str) {
        let matches = str.match(this.regex);
        let returnMatch = null;

        if(!matches) return null
        if(!this.doesNotContain) {
            return matches[0];
        } 
        for(let match of matches) {
            returnMatch = match.toLowerCase().includes(this.doesNotContain.toLowerCase())? returnMatch: match;
        }
        return returnMatch;
    },
    /**
     * Returns the first persons name from str
     * @param {String} str 
     * @returns String
     */
    getPersonName: function(str) {
        return nlp(str).people().first().text();
    }
} 