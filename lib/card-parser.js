var ContactInfo = require("./contact-info").ContactInfo
var utils = require("./utils")

const parseConfig = {
    phone: {
        match: {
            regex: /((([A-Z,a-z]+): )?((\+\d{1,2}\s)?)[(]?([0-9]{3})[)]?)[ ]?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})/g,
            find: utils.matchRegex,
            doesNotContain: "f",
        },
        display: utils.removeNonDigitChars
    },
    email: {
        match: {
            regex: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g,
            find: utils.matchRegex,
        },
        display: (str) => { return str }
    },
    name: {
        match: {
            find: utils.getPersonName,
        },
        display: (str) => { return str.trim() }
    }
}

/**
 * Business Card Parser: Parses text from a business card
 */
class BusinessCardParser {
    /** Constructor that takes optional configuration to parse text with a structure as follows:
     * ```
     * {
            (name of item to parse name|phone|email) : {
                match: {
                    regex: (regex to find item Optional),
                    find: (function used to find item Required),
                    doesNotContain: (string to avoid if match found Optional)
                },
                display: (function to indicate how to display item found Required)
        }
    * }
    * ```
    */
    constructor(config) {
        this.config = config ? config : parseConfig;
    }

    /**
     * Parse text into ContactInfo object
     * @param {String} text 
     * @returns ContactInfo
     */
    getContactInfo = function (text) {
        this.parsedText = {};
        // Split input by newline characters to create an array to iterate through
        let textArr = text?.split(/[\n\r]+/g) ?? [];
        for (let text of textArr) {
            for (let key in this.config) {
                if (this.parsedText[key]) continue;
                let matchedText = this.config[key].match.find(text);
                if (matchedText) {
                    this.parsedText[key] = this.config[key].display(matchedText)
                }
            }
        }
        return new ContactInfo(this.parsedText);
    }
}

module.exports = { BusinessCardParser }